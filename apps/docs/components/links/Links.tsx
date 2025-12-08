import { Alert, Button, Group, Text } from "@optiaxiom/react";
import NextLink from "next/link";
import { Link } from "nextra-theme-docs";
import { GitHubIcon } from "nextra/icons";

export const Links = ({ component }: { component: string }) => (
  <Group alignItems="start" flexDirection="column" gap="16">
    <Group gap="12" mt="16">
      <Button asChild icon={<GitHubIcon />}>
        <NextLink
          href={`https://github.com/optimizely-axiom/optiaxiom/tree/main/packages/react/src/${component}/`}
          rel="noreferrer"
          target="_blank"
        >
          Source
        </NextLink>
      </Button>
    </Group>

    <Alert intent="information">
      <Text>
        Want to skip the docs? Try our{" "}
        <Link href="/guides/mcp/">MCP Server</Link>
      </Text>
    </Alert>
  </Group>
);
