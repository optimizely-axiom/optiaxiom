import type { CardProps } from "@optiaxiom/react";

import { Card } from "@optiaxiom/react";

import * as styles from "./ProteusCard.css";

export type ProteusCardProps = CardProps;

/**
 * Wraps the design-system `Card` and adds a hover affordance that is shown
 * only while a `CardLink` inside the card is hovered (rather than on a bare
 * card hover).
 */
export function ProteusCard({ className, ...props }: ProteusCardProps) {
  return (
    <Card
      className={[styles.card, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

ProteusCard.displayName = "@optiaxiom/proteus/ProteusCard";
