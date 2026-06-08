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

export type ProteusImageCarouselProps = {
  /**
   * Array of image data to display in the carousel. The host is responsible for
   * supplying the preview metadata on each item.
   */
  images: Array<
    ProteusPreviewFile &
      // Legacy `{src, alt, thumb}` fields kept for backward compatibility with
      // older hosts that predate `ProteusPreviewFile`. They are only read as
      // fallbacks (`name`/`full_name`/`file_link` are preferred) and will be
      // removed in a future release.
      {
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
      }
  >;
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
    const index = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(index);
    emblaThumbsApi.scrollTo(index);
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
                alt={image.name ?? image.alt}
                key={index}
                onClick={() =>
                  onEvent({ action: "preview", file: toPreviewFile(image) })
                }
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
                  <img
                    alt={image.name ?? image.alt}
                    src={image.thumb ?? image.src}
                  />
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
                    url:
                      images[selectedIndex].file_link ??
                      images[selectedIndex].src,
                  }),
                label: "Download this image",
              },
              {
                execute: () =>
                  onEvent({
                    action: "download",
                    url: images.map((image) => image.file_link ?? image.src),
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
            onClick={() =>
              onEvent({
                action: "download",
                url: images[0].file_link ?? images[0].src,
              })
            }
          >
            Download
          </Button>
        )}
      </Group>
    </Group>
  );
}

function toPreviewFile({
  alt,
  extension,
  file_link,
  full_name,
  mime_type,
  name,
  src,
}: ProteusImageCarouselProps["images"][number]): ProteusPreviewFile {
  return {
    extension: extension ?? "JPG",
    file_link: file_link ?? src,
    full_name: full_name ?? alt ?? src,
    mime_type: mime_type ?? "image/jpeg",
    name: name ?? alt ?? src,
  };
}

ProteusImageCarousel.displayName = "@optiaxiom/proteus/ProteusImageCarousel";
