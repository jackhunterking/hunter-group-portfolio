// Loads Leaflet from CDN once (no npm dependency, no bundle weight) and resolves
// the global `L`. Lightweight 2D replacement for the removed ArcGIS 3D map.

const LEAFLET_VERSION = "1.9.4";
const CSS_URL = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.css`;
const JS_URL = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.js`;
const CSS_ID = "leaflet-css";
const JS_ID = "leaflet-js";

let loader: Promise<Record<string, any>> | null = null;

export function loadLeaflet(): Promise<Record<string, any>> {
  if (loader) return loader;

  loader = new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Leaflet can only load in the browser."));
      return;
    }
    const w = window as Window & { L?: Record<string, any> };
    if (w.L) {
      resolve(w.L);
      return;
    }

    if (!document.getElementById(CSS_ID)) {
      const link = document.createElement("link");
      link.id = CSS_ID;
      link.rel = "stylesheet";
      link.href = CSS_URL;
      document.head.appendChild(link);
    }

    const done = () => (w.L ? resolve(w.L) : reject(new Error("Leaflet failed to initialise.")));
    const existing = document.getElementById(JS_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", done, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = JS_ID;
    script.src = JS_URL;
    script.async = true;
    script.addEventListener("load", done, { once: true });
    script.addEventListener("error", reject, { once: true });
    document.body.appendChild(script);
  });

  return loader;
}
