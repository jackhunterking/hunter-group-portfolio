"use client";

import { useDeferredValue, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLang } from "@/lib/i18n/LanguageProvider";
import type { OfferingBundle } from "@/lib/capital/types";
import { OfferingCard } from "./OfferingCard";
import styles from "./offerings.module.css";

export function OfferingsCatalogue({ offerings }: { offerings: OfferingBundle[] }) {
  const { lang, t } = useLang();
  const router = useRouter();
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get("q") ?? "");
  const deferredSearch = useDeferredValue(search.toLowerCase());
  const strategy = params.get("strategy") ?? "all";

  const filtered = offerings.filter((item) => {
    const haystack = `${item.name[lang]} ${item.manager.name[lang]} ${item.summary[lang]} ${item.properties
      .map((p) => p.city)
      .join(" ")}`.toLowerCase();
    return haystack.includes(deferredSearch) && (strategy === "all" || item.strategyIds.includes(strategy));
  });

  function setStrategy(value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === "all") next.delete("strategy");
    else next.set("strategy", value);
    router.replace(`?${next.toString()}`, { scroll: false });
  }

  return (
    <>
      <header className={styles.listHead}>
        <p className={styles.eyebrow}>{t.capitalApp.dashboard.eyebrow}</p>
        <h1 className={styles.listTitle}>{t.capitalApp.nav.offerings}</h1>
        <p className={styles.dashIntro}>{t.capitalApp.dashboard.intro}</p>
      </header>
      <div className={styles.filters}>
        <label className={styles.filterField}>
          <span>{lang === "tr" ? "Ara" : "Search"}</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={lang === "tr" ? "Fon, yönetici veya şehir" : "Fund, manager or city"}
          />
        </label>
        <label className={styles.filterField}>
          <span>{lang === "tr" ? "Strateji" : "Strategy"}</span>
          <select value={strategy} onChange={(event) => setStrategy(event.target.value)}>
            <option value="all">{lang === "tr" ? "Tümü" : "All strategies"}</option>
            <option value="core-plus">Core Plus</option>
            <option value="value-add">Value Add</option>
          </select>
        </label>
        <div className={styles.resultCount}>
          <strong>{filtered.length}</strong>
          <span>{lang === "tr" ? "fon" : "funds"}</span>
        </div>
      </div>

      {filtered.length ? (
        <div className={styles.grid}>
          {filtered.map((item) => (
            <OfferingCard key={item.id} offering={item} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>
          {lang === "tr" ? "Bu filtrelerle eşleşen fon bulunamadı." : "No funds match these filters."}
        </p>
      )}
    </>
  );
}
