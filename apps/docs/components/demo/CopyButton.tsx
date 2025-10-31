import {
  Button,
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from "@optiaxiom/react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useRef, useState } from "react";

export function CopyButton({ onCopy }: { onCopy: () => string }) {
  const ref = useRef<HTMLButtonElement>(null);

  const [isCopied, setIsCopied] = useState(false);
  const timerRef = useRef<number>();

  return (
    <TooltipRoot>
      <TooltipTrigger
        asChild
        onClick={(event) => event.preventDefault()}
        onPointerDown={async (event) => {
          event.preventDefault();

          const content = onCopy();
          setIsCopied(true);
          await navigator.clipboard.writeText(content);
          clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            setIsCopied(false);
          }, 2000);
        }}
        ref={ref}
      >
        <Button
          appearance="subtle"
          aria-label="Copy"
          icon={
            isCopied ? (
              <IconCheck pointerEvents="none" />
            ) : (
              <IconCopy pointerEvents="none" />
            )
          }
        />
      </TooltipTrigger>
      <TooltipContent
        onPointerDownOutside={(event) => {
          if (
            event.target instanceof Node &&
            ref.current?.contains(event.target)
          ) {
            event.preventDefault();
          }
        }}
      >
        {isCopied ? "Copied" : "Copy"}
      </TooltipContent>
    </TooltipRoot>
  );
}
