import type { ComponentPropsWithoutRef } from "react";

import { Banner, BannerDescription, BannerTitle } from "@optiaxiom/react";

export function App({
  intent,
}: Pick<ComponentPropsWithoutRef<typeof Banner>, "intent">) {
  return (
    <Banner intent={intent}>
      <BannerTitle>Banner title</BannerTitle>
      <BannerDescription>Description of the banner message</BannerDescription>
    </Banner>
  );
}
