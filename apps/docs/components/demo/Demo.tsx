import type { ReactNode } from "react";
import type { Props } from "react-docgen-typescript";

import { Box } from "@optiaxiom/react";
import { promises as fs } from "fs";
import { compileMdx } from "nextra/compile";
import { Tabs } from "nextra/components";
import { MDXRemote } from "nextra/mdx-remote";
import path from "path";

import pkg from "../../../../packages/react/package.json";
import { nextraOptions } from "../../nextra.config.mjs";
import { DemoCode } from "./DemoCode";
import { DemoPreview } from "./DemoPreview";
import { demos } from "./demos";

export async function Demo({
  component,
  meta,
  resizable,
  scrollable,
}: {
  component: keyof typeof demos;
  meta?: Record<string, string> | string;
  resizable?: boolean;
  scrollable?: boolean;
}) {
  if (!(component in demos)) {
    throw new Error(`Could not find demo: ${component}`);
  }
  const Component = (await demos[component]).App as () => ReactNode;

  const fileNames = ["App.tsx"];
  const filesDir = `${process.cwd()}/demos/${component}`;
  for (const file of await fs.readdir(filesDir)) {
    if (
      !fileNames.includes(file) &&
      (file.endsWith(".css") || file.endsWith(".ts") || file.endsWith(".tsx"))
    ) {
      fileNames.push(file);
    }
  }
  const files = Object.fromEntries(
    await Promise.all(
      fileNames.map(async (fileName) => [
        fileName,
        (await fs.readFile(path.join(filesDir, fileName), "utf8")).trim(),
      ]),
    ),
  );
  const templateDir = `${process.cwd()}/stackblitz`;
  const template = Object.fromEntries(
    await Promise.all(
      (await fs.readdir(templateDir)).map(async (fileName) => [
        fileName,
        (await fs.readFile(path.join(templateDir, fileName), "utf-8")).replace(
          "AXIOM_VERSION",
          pkg.version,
        ),
      ]),
    ),
  );

  const docs = JSON.parse(
    await fs.readFile(process.cwd() + "/data/demos.json", "utf8"),
  ) as Array<{
    displayName: string;
    filePath: string;
    props: Props;
  }>;
  const doc = docs.find(
    (doc) =>
      doc.filePath === `${filesDir.replace(process.cwd() + "/", "")}/App.tsx`,
  );

  return (
    <Box bg="bg.avatar.neutral" mt="32" rounded="lg">
      <DemoPreview
        component={<Component />}
        propTypes={doc?.props}
        resizable={resizable}
        scrollable={scrollable}
      />
      <DemoCode files={{ ...template, ...files }}>
        <MDXRemote
          compiledSource={await compileMdx(
            [
              fileNames.length > 1 &&
                `<Tabs items={${JSON.stringify(fileNames)}}>`,
              ...Object.entries(files).map(([fileName, content]) =>
                [
                  fileNames.length > 1 && "<Tabs.Tab>",
                  `~~~${path.extname(fileName).slice(1)} ${
                    meta && typeof meta === "object" ? meta[fileName] : meta
                  }`,
                  content,
                  "~~~",
                  fileNames.length > 1 && "</Tabs.Tab>",
                ]
                  .filter(Boolean)
                  .join("\n"),
              ),
              fileNames.length > 1 && "</Tabs>",
            ]
              .filter(Boolean)
              .join("\n"),
            nextraOptions,
          )}
          components={{ Tabs }}
        />
      </DemoCode>
    </Box>
  );
}
