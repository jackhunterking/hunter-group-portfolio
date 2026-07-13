"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import type { MapProperty } from "@/lib/capital/present";
import { loadLeaflet } from "./leaflet-loader";
import styles from "./fund-map.module.css";

type Status = "loading" | "ready" | "error";

const TILE_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
const TILE_ATTR = "© OpenStreetMap contributors © CARTO";

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

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Record<string, any> | null>(null);
  const leafletRef = useRef<Record<string, any> | null>(null);
  const markersRef = useRef<Map<string, Record<string, any>>>(new Map());
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const [status, setStatus] = useState<Status>("loading");

  // Init map once
  useEffect(() => {
    let cancelled = false;
    loadLeaflet()
      .then((L) => {
        if (cancelled || !containerRef.current) return;
        leafletRef.current = L;
        const map = L.map(containerRef.current, { scrollWheelZoom: false, zoomControl: false });
        mapRef.current = map;
        L.control.zoom({ position: "topright" }).addTo(map);
        L.tileLayer(TILE_URL, { attribution: TILE_ATTR, subdomains: "abcd", maxZoom: 19 }).addTo(map);
        map.setView([56, -96], 3);
        setStatus("ready");
        setTimeout(() => map.invalidateSize(), 0);
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
      try {
        mapRef.current?.remove();
      } catch {
        /* ignore */
      }
      mapRef.current = null;
      markersRef.current = new Map();
    };
  }, []);

  // (Re)build markers when the fund changes
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (status !== "ready" || !L || !map) return;

    markersRef.current.forEach((mk) => map.removeLayer(mk));
    const markers = new Map<string, Record<string, any>>();
    const latlngs: [number, number][] = [];

    properties.forEach((p) => {
      const marker = L.circleMarker([p.latitude, p.longitude], {
        radius: 9,
        color: "#ffffff",
        weight: 2,
        fillColor: p.accent,
        fillOpacity: 0.95,
      });
      marker.on("click", () => onSelectRef.current(p.id));
      marker.bindTooltip(p.name, { direction: "top", offset: [0, -6] });
      marker.addTo(map);
      markers.set(p.id, marker);
      latlngs.push([p.latitude, p.longitude]);
    });

    markersRef.current = markers;
    if (latlngs.length === 1) map.setView(latlngs[0], 12);
    else if (latlngs.length > 1) map.fitBounds(latlngs, { padding: [44, 44], maxZoom: 12 });
    setTimeout(() => map.invalidateSize(), 0);
  }, [status, properties]);

  // Emphasise + pan to selection
  useEffect(() => {
    const map = mapRef.current;
    if (status !== "ready") return;
    properties.forEach((p) => {
      const mk = markersRef.current.get(p.id);
      if (!mk) return;
      const sel = p.id === selectedId;
      mk.setStyle({ radius: sel ? 13 : 9, weight: sel ? 3 : 2, color: sel ? "#2f6f4f" : "#ffffff", fillColor: p.accent });
      if (sel) mk.bringToFront();
    });
    if (selectedId && map) {
      const p = properties.find((x) => x.id === selectedId);
      if (p) map.setView([p.latitude, p.longitude], 14, { animate: true });
    }
  }, [status, selectedId, properties]);

  function reset() {
    const map = mapRef.current;
    if (!map || !properties.length) return;
    const latlngs = properties.map((p) => [p.latitude, p.longitude] as [number, number]);
    if (latlngs.length === 1) map.setView(latlngs[0], 12);
    else map.fitBounds(latlngs, { padding: [44, 44], maxZoom: 12 });
  }

  const selected = properties.find((p) => p.id === selectedId) ?? null;

  return (
    <div className={`${styles.mapShell} ${variant === "full" ? styles.mapShellFull : ""}`}>
      <div className={styles.stage}>
        <div ref={containerRef} className={styles.canvas} />
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
