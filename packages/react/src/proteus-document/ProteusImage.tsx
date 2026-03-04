import { Box } from "../box";
import { useResolvedProteusValue } from "./useResolvedProteusValue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusImage(props: Record<string, any>) {
  const resolvedSrc = useResolvedProteusValue(props.src);
  const resolvedAlt = useResolvedProteusValue(props.alt);

  return (
    <Box asChild display="block" objectFit="cover" {...props}>
      <img
        alt={typeof resolvedAlt === "string" ? resolvedAlt : ""}
        src={typeof resolvedSrc === "string" ? resolvedSrc : ""}
      />
    </Box>
  );
}

ProteusImage.displayName = "@optiaxiom/react/ProteusImage";
