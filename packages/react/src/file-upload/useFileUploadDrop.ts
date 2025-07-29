import { AxiomAuthContext } from "@optiaxiom/globals";
import { useContext } from "react";

import type { BoxProps } from "../box";

import { type RemoteFile, useFileUploadContext } from "./FileUploadContext";

export const useFileUploadDrop = ({
  onDragOver,
  onDrop,
  ...props
}: BoxProps = {}): BoxProps => {
  const { accept, disabled, onFilesDrop } = useFileUploadContext(
    "@optiaxiom/react/useFileUploadDrop",
  );
  const auth = useContext(AxiomAuthContext);

  return {
    ...props,
    onDragOver: (event) => {
      onDragOver?.(event);
      if (disabled) {
        return;
      }

      event.preventDefault();
    },
    onDrop: async (event) => {
      onDrop?.(event);
      if (disabled) {
        return;
      }

      event.preventDefault();
      onFilesDrop?.(
        event.dataTransfer.items
          ? (
              await Promise.all(
                Array.from(event.dataTransfer.items).map((item) => {
                  if (item.kind === "file") {
                    const file = item.getAsFile();
                    return file && isValidFile(file, accept) ? file : null;
                  } else if (
                    item.type === "opal-chat-dnd-data" ||
                    item.type === "opal-host-dnd-data"
                  ) {
                    if (!auth) {
                      throw new Error(
                        "Could not find authentication credentials. Did you forget to wrap your component with `<AuthProvider>` from `@optiaxiom/react`?",
                      );
                    }

                    try {
                      const data = JSON.parse(
                        event.dataTransfer.getData(item.type),
                      ) as {
                        link: string;
                        mime_type: string;
                        name?: string;
                      };
                      const resource = {
                        name: data.name || "",
                        type: data.mime_type || "",
                        url: data.link,
                      };

                      return isValidFile(resource, accept)
                        ? getRemoteFile(resource, auth, true)
                        : null;
                    } catch {
                      /* empty */
                    }
                  }
                  return null;
                }),
              )
            ).filter((file) => !!file)
          : Array.from(event.dataTransfer.files).filter((file) =>
              isValidFile(file, accept),
            ),
      );
    },
  };
};

async function getRemoteFile(
  resource: {
    name: string;
    type: string;
    url: string;
  },
  auth: {
    instance: string;
    refresh: () => Promise<string>;
    token: string;
  },
  retry = false,
) {
  const url = new URL(resource.url);
  if (!url.searchParams.has("instance_id")) {
    url.searchParams.set("instance_id", auth.instance || "");
  }
  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${auth.token}`,
      "X-Instance-Id": auth.instance,
      "X-Product-Sku": "Axiom",
    },
  });
  if (response.status === 401 && retry) {
    return getRemoteFile(resource, {
      ...auth,
      token: await auth.refresh(),
    });
  }
  if (!response.ok) {
    return null;
  }
  return new File([await response.arrayBuffer()], resource.name, {
    type: response.headers.get("Content-Type") || "application/octet-stream",
  });
}

/**
 * Copied and modified from https://github.com/dropzone/dropzone
 */
function isValidFile(file: File | RemoteFile, accept: string) {
  if (!file) {
    return false;
  }
  if (!accept) {
    return true;
  }

  const acceptedFiles = accept.split(",");
  if (acceptedFiles.length === 0) {
    return true;
  }
  const fileName = "name" in file ? file.name : "";
  const mimeType = (file.type || "").toLowerCase();
  const baseMimeType = mimeType.replace(/\/.*$/, "");

  return acceptedFiles.some((type) => {
    const validType = type.trim().toLowerCase();
    if (validType.charAt(0) === ".") {
      return fileName.toLowerCase().endsWith(validType);
    } else if (validType.endsWith("/*")) {
      // This is something like a image/* mime type
      return baseMimeType === validType.replace(/\/.*$/, "");
    }
    return mimeType === validType;
  });
}
