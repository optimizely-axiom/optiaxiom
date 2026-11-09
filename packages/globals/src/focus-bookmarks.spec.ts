// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from "vitest";

import { focusBookmarks } from "./focus-bookmarks";

const layers: Array<ReturnType<typeof focusBookmarks.add>> = [];
function addLayer(depth: number) {
  const layer = focusBookmarks.add(depth);
  layers.push(layer);
  return layer;
}

function button(label: string) {
  const element = document.createElement("button");
  element.textContent = label;
  document.body.append(element);
  return element;
}

describe("focusBookmarks", () => {
  afterEach(() => {
    layers.splice(0).forEach((layer) => layer.remove());
    document.body.replaceChildren();
  });

  it("should restore focus inside the open dialog rather than the page behind it", () => {
    const page = addLayer(0);
    const dialog = addLayer(1);
    page.record(button("Edit profile"));
    const discard = button("Discard changes");
    dialog.record(discard);

    focusBookmarks.restore();

    expect(document.activeElement).toBe(discard);
  });

  it("should prefer a nested layer that mounted before the page root", () => {
    const hostDialog = addLayer(1);
    const remoteRoot = addLayer(0);
    const discard = button("Discard changes");
    hostDialog.record(discard);
    remoteRoot.record(button("Remote button"));

    focusBookmarks.restore();

    expect(document.activeElement).toBe(discard);
  });

  it("should return to the page once the dialog layer is removed", () => {
    const page = addLayer(0);
    const dialog = addLayer(1);
    const opener = button("Edit profile");
    page.record(opener);
    dialog.record(button("Save"));

    dialog.remove();
    focusBookmarks.restore();

    expect(document.activeElement).toBe(opener);
  });

  it("should skip an element that left the page, like a closed menu's option", () => {
    const page = addLayer(0);
    const trigger = button("Actions");
    page.record(trigger);
    const option = button("Delete");
    page.record(option);
    option.remove();

    focusBookmarks.restore();

    expect(document.activeElement).toBe(trigger);
  });

  it("should keep an element that refused focus for a later restore", () => {
    const page = addLayer(0);
    const opener = button("Edit profile");
    page.record(opener);
    opener.disabled = true;

    focusBookmarks.restore();
    expect(document.activeElement).not.toBe(opener);

    opener.disabled = false;
    focusBookmarks.restore();
    expect(document.activeElement).toBe(opener);
  });
});
