import { describe, expect, it } from "vitest";
import { keepPhrasesTogether } from "./keep-phrases-together";

describe("keepPhrasesTogether", () => {
  it("binds numbers to their units", () => {
    expect(keepPhrasesTogether("get 7 days and 1 more friend now")).toBe(
      "get 7 days and 1 more friend now",
    );
  });

  it("keeps a short last word with the word before it", () => {
    expect(keepPhrasesTogether("finish your first to-do.")).toBe(
      "finish your first to-do.",
    );
    expect(keepPhrasesTogether("첫 할 일을 안내해요.")).toBe(
      "첫 할 일을 안내해요.",
    );
  });

  it("leaves a long last word alone", () => {
    expect(keepPhrasesTogether("need no new installation.")).toBe(
      "need no new installation.",
    );
  });
});
