"use client";

import { Box, Kbd, type MenuOption } from "@optiaxiom/react";
import {
  Spotlight,
  SpotlightContent,
  SpotlightTrigger,
} from "@optiaxiom/react/unstable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  pageTitle,
  searchPages,
  type SearchResult,
  siteSection,
  stripTitle,
  toRoute,
} from "./pagefind";
import styles from "./Search.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Search({
  legacyPages,
}: {
  /** Deprecated page routes mapped to the route that replaces each. */
  legacyPages: Record<string, string>;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!inputValue) {
      setResults([]);
      setError("");
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    void (async () => {
      try {
        const pages = await searchPages(inputValue, legacyPages);
        // `null` means a newer search superseded this one.
        if (pages && !cancelled) {
          setResults(pages);
          setError("");
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setResults([]);
          setError(
            process.env.NODE_ENV === "production"
              ? "Failed to load search index."
              : "Search needs the Pagefind index from a production build.",
          );
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [inputValue, legacyPages]);

  // The site search owns Cmd/Ctrl+K: this capture listener runs before any
  // Spotlight's own shortcut (bound further down the tree) and stops it, so
  // the Spotlight demos on the docs pages don't open too.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const mod = navigator.userAgent.includes("Mac")
        ? event.metaKey
        : event.ctrlKey;
      const target = event.target as HTMLElement | null;
      if (
        event.key.toLowerCase() !== "k" ||
        !mod ||
        event.altKey ||
        event.shiftKey ||
        // Like Spotlight's own shortcut, which skips typing in a field.
        target?.isContentEditable ||
        ["INPUT", "SELECT", "TEXTAREA"].includes(target?.tagName ?? "")
      ) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      setOpen((open) => !open);
    };
    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () =>
      window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, []);

  return (
    <Spotlight
      disableHotkey
      empty={error || (inputValue ? "No results found." : "Type to search.")}
      inputValue={inputValue}
      loading={loading && (results.length ? "spinner" : "both")}
      onInputValueChange={setInputValue}
      onOpenChange={setOpen}
      open={open}
      options={results.map<MenuOption>(({ page, section: subResult }) => {
        const route = toRoute(subResult.url);
        const excerpt = stripTitle(subResult.excerpt, subResult.title);
        return {
          description: excerpt && (
            <Box asChild fontSize="md">
              <span
                className={styles.excerpt}
                // Pagefind escapes the page text and only adds <mark> tags.
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
            </Box>
          ),
          // A section match names the section; a page match names its part
          // of the site ("Flex" component vs prop).
          detail: !subResult.url.includes("#")
            ? siteSection(route)
            : subResult.title !== pageTitle(page)
              ? subResult.title
              : undefined,
          // A controlled Spotlight leaves closing to the item.
          execute: ({ dismiss }) => {
            setInputValue("");
            router.push(route);
            if (dismiss) {
              setOpen(false);
            }
          },
          href: basePath + route,
          key: subResult.url,
          label: pageTitle(page),
          // Pagefind already matched and ranked these results.
          skipFilterScoring: true,
          visible: true,
        };
      })}
      placeholder="Search documentation…"
    >
      <Box className={styles.trigger}>
        <SpotlightTrigger
          aria-label="Search documentation"
          display={["flex", "none"]}
        />
        <SpotlightTrigger
          addonAfter={
            <Kbd color="fg.tertiary" ml="auto" modifiers="mod" variant="subtle">
              K
            </Kbd>
          }
          display={["none", "flex"]}
          w="224"
        >
          Search
        </SpotlightTrigger>
      </Box>
      <SpotlightContent className={styles.content} />
    </Spotlight>
  );
}
