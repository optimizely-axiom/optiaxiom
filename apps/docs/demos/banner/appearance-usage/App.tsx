import type { ComponentPropsWithoutRef } from "react";

import { Banner, BannerDescription, BannerTitle } from "@optiaxiom/react";

export function App({
  colorScheme,
}: Pick<ComponentPropsWithoutRef<typeof Banner>, "colorScheme">) {
  return (
    <Banner colorScheme={colorScheme}>
      <BannerTitle>Banner title</BannerTitle>
      <BannerDescription>Description of the banner message</BannerDescription>
    </Banner>
  );
}
