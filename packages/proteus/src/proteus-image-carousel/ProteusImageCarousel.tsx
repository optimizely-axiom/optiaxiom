import {
  Box,
  Button,
  Group,
  Menu,
  MenuContent,
  MenuTrigger,
  Text,
} from "@optiaxiom/react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

import type { ProteusPreviewFile } from "../proteus-document/schemas";

import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";
import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { ProteusImage } from "../proteus-image/ProteusImage";
import * as styles from "./ProteusImageCarousel.css";

const MIME_MAP: Record<string, string> = {
  gif: "image/gif",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  webp: "image/webp",
};

export type ProteusImageCarouselProps = {
  /**
   * Array of image data to display in the carousel.
   */
  images: Array<{
    [key: string]: unknown;
    /**
     * Alternative text for the image.
     */
    alt?: string;
    /**
     * The URL to the full image.
     */
    src: string;
    /**
     * The URL to the image thumbnail.
     */
    thumb?: string;
  }>;
  /**
   * Accessible label for the carousel region.
   */
  title?: string;
};

export function ProteusImageCarousel({
  images,
  title,
}: ProteusImageCarouselProps) {
  const { onEvent } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusImageCarousel",
  );
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    loop: false,
    watchDrag: false,
  });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    setCanScrollPrev(emblaMainApi.canScrollPrev());
    setCanScrollNext(emblaMainApi.canScrollNext());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  if (!images.length) {
    return null;
  }

  return (
    <Group
      aria-label={title ?? "Image carousel"}
      aria-roledescription="carousel"
      onKeyDownCapture={(event) => {
        if (event.target instanceof HTMLInputElement) return;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          emblaMainApi?.scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          emblaMainApi?.scrollNext();
        }
      }}
      role="region"
      tabIndex={0}
      {...styles.carousel()}
    >
      <Box {...styles.content()}>
        <Box {...styles.viewport()} ref={emblaMainRef}>
          <Group {...styles.slideContainer()}>
            {images.map((image, index) => (
              <ProteusImage
                alt={image.alt}
                key={index}
                onClick={() => {
                  void onEvent({
                    action: "preview",
                    file: buildPreviewFile(image.src, image.alt),
                  });
                }}
                src={image.src}
                {...styles.slide()}
              />
            ))}
          </Group>
        </Box>

        {canScrollPrev && (
          <Box
            aria-label="Previous image"
            asChild
            onClick={() => emblaMainApi?.scrollPrev()}
            {...styles.navButton({ side: "left" })}
          >
            <button>
              <IconAngleLeft />
            </button>
          </Box>
        )}
        {canScrollNext && (
          <Box
            aria-label="Next image"
            asChild
            onClick={() => emblaMainApi?.scrollNext()}
            {...styles.navButton({ side: "right" })}
          >
            <button>
              <IconAngleRight />
            </button>
          </Box>
        )}
      </Box>

      {images.length > 1 && (
        <Box overflow="hidden" ref={emblaThumbsRef}>
          <Group gap="12">
            {images.map((image, index) => (
              <Box
                key={index}
                onClick={() => emblaMainApi?.scrollTo(index)}
                {...styles.thumbnail({
                  selected: index === selectedIndex,
                })}
              >
                <Box asChild objectFit="cover" size="full">
                  <img alt={image.alt} src={image.thumb ?? image.src} />
                </Box>
              </Box>
            ))}
          </Group>
        </Box>
      )}

      <Group mt="4">
        {images.length > 1 && (
          <Text
            bg="bg.secondary"
            color="fg.default"
            fontSize="sm"
            fontWeight="500"
            px="8"
            py="2"
            rounded="full"
          >
            {selectedIndex + 1} / {images.length}
          </Text>
        )}

        {images.length > 1 ? (
          <Menu
            options={[
              {
                execute: () =>
                  onEvent({
                    action: "download",
                    url: images[selectedIndex].src,
                  }),
                label: "Download this image",
              },
              {
                execute: () =>
                  onEvent({
                    action: "download",
                    url: images.map((image) => image.src),
                  }),
                label: "Download all images",
              },
            ]}
          >
            <MenuTrigger appearance="primary" ml="auto">
              Download
            </MenuTrigger>
            <MenuContent align="end" />
          </Menu>
        ) : (
          <Button
            appearance="primary"
            ml="auto"
            onClick={() => onEvent({ action: "download", url: images[0].src })}
          >
            Download
          </Button>
        )}
      </Group>
    </Group>
  );
}

function buildPreviewFile(src: string, alt?: string): ProteusPreviewFile {
  const mime_type = getMimeFromUrl(src);
  const rawExt = mime_type.split("/")[1] ?? "jpg";
  const extension = rawExt === "jpeg" ? "jpg" : rawExt;
  const urlFilename =
    src.split("/").pop()?.split("?")[0] ?? `image.${extension}`;
  const full_name = alt ?? urlFilename;
  const dotIdx = full_name.lastIndexOf(".");
  const name = dotIdx > 0 ? full_name.slice(0, dotIdx) : full_name;
  return { extension, file_link: src, full_name, mime_type, name };
}

function getMimeFromUrl(src: string): string {
  const ext = src.split("?")[0].split(".").pop()?.toLowerCase() ?? "";
  return MIME_MAP[ext] ?? "image/jpeg";
}

ProteusImageCarousel.displayName = "@optiaxiom/proteus/ProteusImageCarousel";
