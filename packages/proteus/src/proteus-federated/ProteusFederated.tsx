import {
  getInstance,
  init,
  loadRemote,
  registerRemotes,
} from "@module-federation/enhanced/runtime";
import { useId } from "@radix-ui/react-id";
import {
  type ComponentType,
  type ReactNode,
  Suspense,
  useEffect,
  useState,
} from "react";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";

export type ProteusFederatedProps = {
  /**
   * URL to the remote's remoteEntry.js or mf-manifest.json
   */
  entry: string;
  /**
   * The key from the remote's ModuleFederationPlugin exposes config (e.g. './App'). Defaults to '.' (root export)
   */
  exposeKey?: string;
  /**
   * Content rendered when the federated component fails to load
   */
  fallback?: ReactNode;
};

export function ProteusFederated({
  entry,
  exposeKey = ".",
  fallback,
}: ProteusFederatedProps) {
  const { data, onEvent } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusFederated",
  );

  const id = useId();
  const name = `proteus_${id.replace(/[^a-zA-Z0-9]/g, "_")}`;
  const [Component, setComponent] = useState<ComponentType<
    Record<string, unknown>
  > | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!entry) {
      setError(true);
      return;
    }
    // Before React 18 the id is empty until after the first render; wait for
    // it so every instance registers under its own remote name.
    if (!id) {
      return;
    }

    let cancelled = false;

    ensureInstance();
    registerRemotes([{ entry, name, type: "esm" }], { force: false });

    const modulePath = exposeKey === "." ? "" : exposeKey.replace(/^\.\//, "");
    const remoteId = modulePath ? `${name}/${modulePath}` : name;
    loadRemote<{ default: ComponentType<Record<string, unknown>> }>(remoteId)
      .then((mod) => {
        if (!cancelled && mod) {
          setComponent(() => mod.default);
        } else if (!cancelled) {
          setError(true);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [entry, exposeKey, id, name]);

  if (error) {
    return fallback ? <>{fallback}</> : null;
  }

  if (!Component) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Component data={data} onEvent={onEvent} />
    </Suspense>
  );
}

function ensureInstance() {
  if (!getInstance()) {
    init({ name: "proteus-federated", remotes: [] });
  }
}

ProteusFederated.displayName = "@optiaxiom/proteus/ProteusFederated";
