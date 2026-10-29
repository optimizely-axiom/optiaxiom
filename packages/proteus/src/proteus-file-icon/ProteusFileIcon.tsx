import type { BoxProps } from "@optiaxiom/react";

import { IconCode } from "@optiaxiom/icons/IconCode";
import { IconFile } from "@optiaxiom/icons/IconFile";
import { IconFileImage } from "@optiaxiom/icons/IconFileImage";
import { IconFileLines } from "@optiaxiom/icons/IconFileLines";
import { IconFileVideo } from "@optiaxiom/icons/IconFileVideo";
import { IconFileZipper } from "@optiaxiom/icons/IconFileZipper";
import { IconMusic } from "@optiaxiom/icons/IconMusic";
import { IconPresentationScreen } from "@optiaxiom/icons/IconPresentationScreen";
import { IconTableLayout } from "@optiaxiom/icons/IconTableLayout";
import { Box } from "@optiaxiom/react";
import { type ComponentType } from "react";

const mimeIconMap: Array<[RegExp, ComponentType]> = [
  [/^image\//, IconFileImage],
  [/^video\//, IconFileVideo],
  [/^audio\//, IconMusic],
  [/presentation|powerpoint|keynote|slides/, IconPresentationScreen],
  [/spreadsheet|excel|csv|tab-separated-values|tsv|parquet/, IconTableLayout],
  [/zip|tar|compress|archive|x-7z|x-rar/, IconFileZipper],
  [/pdf|wordprocessing|opendocument\.text/, IconFileLines],
  [
    /json|xml|yaml|javascript|typescript|html|css|x-sh|x-python|code|script/,
    IconCode,
  ],
  [/^text\/|word|rtf/, IconFileLines],
];

export type ProteusFileIconProps = BoxProps & {
  /**
   * The mime type of the file
   */
  mimeType?: string;
};

export function ProteusFileIcon({ mimeType, ...props }: ProteusFileIconProps) {
  const Icon = getIconForMimeType(mimeType);

  return (
    <Box
      asChild
      bg="bg.secondary"
      color="fg.tertiary"
      p="8"
      rounded="md"
      {...props}
    >
      <Icon />
    </Box>
  );
}

function getIconForMimeType(mimeType: string | undefined): ComponentType {
  if (mimeType) {
    for (const [pattern, Icon] of mimeIconMap) {
      if (pattern.test(mimeType)) {
        return Icon;
      }
    }
  }
  return IconFile;
}

ProteusFileIcon.displayName = "@optiaxiom/proteus/ProteusFileIcon";
