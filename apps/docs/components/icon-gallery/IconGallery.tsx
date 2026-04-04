"use client";

import * as Icons from "@optiaxiom/icons";
import {
  Box,
  Group,
  SearchInput,
  Switch,
  Text,
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from "@optiaxiom/react";
import { type ComponentType, useMemo, useRef, useState } from "react";

import tags from "../../../../packages/icons/tags.json";

type IconComponent = ComponentType<{
  filled?: boolean;
  size?: number | string;
}>;

const iconEntries = Object.entries(tags)
  .filter(([key]) => key !== "//")
  .map(([component, keywords]) => {
    const label = component
      .replace(/^Icon/, "")
      .replace(/([a-z\d])([A-Z])/g, "$1 $2")
      .replace(/([a-zA-Z])(\d)/g, "$1 $2")
      .replace(/(\d)([a-zA-Z])/g, "$1 $2");
    return {
      component,
      label,
      searchText: [label, ...keywords].join(" ").toLowerCase(),
    };
  })
  .sort((a, b) => a.label.localeCompare(b.label));

export function IconGallery() {
  const [search, setSearch] = useState("");
  const [defaultFilled, setDefaultFilled] = useState(false);
  const [copiedIcon, setCopiedIcon] = useState<null | string>(null);
  const timerRef = useRef<number>();

  const filtered = useMemo(() => {
    if (!search) return iconEntries;
    const lower = search.toLowerCase();
    return iconEntries.filter((entry) => entry.searchText.includes(lower));
  }, [search]);

  const handleCopy = async (component: string) => {
    await navigator.clipboard.writeText(component);
    setCopiedIcon(component);
    clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setCopiedIcon(null);
    }, 2000);
  };

  return (
    <Group
      flexDirection="column"
      gap="24"
      mt="16"
      style={{ minHeight: "600px" }}
    >
      <Group gap="16">
        <SearchInput
          flex="1"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search icons..."
          size="lg"
          value={search}
        />
        <Switch checked={defaultFilled} onCheckedChange={setDefaultFilled}>
          Filled
        </Switch>
      </Group>

      {filtered.length === 0 ? (
        <Box p="24">
          <Text color="fg.tertiary" textAlign="center">
            No icons found matching &ldquo;{search}&rdquo;
          </Text>
        </Box>
      ) : (
        <Group alignItems="start" flexWrap="wrap" gap="8">
          {filtered.map(({ component, label }) => (
            <IconCell
              component={component}
              copied={copiedIcon === component}
              defaultFilled={defaultFilled}
              key={component}
              label={label}
              onCopy={handleCopy}
            />
          ))}
        </Group>
      )}
    </Group>
  );
}

function IconCell({
  component,
  copied,
  defaultFilled,
  label,
  onCopy,
}: {
  component: string;
  copied: boolean;
  defaultFilled: boolean;
  label: string;
  onCopy: (component: string) => void;
}) {
  const Icon = (Icons as Record<string, IconComponent>)[component];
  const [hovered, setHovered] = useState(false);
  const filled = defaultFilled ? !hovered : hovered;

  return (
    <TooltipRoot open={copied}>
      <TooltipTrigger asChild onClick={() => onCopy(component)}>
        <Group
          alignItems="center"
          cursor="pointer"
          flexDirection="column"
          gap="16"
          onPointerOut={() => setHovered(false)}
          onPointerOver={() => setHovered(true)}
          px="8"
          py="16"
          rounded="md"
          transition="colors"
        >
          <style>{`
            @scope {
              :scope {
                width: 112px;

                &:hover {
                  background-color: var(--ax-colors-bg-tertiary);
                }
              }
            }
          `}</style>
          <Group gap="8">
            <Icon filled={filled} size="lg" />
          </Group>
          <Text color="fg.secondary" fontSize="md" textAlign="center">
            {label}
          </Text>
        </Group>
      </TooltipTrigger>
      <TooltipContent>Copied!</TooltipContent>
    </TooltipRoot>
  );
}
