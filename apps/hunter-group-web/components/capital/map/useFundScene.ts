"use client";

import { useEffect, useRef, useState } from "react";
import { ARC_GIS_BUILDINGS_URL, loadArcGisModules } from "./arcgis/loader";
import type { ArcGisModules } from "./arcgis/types";
import type { MapProperty } from "@/lib/capital/present";

type Status = "loading" | "ready" | "error";
type Rgba = [number, number, number, number];

function hexToRgba(hex: string, alpha: number): Rgba {
  const v = hex.replace("#", "");
  const full = v.length === 3 ? v.split("").map((c) => c + c).join("") : v;
  const int = parseInt(full, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255, alpha];
}

/**
 * A deliberately lightweight ArcGIS scene: a muted basemap, the global Open3D
 * buildings layer kept recessive (low opacity, non-interactive), and the fund's
 * real portfolio buildings as the only emphasized, clickable graphics.
 */
export function useFundScene(
  properties: MapProperty[],
  selectedId: string | null,
  onSelect: (id: string) => void,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  const modulesRef = useRef<ArcGisModules | null>(null);
  const viewRef = useRef<Record<string, any> | null>(null);
  const layerRef = useRef<Record<string, any> | null>(null);
  const markersRef = useRef<Map<string, Record<string, any>>>(new Map());
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  // ---- Initialise the scene once ----
  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    loadArcGisModules()
      .then((modules) => {
        if (cancelled || !containerRef.current) return;
        modulesRef.current = modules;
        const { Map, SceneView, SceneLayer, GraphicsLayer } = modules;

        const buildings = new SceneLayer({
          url: ARC_GIS_BUILDINGS_URL,
          opacity: 0.3, // recessive — context only, never competes with portfolio
          legendEnabled: false,
          popupEnabled: false,
        });
        const graphics = new GraphicsLayer({ elevationInfo: { mode: "relative-to-scene" } });
        layerRef.current = graphics;

        const map = new Map({ basemap: "gray-vector", ground: "world-elevation", layers: [buildings, graphics] });
        const view = new SceneView({
          container: containerRef.current,
          map,
          qualityProfile: "low",
          ui: { components: [] },
          popup: { autoOpenEnabled: false },
          environment: {
            atmosphere: { quality: "low" },
            lighting: { directShadowsEnabled: false },
            starsEnabled: false,
          },
        });
        viewRef.current = view;

        view.when(
          () => {
            if (cancelled) return;
            view.on("click", (event: Record<string, any>) => {
              view.hitTest(event).then((res: Record<string, any>) => {
                const hit = res.results.find(
                  (r: Record<string, any>) => r.graphic?.attributes?.propertyId,
                );
                if (hit) onSelectRef.current(hit.graphic.attributes.propertyId);
              });
            });
            setStatus("ready");
          },
          () => {
            if (!cancelled) setStatus("error");
          },
        );
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      try {
        viewRef.current?.destroy?.();
      } catch {
        /* ignore */
      }
      viewRef.current = null;
      layerRef.current = null;
      markersRef.current = new Map();
    };
  }, []);

  // ---- (Re)build the portfolio markers when the fund changes ----
  useEffect(() => {
    const modules = modulesRef.current;
    const layer = layerRef.current;
    const view = viewRef.current;
    if (status !== "ready" || !modules || !layer || !view) return;

    const { Graphic, Point, SimpleMarkerSymbol, TextSymbol } = modules;
    layer.removeAll();
    const markers = new Map<string, Record<string, any>>();

    properties.forEach((p) => {
      const point = new Point({ latitude: p.latitude, longitude: p.longitude, spatialReference: { wkid: 4326 } });
      const attributes = { propertyId: p.id };
      const marker = new Graphic({
        geometry: point,
        attributes,
        elevationInfo: { mode: "relative-to-scene", offset: 2 },
        symbol: new SimpleMarkerSymbol({
          style: "circle",
          color: hexToRgba(p.accent, 0.92),
          size: 13,
          outline: { color: [255, 255, 255, 0.95], width: 1.6 },
        }),
      });
      const label = new Graphic({
        geometry: point,
        attributes,
        elevationInfo: { mode: "relative-to-scene", offset: 6 },
        symbol: new TextSymbol({
          text: p.name,
          color: [18, 24, 28, 1],
          haloColor: [255, 255, 255, 0.95],
          haloSize: 1.4,
          yoffset: 12,
          horizontalAlignment: "center",
          verticalAlignment: "bottom",
          font: { family: "Manrope, Arial, sans-serif", size: 11, weight: "bold" },
        }),
      });
      layer.addMany([marker, label]);
      markers.set(p.id, marker);
    });

    markersRef.current = markers;

    const graphics = layer.graphics?.toArray?.() ?? [];
    if (graphics.length) {
      view.goTo({ target: graphics, tilt: 55 }, { duration: 900 }).catch(() => undefined);
    }
  }, [status, properties]);

  // ---- Emphasise + fly to the selected building ----
  useEffect(() => {
    const modules = modulesRef.current;
    const view = viewRef.current;
    if (status !== "ready" || !modules) return;
    const { SimpleMarkerSymbol } = modules;

    properties.forEach((p) => {
      const marker = markersRef.current.get(p.id);
      if (!marker) return;
      const selected = p.id === selectedId;
      marker.elevationInfo = { mode: "relative-to-scene", offset: selected ? 3 : 2 };
      marker.symbol = new SimpleMarkerSymbol({
        style: "circle",
        color: hexToRgba(p.accent, selected ? 1 : 0.85),
        size: selected ? 19 : 13,
        outline: { color: selected ? [47, 111, 79, 1] : [255, 255, 255, 0.95], width: selected ? 3 : 1.6 },
      });
    });

    if (selectedId && view) {
      const p = properties.find((x) => x.id === selectedId);
      if (p) {
        // center as [lng, lat] + zoom navigates reliably to a single point on a
        // SceneView (a geometry target would fit-extent and ignore zoom).
        view
          .goTo(
            { center: [p.longitude, p.latitude], zoom: 16, tilt: 62 },
            { duration: 1000, easing: "ease-in-out" },
          )
          .catch(() => undefined);
      }
    }
  }, [status, selectedId, properties]);

  const reset = () => {
    const view = viewRef.current;
    const layer = layerRef.current;
    if (!view || !layer) return;
    const graphics = layer.graphics?.toArray?.() ?? [];
    if (graphics.length) view.goTo({ target: graphics, tilt: 55 }, { duration: 900 }).catch(() => undefined);
  };

  return { containerRef, status, reset };
}
