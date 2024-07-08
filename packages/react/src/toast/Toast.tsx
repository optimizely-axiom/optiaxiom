import * as RadixToast from "@radix-ui/react-toast";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Toast.css";

type ToastProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  ComponentPropsWithRef<typeof RadixToast.Root>,
  {
    children: ReactNode;
    close: ReactNode;
    onClose?: () => void;
    open: boolean;
    position?:
      | "bottom"
      | "bottom-left"
      | "bottom-right"
      | "top"
      | "top-left"
      | "top-right";
    type?: "danger" | "info" | "success" | "warning";
  }
>;

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      children,
      close,
      onClose,
      open,
      position = "bottom-right",
      type = "info",
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    const getIcon = () => {
      switch (type) {
        case "info":
          return info;
        case "danger":
          return danger;
        case "warning":
          return warning;
        case "success":
          return success;
        default:
          return info;
      }
    };

    return (
      <Flex asChild {...sprinkleProps}>
        <RadixToast.ToastProvider>
          <Box asChild {...styles.viewPort({ position })}>
            <RadixToast.Viewport>
              <Flex
                asChild
                {...sprinkleProps}
                alignItems="center"
                flexDirection="row"
                gap="10"
                justifyContent="space-between"
                ref={ref}
                rounded="md"
              >
                <RadixToast.Root
                  onOpenChange={onClose}
                  onSwipeStart={onClose}
                  open={open}
                  {...restProps}
                  {...styles.root({ type })}
                >
                  <Flex flexDirection="row" gap="8" px="16" py="16">
                    <Box asChild {...styles.leftSection()}>
                      {getIcon()}
                    </Box>
                    <Box asChild display="block" {...styles.description()}>
                      <RadixToast.Description>
                        {children}
                      </RadixToast.Description>
                    </Box>
                  </Flex>
                  <Box
                    display="flex"
                    {...styles.close()}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <RadixToast.Close
                      aria-label="close"
                      asChild
                      onClick={onClose}
                    >
                      <svg
                        fill="none"
                        height="11"
                        viewBox="0 0 11 11"
                        width="11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.8437 9.875C10.6562 10.0625 10.3124 10.0625 10.1249 9.875L5.99994 5.71875L1.84369 9.875C1.65619 10.0625 1.31244 10.0625 1.12494 9.875C0.937439 9.6875 0.937439 9.34375 1.12494 9.15625L5.28119 5L1.12494 0.875C0.937439 0.6875 0.937439 0.34375 1.12494 0.15625C1.31244 -0.03125 1.65619 -0.03125 1.84369 0.15625L5.99994 4.3125L10.1249 0.15625C10.3124 -0.03125 10.6562 -0.03125 10.8437 0.15625C11.0312 0.34375 11.0312 0.6875 10.8437 0.875L6.68744 5L10.8437 9.15625C11.0312 9.34375 11.0312 9.6875 10.8437 9.875Z"
                          fill="#262B37"
                        />
                      </svg>
                    </RadixToast.Close>
                  </Box>
                </RadixToast.Root>
              </Flex>
            </RadixToast.Viewport>
          </Box>
        </RadixToast.ToastProvider>
      </Flex>
    );
  },
);

const info = (
  <svg
    fill="none"
    height="16"
    viewBox="0 0 20 16"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 0C5.5625 0 2 3.59375 2 8C2 12.4375 5.5625 16 10 16C14.4062 16 18 12.4375 18 8C18 3.59375 14.4062 0 10 0ZM10 15C6.125 15 3 11.875 3 8C3 4.15625 6.125 1 10 1C13.8438 1 17 4.15625 17 8C17 11.875 13.8438 15 10 15ZM10 5.75C10.4062 5.75 10.75 5.4375 10.75 5C10.75 4.59375 10.4062 4.25 10 4.25C9.5625 4.25 9.25 4.59375 9.25 5C9.25 5.4375 9.5625 5.75 10 5.75ZM11.5 11H10.5V7.5C10.5 7.25 10.25 7 10 7H9C8.71875 7 8.5 7.25 8.5 7.5C8.5 7.78125 8.71875 8 9 8H9.5V11H8.5C8.21875 11 8 11.25 8 11.5C8 11.7812 8.21875 12 8.5 12H11.5C11.75 12 12 11.7812 12 11.5C12 11.25 11.75 11 11.5 11Z"
      fill="#0037FF"
    />
  </svg>
);

