import * as RadixDialog from "@radix-ui/react-dialog";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";
import * as styles from "./Dialog.css";

type ContentProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  ComponentPropsWithRef<typeof RadixDialog.DialogContent>,
  {
    children: ReactNode;
    hideCloseIcon?: boolean;
  } & styles.DialogVariants
>;
export const DialogContent = forwardRef<HTMLDivElement, ContentProps>(
  ({ children, hideCloseIcon = false, size = "md", ...props }, ref) => {
    return (
      <Box asChild>
        <RadixDialog.Portal>
          <Flex
            alignItems="center"
            asChild
            bg="dark.200"
            h="full"
            w="full"
            {...styles.overlay()}
          >
            <RadixDialog.Overlay>
              <Box
                asChild
                bg="white"
                ref={ref}
                rounded="lg"
                shadow="md"
                {...styles.content({ size })}
              >
                <RadixDialog.Content
                  aria-describedby={undefined}
                  bg="white"
                  ref={ref}
                  rounded="lg"
                  shadow="md"
                  {...props}
                >
                  {children}
                  {!hideCloseIcon && (
                    <Box asChild h="20" p="2" w="20" {...styles.close()}>
                      <RadixDialog.Close aria-label="Close" asChild>
                        <svg
                          fill="none"
                          height="16"
                          viewBox="0 0 20 16"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.8436 12.875C14.6561 13.0625 14.3124 13.0625 14.1249 12.875L9.99988 8.71875L5.84363 12.875C5.65613 13.0625 5.31238 13.0625 5.12488 12.875C4.93738 12.6875 4.93738 12.3438 5.12488 12.1562L9.28113 8L5.12488 3.875C4.93738 3.6875 4.93738 3.34375 5.12488 3.15625C5.31238 2.96875 5.65613 2.96875 5.84363 3.15625L9.99988 7.3125L14.1249 3.15625C14.3124 2.96875 14.6561 2.96875 14.8436 3.15625C15.0311 3.34375 15.0311 3.6875 14.8436 3.875L10.6874 8L14.8436 12.1562C15.0311 12.3438 15.0311 12.6875 14.8436 12.875Z"
                            fill="#080736"
                          />
                        </svg>
                      </RadixDialog.Close>
                    </Box>
                  )}
                </RadixDialog.Content>
              </Box>
            </RadixDialog.Overlay>
          </Flex>
        </RadixDialog.Portal>
      </Box>
    );
  },
);

DialogContent.displayName = "@optiaxiom/react/DialogContent";
