"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { strategies, taxonomyLabel } from "@/lib/capital/taxonomies";
import { fundHeadline, resolveImage } from "@/lib/capital/present";
import type { OfferingBundle } from "@/lib/capital/types";
import styles from "./offerings.module.css";

export function OfferingCard({ offering }: { offering: OfferingBundle }) {
  const { lang, t } = useLang();
  const c = t.capitalApp.card;
  const media = resolveImage(offering.media?.card, offering.slug, offering.shortName[lang], lang);
  const logo = resolveImage(offering.media?.logo, `${offering.slug}-logo`, offering.shortName[lang], lang);
  const strategyLabel = taxonomyLabel(strategies, offering.strategyIds[0], lang);
  const headline = fundHeadline(offering, lang);
  const headlineCaption = offering.offeringSize ? c.offeringSize : c.aumLabel;

  return (
    <Link href={`/hunter-group-capital/offerings/${offering.slug}`} className={styles.card}>
      <div className={styles.cardMedia} style={media.src ? undefined : { backgroundImage: media.gradient }}>
        {media.src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={media.src} alt={media.alt} />
        )}
        <span className={styles.strategyChip}>{strategyLabel}</span>
        <span className={styles.cardLogo} style={logo.src ? undefined : { backgroundImage: logo.gradient }}>
          {logo.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo.src} alt={logo.alt} />
          ) : (
            <span aria-hidden>{logo.initials}</span>
          )}
        </span>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{offering.shortName[lang]}</h3>
        <p className={styles.cardManager}>{offering.manager.name[lang]}</p>
        <p className={styles.cardSummary}>{offering.summary[lang]}</p>

        {headline && (
          <p className={styles.cardHeadline}>
            <strong>{headline}</strong>
            <span>{headlineCaption}</span>
          </p>
        )}

        <span className={styles.learnMore}>{c.learnMore}</span>
      </div>
    </Link>
  );
}