const danger = (
  <svg
    fill="none"
    height="16"
    viewBox="0 0 20 16"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.99075 0C5.55325 0 1.99075 3.59375 1.99075 8C1.99075 12.4375 5.55325 16 9.99075 16C14.397 16 17.9908 12.4375 17.9908 8C17.9908 3.59375 14.397 0 9.99075 0ZM9.99075 15C6.11575 15 2.99075 11.875 2.99075 8C2.99075 4.15625 6.11575 1 9.99075 1C13.8345 1 16.9908 4.15625 16.9908 8C16.9908 11.875 13.8345 15 9.99075 15ZM9.99075 9.5C10.2408 9.5 10.4908 9.28125 10.4908 9V4C10.4908 3.75 10.2408 3.5 9.99075 3.5C9.7095 3.5 9.49075 3.75 9.49075 4V9C9.49075 9.28125 9.7095 9.5 9.99075 9.5ZM9.99075 10.75C9.55325 10.75 9.24075 11.0938 9.24075 11.5C9.24075 11.9375 9.55325 12.25 9.99075 12.25C10.397 12.25 10.7408 11.9375 10.7408 11.5C10.7408 11.0938 10.397 10.75 9.99075 10.75Z"
      fill="#CC1616"
    />
  </svg>
);

const warning = (
  <svg
    fill="none"
    height="16"
    viewBox="0 0 20 16"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.0064 11.25C9.56888 11.25 9.25638 11.5938 9.25638 12C9.25638 12.4375 9.60013 12.75 10.0064 12.75C10.4126 12.75 10.7251 12.4375 10.7251 12C10.7564 11.5938 10.4126 11.25 10.0064 11.25ZM10.0064 10C10.2564 10 10.4751 9.78125 10.4751 9.5V5C10.4751 4.75 10.2251 4.5 10.0064 4.5C9.75638 4.5 9.50638 4.75 9.50638 5V9.5C9.50638 9.78125 9.72513 10 10.0064 10ZM17.7564 12.4375L11.5064 1.875C11.1939 1.34375 10.6314 1.03125 10.0064 1C9.35013 1 8.78763 1.34375 8.47513 1.875L2.22513 12.4375C1.91263 12.9688 1.91263 13.5938 2.22513 14.125C2.53763 14.6875 3.10013 15 3.75638 15H16.2564C16.8814 15 17.4439 14.6875 17.7564 14.125C18.0689 13.5938 18.0689 12.9688 17.7564 12.4375ZM16.8814 13.625C16.7564 13.875 16.5064 14 16.2251 14H3.75638C3.47513 14 3.22513 13.875 3.10013 13.625C2.94388 13.4062 2.97513 13.1562 3.10013 12.9375L9.35013 2.375C9.47513 2.15625 9.72513 2 10.0064 2C9.97513 2 10.0064 2 10.0064 2C10.2564 2.03125 10.5064 2.15625 10.6314 2.375L16.8814 12.9375C17.0064 13.1562 17.0376 13.4062 16.8814 13.625Z"
      fill="#F79008"
    />
  </svg>
);

const success = (
  <svg
    fill="none"
    height="16"
    viewBox="0 0 20 16"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.6158 5.65625L8.99075 9.3125L7.3345 7.65625C7.147 7.46875 6.80325 7.46875 6.61575 7.65625C6.42825 7.84375 6.42825 8.1875 6.61575 8.375L8.61575 10.375C8.7095 10.4688 8.8345 10.5 8.99075 10.5C9.11575 10.5 9.24075 10.4688 9.3345 10.375L13.3345 6.375C13.522 6.1875 13.522 5.84375 13.3345 5.65625C13.147 5.46875 12.8033 5.46875 12.6158 5.65625ZM9.99075 0C5.55325 0 1.99075 3.59375 1.99075 8C1.99075 12.4375 5.55325 16 9.99075 16C14.397 16 17.9908 12.4375 17.9908 8C17.9908 3.59375 14.397 0 9.99075 0ZM9.99075 15C6.11575 15 2.99075 11.875 2.99075 8C2.99075 4.15625 6.11575 1 9.99075 1C13.8345 1 16.9908 4.15625 16.9908 8C16.9908 11.875 13.8345 15 9.99075 15Z"
      fill="#03A65D"
    />
  </svg>
);

Toast.displayName = "@optiaxiom/react/Toast";
