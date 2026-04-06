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

import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";
import { downloadFile } from "../proteus-image/downloadFile";
import { ProteusImage } from "../proteus-image/ProteusImage";
import * as styles from "./ProteusImageCarousel.css";

export type ProteusImageCarouselProps = {
  /**
   * URL to download all images (e.g. as a zip file).
   */
  downloadAll?: string;
  /**
   * Array of image data to display in the carousel.
   */
  images: Array<{
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
  downloadAll,
  images,
  title,
}: ProteusImageCarouselProps) {
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: false });
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
                execute: () => downloadFile(images[selectedIndex].src),
                label: "Download this image",
              },
              {
                execute: () => {
                  if (downloadAll) {
                    window.open(downloadAll, "_blank");
                  } else {
                    for (const image of images) {
                      void downloadFile(image.src);
                    }
                  }
                },
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
            onClick={() => downloadFile(images[0].src)}
          >
            Download
          </Button>
        )}
      </Group>
    </Group>
  );
}

ProteusImageCarousel.displayName = "@optiaxiom/proteus/ProteusImageCarousel";
