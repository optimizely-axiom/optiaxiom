import { type CommandOption } from "./CommandContext";

/**
 * @internal Type expansion for CommandOption
 */
export function CommandOptionDoc(
  _props: Omit<
    CommandOption,
    "hiddenInSearchContext" | "parentOption" | "surface"
  >,
) {}

CommandOptionDoc.displayName = "@optiaxiom/react/CommandOptionDoc";
