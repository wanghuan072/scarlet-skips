"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/common/Icon";
import type { SearchSuggestion } from "@/lib/data/search-index";
import styles from "@/style/layout/site-shell.module.css";

export function SearchBox({ index, inputId = "site-search" }: { index: SearchSuggestion[]; inputId?: string }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return index.slice(0, 5);
    const words = normalized.split(/\s+/);
    return index.filter((item) => words.every((word) => item.text.toLowerCase().includes(word))).slice(0, 6);
  }, [index, query]);

  return (
    <form
      className={styles.searchForm}
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        router.push(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search");
        setFocused(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <label className="sr-only" htmlFor={inputId}>Search Scarlet Skips upgrades, builds and guides</label>
      <Icon name="search" size={18}/>
      <input
        id={inputId}
        type="search"
        value={query}
        placeholder="Search cards, routes, patches…"
        autoComplete="off"
        onFocus={() => setFocused(true)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setFocused(false);
        }}
        onChange={(event) => setQuery(event.target.value)}
      />
      {focused && (
        <div className={styles.searchResults}>
          <p>{query ? `${results.length} matches` : "Popular pages"}</p>
          {results.length ? results.map((result) => (
            <Link key={`${result.href}-${result.title}`} href={result.href} onClick={() => setFocused(false)}>
              <span>{result.title}</span><small>{result.subtitle}</small>
            </Link>
          )) : <span className={styles.noResults}>No exact match. Press Enter for search help.</span>}
        </div>
      )}
    </form>
  );
}
