import styles from "./DemoIframe.module.css";

export function DemoIframe({ height, src }: { height?: string; src: string }) {
  return (
    <iframe
      className={styles.base}
      height={height ?? 500}
      src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`}
      title="Demo Preview"
    />
  );
}
