import { Grid } from "@optiaxiom/react";

import styles from "./Cards.module.css";
import { CardsItem } from "./CardsItem";
import { DialogIcon } from "./icons/DialogIcon";
import { StyledSystemIcon } from "./icons/StyledSystemIcon";

const COMPONENTS = {
  Components: {
    description:
      "Discover all the components available in our library and how to use them.",
    href: "/components/",
    icon: <DialogIcon />,
    title: "Components",
  },
  StyledSystem: {
    description:
      "Learn about our styling solution and how to consume our design tokens.",
    href: "/styled-system/",
    icon: <StyledSystemIcon />,
    title: "Styled System",
  },
};

export function Cards({ items }: { items: Array<keyof typeof COMPONENTS> }) {
  return (
    <Grid
      className={styles.cards}
      gap="16"
      gridTemplateColumns={["1", "2"]}
      mt="16"
    >
      {items
        .map((name) => COMPONENTS[name])
        .map((data) => (
          <CardsItem
            href={data.href}
            icon={data.icon}
            key={data.title}
            title={data.title}
          >
            {data.description}
          </CardsItem>
        ))}
    </Grid>
  );
}
