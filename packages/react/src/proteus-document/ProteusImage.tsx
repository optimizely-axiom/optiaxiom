import { Box, type BoxProps } from "../box";

export type ProteusImageProps = BoxProps<
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

export function ProteusImage(props: ProteusImageProps) {
  return (
    <Box asChild display="block" objectFit="cover" {...props}>
      <img />
    </Box>
  );
}

ProteusImage.displayName = "@optiaxiom/react/ProteusImage";
