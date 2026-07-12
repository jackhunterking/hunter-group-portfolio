"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { buildMapProperties } from "@/lib/capital/present";
import { taxonomyLabel, strategies } from "@/lib/capital/taxonomies";
import type { OfferingBundle } from "@/lib/capital/types";
import styles from "./map.module.css";

const FundMap = dynamic(() => import("@/components/capital/map/FundMap").then((m) => m.FundMap), {
  ssr: false,
  loading: () => null,
});

export function CapitalMap({ offerings }: { offerings: OfferingBundle[] }) {
  const { lang, t } = useLang();
  const m = t.capitalApp.map;
  const router = useRouter();
  const params = useSearchParams();

  const offeringSlug = params.get("offering") ?? offerings[0]?.slug ?? "";
  const offering = offerings.find((o) => o.slug === offeringSlug) ?? offerings[0];
  const propertyId = params.get("property");

  const buildings = useMemo(
    () => (offering ? buildMapProperties(offering, lang) : []),
    [offering, lang],
  );

  function selectOffering(slug: string) {
    const next = new URLSearchParams(params.toString());
    next.set("offering", slug);
    next.delete("property");
    router.replace(`?${next.toString()}`, { scroll: false });
  }

  function selectProperty(id: string | null) {
    const next = new URLSearchParams(params.toString());
    if (offering) next.set("offering", offering.slug);
    if (id) next.set("property", id);
    else next.delete("property");
    router.replace(`?${next.toString()}`, { scroll: false });
  }

  if (!offering) return null;

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>{m.title}</p>
        <h1 className={styles.title}>{offering.shortName[lang]}</h1>
        <p className={styles.intro}>{m.intro}</p>
      </header>

      <div className={styles.fundSwitch} role="tablist" aria-label={m.selectFund}>
        {offerings.map((o) => (
          <button
            key={o.id}
            type="button"
            role="tab"
            aria-selected={o.slug === offering.slug}
            className={`${styles.fundBtn} ${o.slug === offering.slug ? styles.fundBtnActive : ""}`}
            onClick={() => selectOffering(o.slug)}
          >
            <span className={styles.fundName}>{o.shortName[lang]}</span>
            <span className={styles.fundTag}>{taxonomyLabel(strategies, o.strategyIds[0], lang)}</span>
          </button>
        ))}
      </div>

      <FundMap properties={buildings} selectedId={propertyId} onSelect={selectProperty} variant="full" />
    </div>
  );
}
