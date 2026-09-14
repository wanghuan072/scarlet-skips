"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { builds, guides, updates, upgrades } from "@/lib/data/content";
import { Icon } from "@/components/common/Icon";
import styles from "@/style/layout/site-shell.module.css";

const index = [
  ...upgrades.map((item) => ({ title: item.name, subtitle: "Upgrade", href: `/upgrades/${item.slug}`, text: `${item.name} ${item.effect} ${item.category}` })),
  ...builds.map((item) => ({ title: item.shortName, subtitle: "Build", href: `/builds/${item.slug}`, text: `${item.name} ${item.goal} ${item.description}` })),
  ...guides.map((item) => ({ title: item.shortName, subtitle: "Guide", href: `/guides/${item.slug}`, text: `${item.name} ${item.description}` })),
  ...updates.map((item) => ({ title: item.title, subtitle: "Update", href: `/updates/${item.slug}`, text: `${item.title} ${item.summary}` })),
];

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return index.slice(0, 5);
    const words = normalized.split(/\s+/);
    return index.filter((item) => words.every((word) => item.text.toLowerCase().includes(word))).slice(0, 6);
  }, [query]);

  return (
    <form
      className={styles.searchForm}
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        if (results[0]) router.push(results[0].href);
        else if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        setFocused(false);
      }}
    >
      <label className="sr-only" htmlFor="site-search">Search upgrades, builds and guides</label>
      <Icon name="search" size={18}/>
      <input
        id="site-search"
        type="search"
        value={query}
        placeholder="Search upgrades, builds, guides…"
        autoComplete="off"
        onFocus={() => setFocused(true)}
        onBlur={() => window.setTimeout(() => setFocused(false), 120)}
        onChange={(event) => setQuery(event.target.value)}
      />
      {focused && (
        <div className={styles.searchResults}>
          <p>{query ? `${results.length} matches` : "Popular pages"}</p>
          {results.length ? results.map((result) => (
            <button key={result.href} type="button" onMouseDown={() => router.push(result.href)}>
              <span>{result.title}</span><small>{result.subtitle}</small>
            </button>
          )) : <span className={styles.noResults}>No exact match. Press Enter for search help.</span>}
        </div>
      )}
    </form>
  );
}
