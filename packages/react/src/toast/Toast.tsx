import * as RadixToast from "@radix-ui/react-toast";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import { IconCross } from "./IconCross";
import { IconDanger } from "./IconDanger";
import { IconInfoCircle } from "./IconInfoCircle";
import { IconSuccess } from "./IconSuccess";
import { IconWarning } from "./IconWarning";
import * as styles from "./Toast.css";

type ToastProps = BoxProps<
  typeof RadixToast.Root,
  {
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

const iconMap = new Map([
  ["danger", IconDanger],
  ["info", IconInfoCircle],
  ["success", IconSuccess],
  ["warning", IconWarning],
]);

const getIcon = (type: string) => {
  const IconComponent = iconMap.get(type);
  return IconComponent ? <IconComponent /> : null;
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      children,
      onClose,
      open,
      position = "bottom-right",
      type = "info",
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex asChild {...sprinkleProps}>
        <RadixToast.ToastProvider>
          <Box asChild {...styles.viewPort({ position })}>
            <RadixToast.Viewport>
              <Flex
                alignItems="center"
                asChild
                flexDirection="row"
                gap="10"
                justifyContent="space-between"
                ref={ref}
                rounded="md"
                {...sprinkleProps}
              >
                <RadixToast.Root
                  onOpenChange={onClose}
                  onSwipeStart={onClose}
                  open={open}
                  {...styles.root({ type })}
                  {...restProps}
                >
                  <Flex flexDirection="row" gap="8" px="16" py="16">
                    <Box asChild {...styles.leftSection()}>
                      {getIcon(type)}
                    </Box>
                    <Box asChild {...styles.description()}>
                      <RadixToast.Description>
                        {children}
                      </RadixToast.Description>
                    </Box>
                  </Flex>
                  <Flex {...styles.close()}>
                    <RadixToast.Close
                      aria-label="close"
                      asChild
                      onClick={onClose}
                    >
                      <Button appearance="secondary" icon={<IconCross />} />
                    </RadixToast.Close>
                  </Flex>
                </RadixToast.Root>
              </Flex>
            </RadixToast.Viewport>
          </Box>
        </RadixToast.ToastProvider>
      </Flex>
    );
  },
);

Toast.displayName = "@optiaxiom/react/Toast";
