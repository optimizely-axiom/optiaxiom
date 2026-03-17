export async function downloadFile(url: string) {
  const response = await fetch(url, { credentials: "include" });
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = url.split("/").pop() || "";
  a.click();
  URL.revokeObjectURL(objectUrl);
}
