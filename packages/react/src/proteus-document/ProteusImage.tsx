import type { ProteusImageProps } from "./schemas";

import { Box } from "../box";

export function ProteusImage(props: ProteusImageProps) {
  return (
    <Box asChild display="block" objectFit="cover" {...props}>
      <img />
    </Box>
  );
}

ProteusImage.displayName = "@optiaxiom/react/ProteusImage";
