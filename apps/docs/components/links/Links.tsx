import { Button, Flex } from "@optiaxiom/react";
import Link from "next/link";
import { GitHubIcon } from "nextra/icons";

export const Links = ({ component }: { component: string }) => (
  <Flex flexDirection="row" gap="12" mt="16">
    <Button asChild icon={<GitHubIcon />}>
      <Link
        href={`https://github.com/optimizely-axiom/optiaxiom/tree/main/packages/react/src/${component}/`}
        rel="noreferrer"
        target="_blank"
      >
        Source
      </Link>
    </Button>
  </Flex>
);
