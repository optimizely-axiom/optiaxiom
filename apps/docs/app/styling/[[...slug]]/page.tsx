import fg from "fast-glob";
import { redirect } from "next/navigation";

/**
 * `/styling/*` moved: the conceptual pages joined the guides, and the per-prop
 * pages became `/props/*`. Static export can't use `next.config` redirects, so
 * every old route is emitted as a page that redirects to its new home.
 */
const MOVED_TO_GUIDES = [
  "colors",
  "design-tokens",
  "responsive-styles",
  "typography",
];

const destination = (slug: string[]) =>
  slug.length && MOVED_TO_GUIDES.includes(slug[0])
    ? `/guides/${slug[0]}/`
    : `/${["props", ...slug].join("/")}/`;

export function generateStaticParams() {
  return [
    { slug: [] },
    ...MOVED_TO_GUIDES.map((name) => ({ slug: [name] })),
    ...fg
      .sync("./app/(docs)/props/*/page.mdx")
      .map((path) => ({ slug: [path.split("/").at(-2) as string] })),
  ];
}

export default async function StylingRedirect({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  redirect(destination(slug ?? []));
}
