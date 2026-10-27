import gsap from "gsap";

// 접힌 덮개가 왼쪽 경첩을 축으로 책장처럼 열리고, 그 뒤로 안쪽 화면이 한 장으로 드러난다.
// 끝 상태(덮개 숨김·안쪽 화면 보임)가 CSS 기본 배치라 되돌려도 펼친 모습이 남는다.
export function createDuoUnfold(stage: HTMLElement) {
  const cover = stage.querySelector("[data-duo='cover']");
  const device = stage.querySelector("[data-duo='device']");
  const sheen = stage.querySelector("[data-duo='sheen']");
  const companion = stage.querySelector("[data-duo='companion']");
  if (!cover || !device || !sheen) return;
  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: stage,
      start: "top 85%",
      end: "center 50%",
      scrub: 0.6,
    },
  });
  timeline
    .fromTo(
      cover,
      {
        opacity: 1,
        rotationY: 0,
        transformOrigin: "0% 50%",
        transformPerspective: 1600,
      },
      { rotationY: -118, duration: 0.5, ease: "power2.in" },
      0.08,
    )
    .to(cover, { opacity: 0, duration: 0.12 }, 0.46)
    .fromTo(
      device,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" },
      0.22,
    )
    .fromTo(sheen, { opacity: 0 }, { opacity: 0.7, duration: 0.15 }, 0.42)
    .to(sheen, { opacity: 0, duration: 0.25 }, 0.6);
  if (companion)
    timeline.fromTo(
      companion,
      { opacity: 0, x: 24 },
      { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" },
      0.62,
    );
}
