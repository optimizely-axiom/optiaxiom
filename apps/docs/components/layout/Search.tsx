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

  return (
    <Spotlight
      empty={error || (inputValue ? "No results found." : "Type to search.")}
      inputValue={inputValue}
      loading={loading && (results.length ? "spinner" : "both")}
      onInputValueChange={setInputValue}
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
          execute: () => {
            setInputValue("");
            router.push(route);
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
