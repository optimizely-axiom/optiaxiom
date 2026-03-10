import { useRef, useState } from "react";

import { Box } from "../box";
import { Button } from "../button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../dialog";
import { Spinner } from "../spinner";
import { downloadFile } from "./downloadFile";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusImage(props: Record<string, any>) {
  const [open, setOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <Box>
      {!isLoaded && (
        <Box
          alignItems="center"
          bg="bg.tertiary"
          display="flex"
          justifyContent="center"
          p="24"
          rounded="md"
          style={{ aspectRatio: "16 / 9" }}
        >
          <Spinner />
        </Box>
      )}
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger aria-label="Expand" asChild>
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
              display={isLoaded ? "block" : "none"}
              objectFit="cover"
              {...props}
            >
              <img
                alt={props.alt}
                onLoad={() => setIsLoaded(true)}
                ref={imgRef}
                src={props.src}
              />
            </Box>
          </a>
        </DialogTrigger>
        <DialogContent size="lg">
          <DialogHeader>{props.alt}</DialogHeader>
          <DialogBody>
            <Box asChild display="block" objectFit="cover" {...props}>
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
    </Box>
  );
}

ProteusImage.displayName = "@optiaxiom/react/ProteusImage";
