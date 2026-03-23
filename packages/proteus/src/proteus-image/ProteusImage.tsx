import {
  Box,
  type BoxProps,
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  Spinner,
} from "@optiaxiom/react";
import { useRef, useState } from "react";

import { downloadFile } from "./downloadFile";

export type ProteusImageProps = BoxProps<"img">;

export function ProteusImage(props: ProteusImageProps) {
  const [open, setOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  if (props.objectFit === "cover") {
    return (
      <Box asChild objectFit="cover" overflow="hidden" {...props}>
        <img alt={props.alt} src={props.src} />
      </Box>
    );
  }

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
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger aria-label="Expand" asChild>
          <Box
            alignSelf="center"
            asChild
            display={isLoaded ? "flex" : "none"}
            {...props}
          >
            <a
              href={props.src}
              onClick={(event) => {
                event.preventDefault();
                setOpen(true);
              }}
              type=""
            >
              <Box
                asChild
                objectFit="contain"
                overflow="hidden"
                rounded="inherit"
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
                  ref={imgRef}
                  src={props.src}
                />
              </Box>
            </a>
          </Box>
        </DialogTrigger>
        <DialogContent size="fullscreen">
          <DialogHeader lineClamp="1">{props.alt}</DialogHeader>
          <DialogBody overflow="hidden">
            <Box
              asChild
              display="block"
              maxH="full"
              maxW="full"
              objectFit="contain"
            >
              <img alt={props.alt} src={props.src} />
            </Box>
          </DialogBody>
          <DialogFooter>
            <DialogClose>Close</DialogClose>
            <Button
              appearance="primary"
              asChild
              loading={isDownloading}
              onClick={async (event) => {
                event.preventDefault();

                if (isDownloading) {
                  return;
                }

                setIsDownloading(true);
                try {
                  await downloadFile(String(props.src));
                } finally {
                  setIsDownloading(false);
                }
              }}
            >
              <a download href={props.src}>
                Download
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

ProteusImage.displayName = "@optiaxiom/proteus/ProteusImage";
