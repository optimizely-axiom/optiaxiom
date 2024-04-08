import styles from "./DemoIframe.module.css";

export function DemoIframe({ src }: { src: string }) {
  return (
    <iframe
      className={styles.base}
      src={`/optiaxiom${src}`}
      title="Demo Preview"
    />
  );
}
