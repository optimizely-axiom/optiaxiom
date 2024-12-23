import { usePagination } from "@mantine/hooks";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { forwardRef, useEffect, useRef, useState } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { ButtonBase } from "../button-base";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";
import { IconEllipsis } from "../icons/IconEllipsis";
import { Tooltip } from "../tooltip";
import * as styles from "./Pagination.css";

export type PaginationProps = BoxProps<
  "nav",
  {
    /**
     * The default active page in uncontrolled mode.
     */
    defaultPage?: number;
    /**
     * Whether to disable all button.
     */
    disabled?: boolean;
    /**
     * Handler that is called when the active page is changed.
     */
    onPageChange?: (offset: number) => void;
    /**
     * The active page in controlled mode.
     */
    page?: number;
    /**
     * The total number of pages to display.
     */
    total: number;
  }
>;

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    { defaultPage, disabled, onPageChange, page: pageProp, total, ...props },
    ref,
  ) => {
    const [value, setValue] = useControllableState({
      defaultProp: defaultPage,
      onChange: onPageChange,
      prop: pageProp,
    });
    const { active, next, previous, range, setPage } = usePagination({
      onChange: setValue,
      page: value,
      siblings: 2,
      total,
    });

    const [animation, setAnimation] = useState(false);
    const activeRef = useRef<HTMLButtonElement>(null);
    const cursorRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
      if (!activeRef.current || !cursorRef.current) {
        return;
      }

      cursorRef.current.style.transform = `translateX(${activeRef.current.offsetLeft}px)`;
      cursorRef.current.style.visibility = "visible";
      setTimeout(() => setAnimation(true), 150);
    }, [active]);

    return (
      <Box asChild {...props}>
        <nav aria-label="pagination" ref={ref}>
          <Flex asChild {...styles.list()}>
            <ul>
              <ButtonBase
                appearance="subtle"
                aria-hidden
                asChild
                data-state="active"
                disabled={disabled}
                ref={cursorRef}
                {...styles.cursor({ animation })}
              >
                <span>{active}</span>
              </ButtonBase>

              <li>
                <Tooltip content="Prev" disabled={disabled || active === 1}>
                  <Button
                    appearance="subtle"
                    aria-label="Previous page"
                    disabled={disabled || active === 1}
                    icon={<IconAngleLeft />}
                    onClick={previous}
                  />
                </Tooltip>
              </li>

              {range.map((page, index) => (
                <li
                  key={
                    page === "dots"
                      ? `${page}-${
                          index < range.indexOf(active) ? "before" : "after"
                        }`
                      : page
                  }
                >
                  {page === "dots" ? (
                    <Box
                      alignItems="stretch"
                      display="flex"
                      justifyContent="center"
                      px="6"
                      py="8"
                      size="md"
                    >
                      <Icon
                        asChild
                        color={disabled ? "fg.disabled" : "fg.default"}
                        cursor={disabled ? "not-allowed" : "default"}
                      >
                        <IconEllipsis />
                      </Icon>
                    </Box>
                  ) : (
                    <ButtonBase
                      appearance="subtle"
                      aria-current={active === page ? "page" : undefined}
                      disabled={disabled}
                      onClick={() => setPage(page)}
                      ref={active === page ? activeRef : undefined}
                      {...styles.button()}
                    >
                      <VisuallyHidden>page</VisuallyHidden> {page}
                      {page === 1 ? (
                        <VisuallyHidden>(first page)</VisuallyHidden>
                      ) : page === total ? (
                        <VisuallyHidden>(last page)</VisuallyHidden>
                      ) : null}
                    </ButtonBase>
                  )}
                </li>
              ))}

              <li>
                <Tooltip content="Next" disabled={disabled || active === total}>
                  <Button
                    appearance="subtle"
                    aria-label="Next page"
                    disabled={disabled || active === total}
                    icon={<IconAngleRight />}
                    onClick={next}
                  />
                </Tooltip>
              </li>
            </ul>
          </Flex>
        </nav>
      </Box>
    );
  },
);

Pagination.displayName = "@optiaxiom/react/Pagination";
