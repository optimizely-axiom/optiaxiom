import type { PropItem } from "react-docgen-typescript";

import * as Components from "@optiaxiom/react";
import * as UnstableComponents from "@optiaxiom/react/unstable";
import { promises as fs } from "fs";

export const getProps = async (
  component: keyof typeof Components | keyof typeof UnstableComponents,
) => {
  const docs = JSON.parse(
    await fs.readFile(process.cwd() + "/data/props.json", "utf8"),
  ) as Array<{
    displayName: string;
    props: PropItem[];
  }>;
  const doc = docs.find(
    (doc) => doc.displayName === `@optiaxiom/react/${component}`,
  );
  if (!doc) {
    throw new Error(`Could not find component doc: ${component}`);
  }

  return doc.props;
};
