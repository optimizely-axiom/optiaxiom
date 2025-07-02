import { Flex } from "../flex";
import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";
import { SegmentedControl, SegmentedControlItem } from "../segmented-control";
import { FilePreviewListItem } from "./FilePreviewListItem";

export interface FilePreviewListProps {
  files: File[];
  view: "grid" | "list";
}

export function FilePreviewList({ files, view }: FilePreviewListProps) {
  if (!files.length) return null;

  return (
    <Flex gap="20">
      <Flex alignItems="end">
        <SegmentedControl type="single" value={view}>
          <SegmentedControlItem value="list">
            <IconAngleLeft />
          </SegmentedControlItem>
          <SegmentedControlItem value="grid">
            <IconAngleRight />
          </SegmentedControlItem>
        </SegmentedControl>
      </Flex>
      <Flex flexDirection="row" gap="8">
        {files.map((file, idx) => (
          <FilePreviewListItem file={file} key={idx} />
        ))}
      </Flex>
    </Flex>
  );
}
