import { Box, type BoxProps } from "../box";

export type BlockImageProps = BoxProps<
  "img",
  {
    /**
     * Alt text for the image, used for accessibility.
     */
    alt?: string;
    /**
     * The URL of the image to display.
     */
    src: string;
  }
>;

export function BlockImage(props: BlockImageProps) {
  return (
    <Box asChild display="block" objectFit="cover" rounded="lg" {...props}>
      <img />
    </Box>
  );
}

BlockImage.displayName = "@optiaxiom/react/BlockImage";
