import { usePagination } from "@mantine/hooks";
import { IconChevronLeft } from "@optiaxiom/icons/IconChevronLeft";
import { IconChevronRight } from "@optiaxiom/icons/IconChevronRight";
import { IconEllipsisStroke } from "@optiaxiom/icons/IconEllipsisStroke";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef, useEffect, useRef, useState } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { ButtonRoot } from "../button/ButtonRoot";
import { Group } from "../group";
import { useTimeout } from "../hooks";
import { Icon } from "../icon";
import { useMessages } from "../locale";
import { Tooltip } from "../tooltip";
import { VisuallyHidden } from "../visually-hidden";
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

/**
 * Display active page and navigate between multiple pages.
 *
 * @category navigation
 * @since 0.1.0
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      defaultPage = 1,
      disabled,
      onPageChange,
      page: pageProp,
      total,
      ...props
    },
    ref,
  ) => {
    const messages = useMessages();
    const [value, setValue] = useControllableState({
      caller: "@optiaxiom/react/Pagination",
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
    const { clear, start } = useTimeout();
    useEffect(() => {
      if (!activeRef.current || !cursorRef.current) {
        return;
      }

      cursorRef.current.style.transform = `translateX(${activeRef.current.offsetLeft}px)`;
      cursorRef.current.style.visibility = "visible";
      start(() => setAnimation(true), 150);
      return clear;
    }, [active, clear, start]);

    return (
      <Box asChild {...props}>
        <nav aria-label={messages["pagination"]} ref={ref}>
          <Group asChild {...styles.list()}>
            <ul>
              <ButtonRoot
                appearance="subtle"
                aria-hidden
                asChild
                data-state="active"
                disabled={disabled}
                ref={cursorRef}
                {...styles.cursor({ animation })}
              >
                <span>{active}</span>
              </ButtonRoot>

              <li>
                <Tooltip
                  content={messages["Prev"]}
                  disabled={disabled || active === 1}
                >
                  <Button
                    appearance="subtle"
                    aria-label={messages["Previous page"]}
                    disabled={disabled || active === 1}
                    icon={<IconChevronLeft />}
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
                      >
                        <IconEllipsisStroke />
                      </Icon>
                    </Box>
                  ) : (
                    <ButtonRoot
                      appearance="subtle"
                      aria-current={active === page ? "page" : undefined}
                      disabled={disabled}
                      onClick={() => setPage(page)}
                      ref={active === page ? activeRef : undefined}
                      {...styles.button()}
                    >
                      <VisuallyHidden>
                        {messages["page {page}"](page)}
                      </VisuallyHidden>
                      <span aria-hidden="true">{page}</span>
                      {page === 1 ? (
                        <VisuallyHidden>
                          {messages["(first page)"]}
                        </VisuallyHidden>
                      ) : page === total ? (
                        <VisuallyHidden>
                          {messages["(last page)"]}
                        </VisuallyHidden>
                      ) : null}
                    </ButtonRoot>
                  )}
                </li>
              ))}

              <li>
                <Tooltip
                  content={messages["Next"]}
                  disabled={disabled || active === total}
                >
                  <Button
                    appearance="subtle"
                    aria-label={messages["Next page"]}
                    disabled={disabled || active === total}
                    icon={<IconChevronRight />}
                    onClick={next}
                  />
                </Tooltip>
              </li>
            </ul>
          </Group>
        </nav>
      </Box>
    );
  },
);

Pagination.displayName = "@optiaxiom/react/Pagination";
