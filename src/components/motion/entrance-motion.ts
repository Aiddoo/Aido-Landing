import gsap from "gsap";

const entrances = {
  float: {
    from: { y: 28, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
  },
  title: {
    from: { y: 14 },
    to: { y: 0, duration: 0.6, ease: "back.out(2.4)" },
  },
  // 발자국이 "쿵" 찍히도록 크게 기운 채 내려와 살짝 튕긴다.
  stamp: {
    from: { scale: 1.8, rotation: -18, opacity: 0 },
    to: {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.38,
      ease: "back.out(3)",
    },
  },
  // 고양이가 하나씩 "퐁" 하고 나타난다.
  pop: {
    from: { scale: 0.6, y: 10, opacity: 0 },
    to: { scale: 1, y: 0, opacity: 1, duration: 0.42, ease: "back.out(2.6)" },
  },
} as const;

type EntranceName = keyof typeof entrances;

function isEntranceName(value: string | undefined): value is EntranceName {
  return (
    value === "float" ||
    value === "title" ||
    value === "stamp" ||
    value === "pop"
  );
}

// 발자국 판(data-motion="stamp-board")은 찍힌 칸만 하나씩 "쿵" 찍는다.
function toEntranceTargets(elements: HTMLElement[]) {
  return elements.flatMap((element): [HTMLElement, EntranceName][] => {
    const name = element.dataset.motion;
    if (name === "stamp-board")
      return [...element.querySelectorAll<HTMLElement>("[data-stamped]")].map(
        (cell) => [cell, "stamp"],
      );
    return isEntranceName(name) ? [[element, name]] : [];
  });
}

/** data-motion 이름(float·title·stamp·stamp-board·pop)에 맞춰 차례로 등장시킨다. */
export function animateEntrances(elements: HTMLElement[]) {
  toEntranceTargets(elements).forEach(([element, name], index) => {
    const { from, to } = entrances[name];
    gsap.fromTo(element, from, {
      ...to,
      delay: index * (name === "stamp" ? 0.12 : 0.08),
      clearProps: "transform,opacity",
    });
  });
}
