"use client";

import type { MutableRefObject, RefObject } from "react";

export const bookmarks: MutableRefObject<Array<RefObject<HTMLElement>>> = {
  current: [],
};
