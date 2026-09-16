import Link from "next/link";
import type { ReactNode } from "react";

const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;

export function richNodes(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  const matches = text.matchAll(pattern);

  for (const match of matches) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    const label = match[1];
    const href = match[2];
    const key = `${href}-${index}`;
    nodes.push(
      href.startsWith("http") ? (
        <a key={key} href={href} target="_blank" rel="noreferrer">{label}</a>
      ) : (
        <Link key={key} href={href}>{label}</Link>
      ),
    );
    last = index + match[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function RichText({ text }: { text: string }) {
  return <>{richNodes(text)}</>;
}
