import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { setProjectAnnotations } from "@storybook/react";
import { beforeAll } from "vitest";

import * as previewAnnotations from "./preview";

const annotations = setProjectAnnotations([
  previewAnnotations,
  a11yAddonAnnotations,
]);

beforeAll(annotations.beforeAll);
