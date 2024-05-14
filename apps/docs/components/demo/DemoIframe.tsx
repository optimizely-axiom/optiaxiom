import styles from "./DemoIframe.module.css";

export function DemoIframe({ src }: { src: string }) {
  return (
    <iframe
      className={styles.base}
      src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`}
      title="Demo Preview"
    />
  );
}
