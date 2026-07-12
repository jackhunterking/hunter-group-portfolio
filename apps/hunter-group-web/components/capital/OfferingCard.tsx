"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { assetClasses, strategies, taxonomyLabel } from "@/lib/capital/taxonomies";
import {
  formatCurrencyCad,
  formatReturnPhrase,
  primaryShareClass,
  resolveImage,
} from "@/lib/capital/present";
import type { OfferingBundle } from "@/lib/capital/types";
import styles from "./offerings.module.css";

export function OfferingCard({ offering }: { offering: OfferingBundle }) {
  const { lang, t } = useLang();
  const c = t.capitalApp.card;
  const share = primaryShareClass(offering);
  const image = resolveImage(offering.media?.card, offering.slug, offering.shortName[lang], lang);
  const strategyLabel = taxonomyLabel(strategies, offering.strategyIds[0], lang);
  const targetReturn = share?.targetReturn ? formatReturnPhrase(share.targetReturn.value, lang) : "—";
  const minimum = share?.minimumInvestment
    ? formatCurrencyCad(share.minimumInvestment.value, lang)
    : t.capitalApp.common.reviewRequired;

  return (
    <article className={styles.card}>
      <div
        className={styles.cardMedia}
        style={image.src ? undefined : { backgroundImage: image.gradient }}
      >
        {image.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image.src} alt={image.alt} />
        ) : (
          <span className={styles.cardInitials} aria-hidden>
            {image.initials}
          </span>
        )}
        <span className={styles.strategyChip}>{strategyLabel}</span>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.cardManager}>{offering.manager.name[lang]}</p>
        <h3 className={styles.cardName}>
          <Link href={`/hunter-group-capital/offerings/${offering.slug}`} className={styles.stretched}>
            {offering.shortName[lang]}
          </Link>
        </h3>
        <p className={styles.cardSummary}>{offering.summary[lang]}</p>

        <div className={styles.chips}>
          {offering.assetClassIds.map((id) => (
            <span key={id} className={styles.chip}>
              {taxonomyLabel(assetClasses, id, lang)}
            </span>
          ))}
        </div>

        <div className={styles.metricRow}>
          <div>
            <span className={styles.metricLabel}>{c.targetLabel}</span>
            <strong className={styles.metricValue}>{targetReturn}</strong>
          </div>
          <div>
            <span className={styles.metricLabel}>{c.minLabel}</span>
            <strong className={styles.metricValue}>{minimum}</strong>
          </div>
        </div>

        <div className={styles.cardFooter}>
          <span className={styles.propCount}>
            {offering.properties.length} {t.capitalApp.common.buildings}
          </span>
          <Link
            href={`/hunter-group-capital/map?offering=${offering.slug}`}
            className={styles.cardMapLink}
          >
            {c.mapCta}
          </Link>
        </div>
      </div>
    </article>
  );
}
