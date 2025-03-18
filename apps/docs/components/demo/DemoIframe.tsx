import { useTheme } from "next-themes";
import {
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import styles from "./DemoIframe.module.css";

export function DemoIframe({
  children,
  disablePointerEvents,
  scrollable,
}: {
  children?: ReactNode;
  disablePointerEvents?: boolean;
  scrollable?: boolean;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const body = useIframe(iframeRef);

  return (
    <>
      <iframe
        className={styles.base}
        ref={iframeRef}
        srcDoc=""
        title="Demo Preview"
      />
      {body &&
        createPortal(
          <>
            <style>{`
              html {
                background: transparent !important;
                overflow: auto;
              }

              body {
                display: flex;
                justify-content: ${scrollable ? "start" : "center"};
                max-width: 100%;
                overflow: auto;
                padding: 32px;
              }
            `}</style>
            {children}
          </>,
          body,
        )}
      {disablePointerEvents && <div className={styles.pointer} />}
    </>
  );
}

const useIframe = (targetRef: RefObject<HTMLIFrameElement>) => {
  const [body, setBody] = useState<HTMLElement>();

  useEffect(() => {
    const target = targetRef.current?.contentWindow;
    if (!target) {
      return;
    } else {
      const setup = () => {
        setBody(target.document.body);
        observer.observe(target.document.body);
        cloneStyles(target);
      };

      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (targetRef.current) {
            targetRef.current.style.height = `${entry.target.clientHeight}px`;
          }
        }
      });

      if (target.location.href === "about:blank") {
        targetRef.current.addEventListener("load", setup);
      } else {
        setup();
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [targetRef]);

  const { resolvedTheme } = useTheme();
  useEffect(() => {
    if (resolvedTheme && targetRef.current?.contentDocument) {
      targetRef.current.contentDocument.documentElement.style.colorScheme =
        resolvedTheme;
    }
  }, [resolvedTheme, targetRef]);

  return body;
};

const cloneStyles = (target: Window) => {
  target.document.adoptedStyleSheets = [...document.styleSheets].flatMap(
    (sheet) => {
      const adoptedStyleSheet =
        // @ts-expect-error -- iframe complexity
        new target.CSSStyleSheet();
      adoptedStyleSheet.replace(
        [...sheet.cssRules].map((rule) => rule.cssText).join("\n"),
      );
      return [adoptedStyleSheet];
    },
  );
};
