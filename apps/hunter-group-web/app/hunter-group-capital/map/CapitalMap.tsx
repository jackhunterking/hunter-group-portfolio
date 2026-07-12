"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import type { OfferingBundle, Property } from "@/lib/capital/types";
import styles from "./map.module.css";

function point(property: Property) {
  const x = 8 + ((property.longitude + 125) / 50) * 84;
  const y = 12 + ((60 - property.latitude) / 20) * 70;
  return { x: Math.max(5, Math.min(95, x)), y: Math.max(8, Math.min(88, y)) };
}

export function CapitalMap({ offerings }: { offerings: OfferingBundle[] }) {
  const params = useSearchParams(); const router = useRouter(); const { lang } = useLang(); const tr = lang === "tr";
  const slug = params.get("offering") ?? offerings[0]?.slug;
  const offering = offerings.find((item) => item.slug === slug) ?? offerings[0];
  const requested = params.get("property");
  const [selectedId, setSelectedId] = useState(requested ?? offering.properties[0]?.id);
  const selected = offering.properties.find((item) => item.id === selectedId) ?? offering.properties[0];
  function selectOffering(next: string) { router.push(`/hunter-group-capital/map?offering=${next}`, { scroll: false }); setSelectedId(offerings.find((item) => item.slug === next)?.properties[0]?.id ?? ""); }
  return <main className={styles.page}>
    <header className={styles.intro}><div><p>{tr ? "Fon-öncelikli portföy haritası" : "Fund-first portfolio map"}</p><h1>{tr ? "Bir fon seçin. Yalnızca ilgili varlıkları görün." : "Choose a fund. See only the assets that matter."}</h1></div><p>{tr ? "İlgisiz binalar ve ağır 3D katmanlar kaldırıldı. Harita doğrulanmış portföy kayıtlarına odaklanır." : "Unrelated buildings and heavy 3D layers are removed. The map focuses on verified portfolio records."}</p></header>
    <div className={styles.workspace}>
      <aside className={styles.fundPanel}><span className={styles.label}>{tr ? "1 · Yatırımı seç" : "1 · Select offering"}</span>{offerings.map((item) => <button key={item.id} type="button" className={item.id === offering.id ? styles.fundActive : ""} onClick={() => selectOffering(item.slug)}><i /><span><strong>{item.shortName[lang]}</strong><small>{item.manager.name[lang]} · {item.properties.length} {tr ? "mülk" : "properties"}</small></span></button>)}<Link href={`/hunter-group-capital/offerings/${offering.slug}`}>{tr ? "Yatırım detaylarını aç" : "Open offering details"} →</Link></aside>
      <section className={styles.map} aria-label="Selected fund property map">
        <div className={styles.mapLabel}><strong>Canada</strong><span>{offering.shortName[lang]}</span></div>
        <svg viewBox="0 0 1000 560" role="img" aria-label="Simplified map of Canada"><path d="M55 219L119 147l80 4 47-78 72 41 54-55 93 48 51-29 61 49 79-3 38 52 77 13 83 92-22 76-85 33-110-3-70 55-120-9-74 42-102-48-86 14-77-73-71-28z" /><path d="M167 410h637" /></svg>
        {offering.properties.map((property, index) => { const p = point(property); const offset = index % 2 ? 4 : -2; return <button key={property.id} type="button" className={`${styles.marker} ${property.id === selected?.id ? styles.markerActive : ""}`} style={{ left: `${p.x + offset}%`, top: `${p.y + offset * .6}%` }} onClick={() => setSelectedId(property.id)} aria-label={`Select ${property.name[lang]}`}><span>{index + 1}</span><small>{property.city}</small></button>; })}
        <div className={styles.mapKey}><span><i />{tr ? "Seçili mülk" : "Selected property"}</span><span><i />{tr ? "Aynı fondaki mülk" : "Same-fund property"}</span></div>
      </section>
      {selected && <aside className={styles.propertyPanel}><div className={styles.propertyVisual}><span>{selected.assetClassId}</span><i /></div><div><span className={styles.label}>{tr ? "2 · Mülkü anla" : "2 · Understand the property"}</span><p>{selected.city}, {selected.province}</p><h2>{selected.name[lang]}</h2><dl><div><dt>{tr ? "Tür" : "Asset type"}</dt><dd>{selected.assetClassId}</dd></div><div><dt>{tr ? "Ölçek" : "Scale"}</dt><dd>{selected.units ? `${selected.units.value} units` : selected.squareFeet ? `${selected.squareFeet.value.toLocaleString()} sq. ft.` : "—"}</dd></div><div><dt>{tr ? "Durum" : "Status"}</dt><dd>{selected.status.replace("-", " ")}</dd></div><div><dt>{tr ? "Doğrulama" : "Verification"}</dt><dd>{selected.verificationStatus}</dd></div></dl><Link href={`/hunter-group-capital/investor-profile?offering=${offering.slug}`}>{tr ? "Bu fon için profilimi başlat" : "Start my profile for this fund"}</Link></div></aside>}
    </div>
    <p className={styles.disclaimer}>{tr ? "Konumlar sunulan kaynaklardan elde edilen portföy örneklerini gösterir. Kesin mülkiyet ve yatırım koşulları için resmi teklif belgeleri geçerlidir." : "Locations represent portfolio examples from supplied sources. Official offering documents control ownership and investment terms."}</p>
  </main>;
}
