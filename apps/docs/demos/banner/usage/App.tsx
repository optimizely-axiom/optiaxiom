import {
  Banner,
  BannerDescription,
  BannerTitle,
  Link,
  Text,
} from "@optiaxiom/react";

export function App() {
  return (
    <Banner>
      <BannerTitle>Some action is not permitted</BannerTitle>
      <BannerDescription>
        <Text>
          You do not have the required permissions to perform this action.
        </Text>

        <Text>
          <Link href="data:,">Request access</Link>
        </Text>
      </BannerDescription>
    </Banner>
  );
}
