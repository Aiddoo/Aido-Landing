import assert from "node:assert/strict";
import {
  formatStoreNotes,
  PATCH_NOTES_EDITED_AT,
  patchNotesUpdatedAt,
  releaseNotes,
  serviceUpdates,
  updateNotes,
} from "../src/features/updates/data/patch-notes.ts";

const locales = ["ko", "en"];
function checkDate(date) {
  assert.match(date, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10), date);
}
function checkText(text, label) {
  assert.equal(typeof text, "string", label);
  assert.ok(text.trim().length > 0, `${label}: missing text`);
  assert.equal(text, text.trim(), `${label}: surrounding whitespace`);
}

assert.ok(
  releaseNotes.length > 0,
  "At least one published app release is required",
);
assert.equal(
  new Set(releaseNotes.map((r) => r.version)).size,
  releaseNotes.length,
);
assert.equal(new Set(updateNotes.map((r) => r.id)).size, updateNotes.length);
assert.equal(updateNotes.length, releaseNotes.length + serviceUpdates.length);
checkDate(PATCH_NOTES_EDITED_AT);
checkDate(patchNotesUpdatedAt);
for (const [index, release] of releaseNotes.entries()) {
  assert.match(release.version, /^\d+\.\d+\.\d+$/);
  if (index > 0)
    assert.ok(
      release.date <= releaseNotes[index - 1].date,
      "App releases must be newest first; Home uses the first app release",
    );
  for (const locale of locales) {
    assert.ok(release.storeNotes[locale].length > 0);
    for (const line of release.storeNotes[locale]) {
      checkText(line, `${release.version}/${locale} highlight`);
      assert.doesNotMatch(line, /[\r\n]/, "Each highlight occupies one line");
    }
    const text = formatStoreNotes(release, locale);
    // Unicode characters for Play; UTF-16 length is also a conservative check.
    assert.ok(
      [...text].length <= 500 && text.length <= 500,
      `${release.version}/${locale}: store notes exceed 500 characters (${text.length})`,
    );
  }
}
for (const [index, update] of updateNotes.entries()) {
  checkText(update.id, "Update ID");
  checkDate(update.date);
  assert.ok(update.date <= patchNotesUpdatedAt);
  if (index > 0) assert.ok(update.date <= updateNotes[index - 1].date);
  for (const locale of locales)
    checkText(update.summary[locale], `${update.id}/${locale} introduction`);
  assert.equal(
    new Set(update.categories.map((c) => c.type)).size,
    update.categories.length,
    `${update.id}: duplicate categories`,
  );
  for (const category of update.categories) {
    assert.ok(["features", "improvements", "bugFixes"].includes(category.type));
    assert.ok(category.items.length > 0);
    for (const item of category.items)
      for (const locale of locales)
        checkText(item[locale], `${update.id}/${locale} detail`);
  }
  if (update.kind === "service") {
    assert.ok(update.categories.length > 0);
    assert.ok(
      !("version" in update),
      "Service changes must not invent app versions",
    );
    assert.ok(
      !("storeNotes" in update),
      "Service updates are not store releases",
    );
  }
}
console.log(
  `Patch notes passed: ${releaseNotes.length} app releases, ${serviceUpdates.length} service updates, complete ko/en copy, unique IDs, valid dates and store notes within 500 characters.`,
);
