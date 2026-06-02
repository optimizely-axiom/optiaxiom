import { Box, type BoxProps, Spinner } from "@optiaxiom/react";
import { useState } from "react";

export type ProteusImageProps = BoxProps<"img">;

export function ProteusImage({ ...props }: ProteusImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <Box
          alignItems="center"
          bg="bg.tertiary"
          display="flex"
          justifyContent="center"
          p="24"
          rounded="md"
          style={{ aspectRatio: "16 / 9" }}
          w="full"
          {...props}
        >
          <Spinner />
        </Box>
      )}
      <Box
        asChild
        display={isLoaded ? "flex" : "none"}
        objectFit="contain"
        overflow="hidden"
        rounded="inherit"
        size="full"
        {...props}
      >
        <img
          alt={props.alt}
          draggable
          onDragStart={(event) => {
            event.stopPropagation();
            event.dataTransfer.effectAllowed = "copy";
            event.dataTransfer.setData(
              "opal-chat-dnd-data",
              JSON.stringify({
                link: props.src,
                mime_type: "image/*",
                name: props.src?.split("/").pop(),
              }),
            );
          }}
          onLoad={() => setIsLoaded(true)}
          src={props.src}
        />
      </Box>
    </>
  );
}

ProteusImage.displayName = "@optiaxiom/proteus/ProteusImage";
