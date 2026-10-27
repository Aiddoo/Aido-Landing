import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Box,
  Centered,
  Grid,
  HStack,
  ListRow,
  ReadableContent,
  Spacing,
  VStack,
} from "./index";

describe("레이아웃 원시 컴포넌트", () => {
  it("render로 받은 시맨틱 태그로 렌더하고 원본 props를 유지한다", () => {
    const html = renderToStaticMarkup(
      createElement(
        VStack,
        {
          render: createElement("section"),
          gap: 4,
          align: "center",
          id: "faq",
          "aria-labelledby": "faq-title",
          className: "py-section",
        },
        "내용",
      ),
    );
    expect(html).toMatch(/^<section /);
    expect(html).toContain('id="faq"');
    expect(html).toContain('aria-labelledby="faq-title"');
    expect(html).toContain('data-slot="stack"');
    for (const name of ["flex", "flex-col", "gap-4", "items-center"])
      expect(html).toContain(name);
    expect(html).toContain("py-section");
  });

  it("호출한 쪽 className이 같은 그룹의 기본 클래스를 덮는다", () => {
    const html = renderToStaticMarkup(
      createElement(HStack, { gap: 2, className: "gap-8" }),
    );
    expect(html).toContain("gap-8");
    expect(html).not.toContain("gap-2");
    expect(html).toContain("flex-row");
  });

  it("render 요소의 props와 합친다", () => {
    const html = renderToStaticMarkup(
      createElement(Box, {
        render: createElement("a", { href: "/ko", className: "underline" }),
        className: "text-brand-deep",
      }),
    );
    expect(html).toMatch(/^<a /);
    expect(html).toContain('href="/ko"');
    expect(html).toContain("underline");
    expect(html).toContain("text-brand-deep");
  });

  it("Centered와 Spacing은 장식 없이 배치만 한다", () => {
    expect(renderToStaticMarkup(createElement(Centered))).toContain(
      "items-center justify-center",
    );
    const spacing = renderToStaticMarkup(
      createElement(Spacing, { size: 6, direction: "horizontal" }),
    );
    expect(spacing).toContain("w-6");
    expect(spacing).toContain('aria-hidden="true"');
  });

  it("ListRow는 주어진 슬롯만 렌더한다", () => {
    const html = renderToStaticMarkup(
      createElement(ListRow, {
        render: createElement("li"),
        left: "발자국",
        contents: "친구 초대",
        border: "indented",
      }),
    );
    expect(html).toMatch(/^<li /);
    expect(html).toContain('data-slot="list-row-left"');
    expect(html).toContain('data-slot="list-row-contents"');
    expect(html).not.toContain('data-slot="list-row-right"');
    expect(html).toContain("border-b");
  });

  it("Grid와 ReadableContent는 반응형 열과 최대 폭만 정한다", () => {
    const grid = renderToStaticMarkup(
      createElement(Grid, { render: createElement("ul"), columns: 3, gap: 6 }),
    );
    expect(grid).toMatch(/^<ul /);
    for (const name of ["grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3"])
      expect(grid).toContain(name);
    const content = renderToStaticMarkup(
      createElement(ReadableContent, { size: "reading", gutter: false }),
    );
    expect(content).toContain("max-w-reading");
    expect(content).not.toContain("px-gutter");
  });
});
