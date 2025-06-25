"use client";

import {
  Button,
  Flex,
  Text,
  theme,
  Transition,
  TransitionGroup,
} from "@optiaxiom/react";
import { useEffect, useId, useState } from "react";

export function CookieConsent() {
  const [consent, setConsent] = useState(true);
  useEffect(() => {
    if (
      !(
        document.cookie.includes("_clck=") ||
        document.cookie.includes("consent=decline")
      )
    ) {
      requestAnimationFrame(() => setConsent(false));
    }
  }, []);

  const id = useId();

  return (
    <TransitionGroup open={!consent}>
      <Transition>
        <Flex
          flexDirection="row"
          justifyContent="flex-end"
          pointerEvents="none"
          style={{
            bottom: 32,
            insetInline: 32,
            position: "fixed",
            [theme.fontSize.md.fontSize.slice(4, -1)]: "13px",
          }}
        >
          <Flex
            aria-describedby={id}
            aria-label="Cookie consent prompt"
            bg="bg.default"
            color="fg.default"
            fontSize="md"
            maxW="xs"
            p="16"
            pointerEvents="auto"
            role="dialog"
            rounded="md"
            shadow="md"
          >
            <Text id={id}>
              We use non-essential cookies to improve user experience and
              analyze website traffic.
            </Text>
            <Flex flexDirection="row" justifyContent="flex-end">
              <Button
                appearance="subtle"
                onClick={() => {
                  document.cookie = [
                    "consent=decline",
                    `expires=${new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30).toUTCString()}`,
                    "path=/",
                  ].join(";");
                  setConsent(true);
                }}
              >
                Decline
              </Button>
              <Button
                appearance="inverse"
                onClick={() => {
                  if (
                    "clarity" in window &&
                    typeof window.clarity === "function"
                  ) {
                    window.clarity("consent");
                  }
                  setConsent(true);
                }}
              >
                Allow cookies
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Transition>
    </TransitionGroup>
  );
}
