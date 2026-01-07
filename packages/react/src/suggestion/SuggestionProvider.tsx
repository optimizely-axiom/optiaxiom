import {
  unstable_SuggestionContext as SuggestionContext,
  unstable_SurfaceProvider,
} from "@optiaxiom/globals";
import { useId } from "@radix-ui/react-id";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useMemo,
  useState,
} from "react";

import { Button } from "../button";
import { Group } from "../group";
import { IconX } from "../icons/IconX";
import { Portal } from "../portal";
import { Text } from "../text";
import { Transition } from "../transition";

export type SuggestionProviderProps = {
  children?: ReactNode;
};

export function SuggestionProvider({ children }: SuggestionProviderProps) {
  const id = useId();
  const [suggestions, setSuggestions] = useState<
    Array<{
      suggestion: Extract<
        ComponentPropsWithoutRef<
          typeof unstable_SurfaceProvider
        >["suggestions"][number],
        { type: "message" | "value" }
      >;
      surface: Pick<
        ComponentPropsWithoutRef<typeof unstable_SurfaceProvider>,
        "accept" | "executeTool" | "reject" | "renderSuggestionValue"
      >;
    }>
  >([]);

  return (
    <SuggestionContext.Provider
      value={useMemo(
        () => ({
          add: (suggestion, surface) => {
            setSuggestions((suggestions) => [
              ...suggestions,
              { suggestion, surface },
            ]);
            return () => {
              setSuggestions((suggestions) =>
                suggestions.filter((s) => s.suggestion !== suggestion),
              );
            };
          },
        }),
        [],
      )}
    >
      {children}
      {suggestions.length > 0 && (
        <Portal asChild>
          <Group
            alignItems="center"
            flexDirection="column"
            gap="16"
            pointerEvents="none"
            style={{
              bottom: 32,
              insetInline: 32,
              position: "fixed",
            }}
            z="toast"
          >
            {suggestions.slice(0, 3).map(({ suggestion, surface }) => (
              <Transition data-side="top" key={suggestion.id} type="pop">
                <Group
                  aria-describedby={id + "-" + suggestion.id}
                  aria-label="App companion suggestion"
                  bg="bg.default"
                  color="fg.default"
                  fontSize="md"
                  gap="16"
                  maxW="lg"
                  p="16"
                  pointerEvents="auto"
                  role="dialog"
                  rounded="md"
                  shadow="md"
                >
                  <Group
                    flexDirection="column"
                    gap="4"
                    id={id + "-" + suggestion.id}
                  >
                    <Text>
                      {suggestion.type === "message" ? (
                        suggestion.text
                      ) : (
                        <>
                          <strong>Suggested:</strong>{" "}
                          {surface.renderSuggestionValue
                            ? surface.renderSuggestionValue(suggestion.value)
                            : String(suggestion.value)}
                        </>
                      )}
                    </Text>
                    {suggestion.type === "value" && suggestion.reason && (
                      <Text color="fg.secondary">{suggestion.reason}</Text>
                    )}
                  </Group>
                  <Button
                    appearance="primary-opal"
                    onClick={async () => {
                      if (suggestion.type === "message" && suggestion.tool) {
                        await surface.executeTool(
                          suggestion.tool.name,
                          suggestion.tool.parameters,
                        );
                      }

                      surface.accept(suggestion.id);
                    }}
                    size="sm"
                  >
                    Accept
                  </Button>
                  <Button
                    appearance="subtle"
                    aria-label="close"
                    color="fg.default"
                    flex="none"
                    icon={<IconX />}
                    onClick={() => {
                      surface.reject(suggestion.id);
                    }}
                    size="sm"
                  />
                </Group>
              </Transition>
            ))}
          </Group>
        </Portal>
      )}
    </SuggestionContext.Provider>
  );
}

SuggestionProvider.displayName = "@optiaxiom/react/SuggestionProvider";
