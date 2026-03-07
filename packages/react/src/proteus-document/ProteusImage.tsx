import { useRef, useState } from "react";

import { ActionsContent, ActionsRoot } from "../actions";
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
import { Group } from "../group";
import { IconArrowsDiagonal } from "../icons/IconArrowsDiagonal";
import { IconCheck } from "../icons/IconCheck";
import { IconCopy } from "../icons/IconCopy";
import { IconDownload } from "../icons/IconDownload";
import { Spinner } from "../spinner";
import { downloadFile } from "./downloadFile";
import * as styles from "./ProteusImage.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProteusImage(props: Record<string, any>) {
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const timerRef = useRef<number>();

  return (
    <ActionsRoot {...styles.root()}>
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
      {isLoaded && (
        <ActionsContent {...styles.actions()}>
          <Group bg="bg.default" gap="4" p="4" rounded="md">
            <Button
              appearance="subtle"
              aria-label="Copy"
              icon={
                isCopied ? (
                  <IconCheck pointerEvents="none" />
                ) : (
                  <IconCopy pointerEvents="none" />
                )
              }
              onClick={async () => {
                if (!imgRef.current) {
                  return;
                }

                setIsCopied(true);

                const canvas = document.createElement("canvas");
                canvas.width = imgRef.current.naturalWidth;
                canvas.height = imgRef.current.naturalHeight;
                canvas.getContext("2d")?.drawImage(imgRef.current, 0, 0);
                const blob = await new Promise<Blob | null>((resolve) => {
                  try {
                    canvas.toBlob(resolve, "image/png");
                  } catch {
                    resolve(null);
                  }
                });
                if (blob) {
                  await navigator.clipboard.write([
                    new ClipboardItem({ "image/png": blob }),
                  ]);
                } else {
                  await navigator.clipboard.writeText(String(props.src));
                }

                clearTimeout(timerRef.current);
                timerRef.current = window.setTimeout(() => {
                  setIsCopied(false);
                }, 2000);
              }}
              size="sm"
            />
            <Dialog>
              <DialogTrigger
                appearance="subtle"
                aria-label="Expand"
                icon={<IconArrowsDiagonal />}
                size="sm"
              />
              <DialogContent size="lg">
                <DialogHeader>{props.alt}</DialogHeader>
                <DialogBody>
                  <Box asChild display="block" objectFit="cover" {...props}>
                    <img alt={props.alt} src={props.src} />
                  </Box>
                </DialogBody>
                <DialogFooter>
                  <DialogClose>Close</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              appearance="subtle"
              aria-label="Download"
              asChild
              icon={<IconDownload />}
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
              size="sm"
            >
              <a download href={props.src} />
            </Button>
          </Group>
        </ActionsContent>
      )}
    </ActionsRoot>
  );
}

ProteusImage.displayName = "@optiaxiom/react/ProteusImage";
