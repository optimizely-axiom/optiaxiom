import "@optiaxiom/globals/fonts";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  createContext,
  forwardRef,
  useContext,
} from "react";

import type { ExtendProps } from "../utils";

import { version } from "../../package.json";
import { type Sprinkles, extractSprinkles, sprinkles } from "../sprinkles";
import * as styles from "./Box.css";

const SprinklesContext = createContext<Sprinkles | undefined>(undefined);

export type BoxProps<T extends ElementType = "div", P = unknown> = ExtendProps<
  ComponentPropsWithoutRef<T>,
  ExtendProps<
    {
      asChild?: boolean;
      className?: string;
    } & Sprinkles,
    P
  >
>;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    const { restProps, sprinkleProps } = extractSprinkles(props);

    /**
     * Handle merging of sprinkle props when composing by removing sprinkle
     * props that are overridden/duplicated in child.
     *
     * Otherwise className will get generated based on sprinkle props and will
     * not be overridden correctly by child's className.
     */
    const outerSprinkleProps = useContext(SprinklesContext);
    if (className && outerSprinkleProps) {
      for (const [key, value] of Object.entries(outerSprinkleProps)) {
        if (key in sprinkleProps) {
          className = (" " + className + " ")
            .replace(" " + sprinkles({ [key]: value }) + " ", " ")
            .trim();
        }
      }
    }

    return (
      <SprinklesContext.Provider value={asChild ? sprinkleProps : undefined}>
        <Comp
          data-axiom={version}
          ref={ref}
          {...styles.box({}, clsx(className, sprinkles(sprinkleProps)))}
          {...restProps}
        />
      </SprinklesContext.Provider>
    );
  },
);

Box.displayName = "@optiaxiom/react/Box";
