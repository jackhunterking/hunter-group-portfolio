"use client";

import { useLang } from "@/lib/i18n/LanguageProvider";
import type { MapProperty } from "@/lib/capital/present";
import { useFundScene } from "./useFundScene";
import styles from "./fund-map.module.css";

export function FundMap({
  properties,
  selectedId,
  onSelect,
  variant = "embed",
}: {
  properties: MapProperty[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  variant?: "embed" | "full";
}) {
  const { t } = useLang();
  const m = t.capitalApp.map;
  const { containerRef, status, reset } = useFundScene(properties, selectedId, (id) => onSelect(id));
  const selected = properties.find((p) => p.id === selectedId) ?? null;

  return (
    <div className={`${styles.mapShell} ${variant === "full" ? styles.mapShellFull : ""}`}>
      <div className={styles.stage}>
        <div ref={containerRef} className={styles.canvas} aria-hidden={status !== "ready"} />

        {status === "loading" && <div className={styles.stageNote}>{m.loading}</div>}

        {status === "error" && (
          <div className={styles.stageNote}>
            <strong>{m.error}</strong>
            <span>{m.errorHint}</span>
          </div>
        )}

        {status === "ready" && (
          <div className={styles.stageControls}>
            <span className={styles.stageBadge}>
              {properties.length} {t.capitalApp.common.buildings}
            </span>
            <button type="button" onClick={reset} className={styles.stageBtn}>
              {m.reset}
            </button>
          </div>
        )}
      </div>

      <aside className={styles.drawer}>
        <p className={styles.drawerHead}>{m.portfolioBuildings}</p>
        <ul className={styles.drawerList}>
          {properties.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className={`${styles.drawerItem} ${p.id === selectedId ? styles.drawerItemActive : ""}`}
                onClick={() => onSelect(p.id === selectedId ? null : p.id)}
                aria-pressed={p.id === selectedId}
              >
                <span className={styles.dot} style={{ background: p.accent }} aria-hidden />
                <span className={styles.drawerName}>{p.name}</span>
                <span className={styles.drawerMeta}>
                  {p.city}, {p.province}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {selected && (
          <div className={styles.detail}>
            <h3>{selected.name}</h3>
            <p className={styles.detailLoc}>
              {selected.city}, {selected.province}
            </p>
            <dl className={styles.detailMeta}>
              <div>
                <dt>{t.capitalApp.detail.assetClass}</dt>
                <dd>{selected.assetClass}</dd>
              </div>
              {selected.detail && (
                <div>
                  <dt>{t.capitalApp.portfolio.size}</dt>
                  <dd>{selected.detail}</dd>
                </div>
              )}
              <div>
                <dt>{t.capitalApp.portfolio.status}</dt>
                <dd>{selected.status}</dd>
              </div>
              <div>
                <dt>{t.capitalApp.portfolio.verification}</dt>
                <dd>{selected.verification}</dd>
              </div>
            </dl>
          </div>
        )}
      </aside>
    </div>
  );
}
