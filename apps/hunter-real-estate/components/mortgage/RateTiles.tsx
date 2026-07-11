import styles from "./RateTiles.module.css";

export interface RateTileData {
  /** Term label, e.g. "3 YIL" / "3 YR" */
  term: string;
  /** Kind label, e.g. "Sabit" / "Variable" */
  kind: string;
  /** Rate string like "3.99%", or null → renders the updating fallback */
  rate: string | null;
  /** Optional detail line, e.g. "PRIME - 0.95%" */
  detail?: string;
}

interface Props {
  tiles: RateTileData[];
  /** Shown when a tile's rate is null (e.g. "Güncelleniyor" / "Updating") */
  updatingLabel: string;
  /** Optional extra class on the outer grid (for width/margins per context) */
  className?: string;
}

/**
 * Shared rate-tile group used everywhere rates are shown (homepage teaser,
 * Mortgage hero card, intent pages). One source of truth for the layout:
 * term + kind sit side by side, with the rate on the line below.
 */
export default function RateTiles({ tiles, updatingLabel, className }: Props) {
  return (
    <div className={className ? `${styles.grid} ${className}` : styles.grid}>
      {tiles.map((t) => (
        <div key={`${t.term}-${t.kind}`} className={styles.tile}>
          <div className={styles.head}>
            <span className={styles.term}>{t.term}</span>
            <span className={styles.kind}>{t.kind}</span>
          </div>
          <span className={styles.rate}>{t.rate ?? updatingLabel}</span>
          {t.detail ? <span className={styles.detail}>{t.detail}</span> : null}
        </div>
      ))}
    </div>
  );
}
