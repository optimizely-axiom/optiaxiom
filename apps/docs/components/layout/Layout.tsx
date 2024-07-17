import Head from "next/head";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs } from "nextra/components";
import { useConfig, useMDXComponents } from "nextra-theme-docs";

import styles from "./Layout.module.css";

const startCase = (str: string, separator = "") =>
  str
    .split("-")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(separator);

export function Layout({ tabs, title }: { tabs: string[]; title: string }) {
  const [, selected] = usePathname().split("/").reverse();
  const { h1: H1 = "h1" } = useMDXComponents();
  const { useNextSeoProps = () => {} } = useConfig();
  const seoProps = { titleTemplate: "%s", ...useNextSeoProps() };
  return (
    <>
      <Head>
        <title>
          {seoProps.titleTemplate.replace(
            "%s",
            `${startCase(title)}${
              selected === title ? "" : ` – ${startCase(selected, " ")}`
            }`,
          )}
        </title>
      </Head>
      <div className={styles.tabs}>
        <H1>{startCase(title)}</H1>
        <Tabs
          defaultIndex={selected ? tabs.indexOf(selected) + 1 : 0}
          items={[
            <Link href={selected === title ? title : "./"} key="doc">
              Documentation
            </Link>,
            ...tabs.map((tab) => (
              <Link
                href={`${selected === title ? title : "."}/${tab}`}
                key={tab}
              >
                {startCase(tab, " ")}
              </Link>
            )),
          ]}
        >
          {null}
        </Tabs>
      </div>
    </>
  );
}
