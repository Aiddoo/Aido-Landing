import gsap from "gsap";

const COMPACT_STAGE_WIDTH = 544;

// 화면을 반씩 나눈 두 면이 가운데 접힘선을 축으로 V자에서 평평하게 펴지고, 다 펴지면 같은 그림의 한 장으로
// 바뀌어 이음새가 남지 않는다. 끝 상태(한 장 보임·두 면 숨김)가 CSS 기본 배치라 되돌려도 펼친 모습이 남는다.
export function createDuoUnfold(stage: HTMLElement) {
  const device = stage.querySelector("[data-duo='device']");
  const flat = stage.querySelector("[data-duo='flat']");
  const sheen = stage.querySelector("[data-duo='sheen']");
  const leftLeaf = stage.querySelector("[data-duo='leaf'][data-side='left']");
  const rightLeaf = stage.querySelector("[data-duo='leaf'][data-side='right']");
  const shades = stage.querySelectorAll("[data-duo='shade']");
  const companion = stage.querySelector("[data-duo='companion']");
  if (!device || !flat || !sheen || !leftLeaf || !rightLeaf) return;
  const openAngle = () => (stage.clientWidth < COMPACT_STAGE_WIDTH ? 26 : 34);
  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: stage,
      start: "top 92%",
      end: "center 52%",
      scrub: 0.7,
      invalidateOnRefresh: true,
    },
  });
  timeline
    .fromTo(
      device,
      { scale: 0.86, y: 36 },
      { scale: 1, y: 0, duration: 0.78, ease: "power2.out" },
      0,
    )
    .fromTo(
      leftLeaf,
      { opacity: 1, rotationY: () => openAngle() },
      { rotationY: 0, duration: 0.78, ease: "sine.inOut" },
      0,
    )
    .fromTo(
      rightLeaf,
      { opacity: 1, rotationY: () => -openAngle() },
      { rotationY: 0, duration: 0.78, ease: "sine.inOut" },
      0,
    )
    .fromTo(
      shades,
      { opacity: 1 },
      { opacity: 0, duration: 0.7, ease: "power1.in" },
      0,
    )
    .fromTo(flat, { opacity: 0 }, { opacity: 1, duration: 0.04 }, 0.78)
    .to([leftLeaf, rightLeaf], { opacity: 0, duration: 0.04 }, 0.82)
    .fromTo(
      sheen,
      { opacity: 1, xPercent: 0 },
      { xPercent: 420, duration: 0.18, ease: "power1.inOut" },
      0.82,
    )
    .to(sheen, { opacity: 0, duration: 0.02 }, 1);
  if (companion)
    timeline.fromTo(
      companion,
      { opacity: 0, xPercent: 45 },
      { opacity: 1, xPercent: 0, duration: 0.45, ease: "power2.out" },
      0.3,
    );
}
