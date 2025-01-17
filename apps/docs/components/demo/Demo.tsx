import type { demos } from "@/demos/index";
import type { ReactNode } from "react";
import type { Props } from "react-docgen-typescript";

import { Box } from "@optiaxiom/react";
import { promises as fs } from "fs";
import { compileMdx } from "nextra/compile";
import { Tabs } from "nextra/components";
import { MDXRemote } from "nextra/mdx-remote";
import path from "path";

import { DemoCode } from "./DemoCode";
import { DemoPreview } from "./DemoPreview";

export async function Demo({
  component,
  height,
  iframe,
  meta,
}: {
  component: (typeof demos)[keyof typeof demos];
  height?: string;
  iframe?: string;
  meta?: Record<string, string> | string;
}) {
  const Component = (await component["demo"]).App as () => ReactNode;

  const files = ["App.tsx"];
  const filesDir = `${process.cwd()}/demos/${component["path"]}`;
  for (const file of await fs.readdir(filesDir)) {
    if (
      !files.includes(file) &&
      (file.endsWith(".css") || file.endsWith(".ts") || file.endsWith(".tsx"))
    ) {
      files.push(file);
    }
  }

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
    <Box bg="bg.default" border="1" mt="32" rounded="lg">
      <DemoPreview
        component={<Component />}
        height={height}
        iframe={iframe}
        propTypes={doc?.props}
      />
      <DemoCode>
        <MDXRemote
          compiledSource={await compileMdx(
            [
              files.length > 1 && `<Tabs items={${JSON.stringify(files)}}>`,
              ...(await Promise.all(
                files.map(async (fileName) =>
                  [
                    files.length > 1 && "<Tabs.Tab>",
                    `~~~${path.extname(fileName).slice(1)} ${
                      meta && typeof meta === "object" ? meta[fileName] : meta
                    }`,
                    removeDirectives(
                      await fs.readFile(path.join(filesDir, fileName), "utf8"),
                    ).trim(),
                    "~~~",
                    files.length > 1 && "</Tabs.Tab>",
                  ]
                    .filter(Boolean)
                    .join("\n"),
                ),
              )),
              files.length > 1 && "</Tabs>",
            ]
              .filter(Boolean)
              .join("\n"),
          )}
          components={{ Tabs }}
        />
      </DemoCode>
    </Box>
  );
}

const removeDirectives = (source: string) =>
  source.startsWith('"use client";')
    ? source.slice('"use client";\n'.length)
    : source;
