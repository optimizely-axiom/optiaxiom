import { Box } from "../box";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusImage(props: Record<string, any>) {
  return (
    <Box asChild display="block" objectFit="cover" {...props}>
      <img />
    </Box>
  );
}

ProteusImage.displayName = "@optiaxiom/react/ProteusImage";
