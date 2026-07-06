"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  type EquitonProperty,
  type InvestmentMode,
  equitonApartmentFund,
  equitonProperties,
} from "./equitonMapData";
import styles from "./investor-map.module.css";

const ARC_GIS_CSS_URL = "https://js.arcgis.com/4.31/esri/themes/dark/main.css";
const ARC_GIS_SCRIPT_URL = "https://js.arcgis.com/4.31/";
const ARC_GIS_BUILDINGS_URL =
  "https://basemaps3d.arcgis.com/arcgis/rest/services/Open3D_Buildings_v1/SceneServer";
const ARC_GIS_CSS_ID = "arcgis-maps-sdk-css";
const ARC_GIS_SCRIPT_ID = "arcgis-maps-sdk-script";

type ZoomTier = "portfolio" | "city" | "building" | "detail";
type SceneStatus = "loading" | "ready" | "error";

type ArcGisModule = new (options?: Record<string, unknown>) => Record<string, any>;
type ArcGisRequire = (
  modules: string[],
  callback: (...loadedModules: ArcGisModule[]) => void,
  errback?: (error: unknown) => void,
) => void;

type ArcGisModules = {
  Map: ArcGisModule;
  SceneView: ArcGisModule;
  SceneLayer: ArcGisModule;
  GraphicsLayer: ArcGisModule;
  Graphic: ArcGisModule;
  Point: ArcGisModule;
  SimpleMarkerSymbol: ArcGisModule;
  TextSymbol: ArcGisModule;
};

type SceneHandle = {
  view: Record<string, any>;
  graphicsLayer: Record<string, any>;
  modules: ArcGisModules;
  clickHandle?: { remove: () => void };
  dragHandle?: { remove: () => void };
  pointerMoveHandle?: { remove: () => void };
  pointerLeaveCleanup?: () => void;
  buildingHighlightHandle?: { remove: () => void };
  animationCleanup?: () => void;
  markInteraction?: () => void;
};

type OrbitDragState = {
  x: number;
  y: number;
  heading: number;
  tilt: number;
  zoom: number;
};

type OrbitTarget = {
  latitude: number;
  longitude: number;
  heading: number;
  tilt: number;
  zoom: number;
};

type HoverCardState = {
  property: EquitonProperty;
  x: number;
  y: number;
};

declare global {
  interface Window {
    require?: ArcGisRequire;
  }
}

let arcGisLoader: Promise<ArcGisModules> | null = null;

const currencyFormatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

const moduleNames = [
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/SceneLayer",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
  "esri/geometry/Point",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/TextSymbol",
];

function formatCurrency(value: number) {
  return currencyFormatter.format(Math.round(value));
}

function formatCompactCurrency(value: number) {
  if (value >= 1000000) {
    const millions = value / 1000000;
    const formatted = Number.isInteger(millions) ? `${millions}` : millions.toFixed(1);
    return `$${formatted}M`;
  }

  if (value >= 1000) {
    return `$${Math.round(value / 1000)}K`;
  }

  return `$${Math.round(value)}`;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function finiteOr(value: unknown, fallback: number) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeHeading(heading: number) {
  return ((heading % 360) + 360) % 360;
}

function getZoomTier(zoom: number): ZoomTier {
  if (zoom < 1.45) return "portfolio";
  if (zoom < 2.35) return "city";
  if (zoom < 3.25) return "building";
  return "detail";
}

function getModeLabel(mode: InvestmentMode) {
  if (mode === "distribution") return "Income generation lens";
  if (mode === "appreciation") return "Appreciation lens";
  return "Total target return lens";
}

function loadArcGisCss() {
  if (document.getElementById(ARC_GIS_CSS_ID)) return;

  const link = document.createElement("link");
  link.id = ARC_GIS_CSS_ID;
  link.rel = "stylesheet";
  link.href = ARC_GIS_CSS_URL;
  document.head.appendChild(link);
}

function loadArcGisModules() {
  if (arcGisLoader) return arcGisLoader;

  arcGisLoader = new Promise<ArcGisModules>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("ArcGIS can only load in the browser."));
      return;
    }

    loadArcGisCss();

    const loadModules = () => {
      const arcGisRequire = (window as Window & { require?: ArcGisRequire }).require;

      if (typeof arcGisRequire !== "function") {
        reject(new Error("ArcGIS module loader is unavailable."));
        return;
      }

      arcGisRequire(
        moduleNames,
        (
          Map,
          SceneView,
          SceneLayer,
          GraphicsLayer,
          Graphic,
          Point,
          SimpleMarkerSymbol,
          TextSymbol,
        ) => {
          resolve({
            Map,
            SceneView,
            SceneLayer,
            GraphicsLayer,
            Graphic,
            Point,
            SimpleMarkerSymbol,
            TextSymbol,
          });
        },
        reject,
      );
    };

    const existingRequire = (window as Window & { require?: ArcGisRequire }).require;

    if (typeof existingRequire === "function") {
      loadModules();
      return;
    }

    const existingScript = document.getElementById(ARC_GIS_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", loadModules, { once: true });
      existingScript.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = ARC_GIS_SCRIPT_ID;
    script.src = ARC_GIS_SCRIPT_URL;
    script.async = true;
    script.addEventListener("load", loadModules, { once: true });
    script.addEventListener("error", reject, { once: true });
    document.body.appendChild(script);
  });

  return arcGisLoader;
}

function getPortfolioCenter() {
  const latitude =
    equitonProperties.reduce((total, property) => total + property.latitude, 0) /
    equitonProperties.length;
  const longitude =
    equitonProperties.reduce((total, property) => total + property.longitude, 0) /
    equitonProperties.length;

  return { latitude, longitude };
}

function getCameraTarget(property: EquitonProperty, zoomTier: ZoomTier, zoom: number) {
  if (zoomTier === "portfolio") {
    return {
      ...getPortfolioCenter(),
      zoom: 7,
      tilt: 48,
      heading: 328,
    };
  }

  if (zoomTier === "city") {
    return {
      latitude: property.latitude,
      longitude: property.longitude,
      zoom: 12,
      tilt: 54,
      heading: 328,
    };
  }

  if (zoomTier === "building") {
    return {
      latitude: property.latitude,
      longitude: property.longitude,
      zoom: 17,
      tilt: 64,
      heading: 328,
    };
  }

  return {
    latitude: property.latitude,
    longitude: property.longitude,
    zoom: zoom > 3.6 ? 18 : 17,
    tilt: 68,
    heading: 328,
  };
}

function flyToProperty(handle: SceneHandle, property: EquitonProperty, zoomTier: ZoomTier, zoom: number) {
  const target = getCameraTarget(property, zoomTier, zoom);
  const point = new handle.modules.Point({
    latitude: target.latitude,
    longitude: target.longitude,
    spatialReference: { wkid: 4326 },
  });

  handle.view.goTo(
    {
      target: point,
      zoom: target.zoom,
      tilt: target.tilt,
      heading: target.heading,
    },
    {
      duration: 900,
      easing: "ease-in-out",
    },
  );
}

function renderPropertyGraphics(
  handle: SceneHandle,
  selectedId: string,
  mode: InvestmentMode,
  hoveredId?: string | null,
) {
  const { Graphic, Point, SimpleMarkerSymbol, TextSymbol } = handle.modules;
  handle.graphicsLayer.removeAll();

  equitonProperties.forEach((property) => {
    const selected = property.id === selectedId;
    const hovered = property.id === hoveredId;
    const emphasized = selected || hovered;
    const markerOffset = emphasized ? 1.8 : 1;
    const labelOffset = emphasized ? 5 : 3.5;
    const accent =
      hovered
        ? [31, 239, 161, 0.98]
        : selected && mode === "distribution"
        ? [159, 232, 178, 0.95]
        : selected && mode === "appreciation"
          ? [159, 177, 199, 0.95]
          : [235, 199, 107, selected ? 0.98 : 0.72];
    const point = new Point({
      latitude: property.latitude,
      longitude: property.longitude,
      spatialReference: { wkid: 4326 },
    });

    handle.graphicsLayer.addMany([
      new Graphic({
        geometry: point,
        elevationInfo: {
          mode: "relative-to-scene",
          offset: markerOffset,
        },
        attributes: {
          propertyId: property.id,
          name: property.name,
          address: property.address,
        },
        symbol: new SimpleMarkerSymbol({
          style: "circle",
          color: accent,
          size: hovered ? 18 : selected ? 15 : 10,
          outline: {
            color: hovered ? [31, 239, 161, 1] : [5, 8, 14, 0.95],
            width: hovered ? 3.5 : selected ? 2.5 : 1.5,
          },
        }),
      }),
      new Graphic({
        geometry: point,
        elevationInfo: {
          mode: "relative-to-scene",
          offset: labelOffset,
        },
        attributes: {
          propertyId: property.id,
          name: property.name,
          address: property.address,
        },
        symbol: new TextSymbol({
          text: property.name,
          color: hovered ? [230, 255, 245, 1] : [255, 255, 255, selected ? 1 : 0.82],
          haloColor: [5, 8, 14, 0.92],
          haloSize: hovered ? 1.6 : 1,
          horizontalAlignment: "center",
          verticalAlignment: "bottom",
          yoffset: emphasized ? 9 : 6,
          font: {
            family: "Avenir Next, Arial, sans-serif",
            size: hovered ? 13 : selected ? 12 : 10,
            weight: "bold",
          },
        }),
      }),
    ]);
  });
}

function ArcGisInvestorScene({
  selectedProperty,
  selectedId,
  zoom,
  zoomTier,
  mode,
  amount,
  onSelectProperty,
}: {
  selectedProperty: EquitonProperty;
  selectedId: string;
  zoom: number;
  zoomTier: ZoomTier;
  mode: InvestmentMode;
  amount: number;
  onSelectProperty: (property: EquitonProperty) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<SceneHandle | null>(null);
  const onSelectRef = useRef(onSelectProperty);
  const selectedPropertyRef = useRef(selectedProperty);
  const selectedIdRef = useRef(selectedId);
  const modeRef = useRef(mode);
  const hoveredIdRef = useRef<string | null>(null);
  const [hoverCard, setHoverCard] = useState<HoverCardState | null>(null);
  const [status, setStatus] = useState<SceneStatus>("loading");

  useEffect(() => {
    onSelectRef.current = onSelectProperty;
  }, [onSelectProperty]);

  useEffect(() => {
    selectedPropertyRef.current = selectedProperty;
  }, [selectedProperty]);

  useEffect(() => {
    selectedIdRef.current = selectedId;
  }, [selectedId]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    let cancelled = false;

    async function createScene() {
      if (!containerRef.current) return;

      try {
        setStatus("loading");
        const modules = await loadArcGisModules();
        if (cancelled || !containerRef.current) return;

        const map = new modules.Map({
          basemap: "dark-gray-vector",
          ground: "world-elevation",
        });
        const buildingsLayer = new modules.SceneLayer({
          url: ARC_GIS_BUILDINGS_URL,
          title: "Open 3D Buildings",
          copyright: "Esri, Overture Maps, OpenStreetMap contributors",
        });
        const graphicsLayer = new modules.GraphicsLayer({
          title: "Verified Equiton properties",
          elevationInfo: { mode: "relative-to-scene" },
        });

        map.addMany([buildingsLayer, graphicsLayer]);

        const portfolioCenter = getPortfolioCenter();
        const view = new modules.SceneView({
          container: containerRef.current,
          map,
          qualityProfile: "medium",
          viewingMode: "global",
          popupEnabled: false,
          camera: {
            position: {
              latitude: portfolioCenter.latitude - 0.8,
              longitude: portfolioCenter.longitude - 0.85,
              z: 210000,
            },
            heading: 328,
            tilt: 50,
          },
          environment: {
            atmosphereEnabled: false,
            starsEnabled: false,
            background: {
              type: "color",
              color: [3, 5, 10, 1],
            },
            lighting: {
              directShadowsEnabled: true,
              ambientOcclusionEnabled: true,
            },
          },
          constraints: {
            altitude: {
              min: 120,
              max: 800000,
            },
            tilt: {
              max: 80,
            },
          },
          ui: {
            components: ["attribution"],
          },
        });

        const handle: SceneHandle = {
          view,
          graphicsLayer,
          modules,
        };

        let buildingsLayerView: Record<string, any> | null = null;
        let orbitDrag: OrbitDragState | null = null;
        let pendingOrbit: OrbitTarget | null = null;
        let orbitFrame: number | null = null;
        let autoTimer: number | null = null;
        let pointerFrame: number | null = null;
        let latestPointerEvent: Record<string, any> | null = null;
        let hoverSequence = 0;
        let lastInteractionAt = performance.now();
        let lastAutoAt = performance.now();

        const markInteraction = () => {
          lastInteractionAt = performance.now();
          pendingOrbit = null;
          if (orbitFrame !== null) {
            window.cancelAnimationFrame(orbitFrame);
            orbitFrame = null;
          }
          view.animation?.stop?.();
        };
        handle.markInteraction = markInteraction;

        const applyOrbitTarget = (target: OrbitTarget) => {
          pendingOrbit = target;
          if (orbitFrame !== null) return;

          orbitFrame = window.requestAnimationFrame(() => {
            orbitFrame = null;
            const nextTarget = pendingOrbit;
            pendingOrbit = null;
            if (!nextTarget || cancelled) return;

            const targetPoint = new modules.Point({
              latitude: nextTarget.latitude,
              longitude: nextTarget.longitude,
              spatialReference: { wkid: 4326 },
            });

            view
              .goTo(
                {
                  target: targetPoint,
                  zoom: nextTarget.zoom,
                  heading: normalizeHeading(nextTarget.heading),
                  tilt: nextTarget.tilt,
                },
                {
                  animate: false,
                },
              )
              .catch(() => undefined);
          });
        };

        const orbitAroundSelectedProperty = (heading: number, tilt: number, nextZoom: number) => {
          const orbitTarget = selectedPropertyRef.current;
          applyOrbitTarget({
            latitude: orbitTarget.latitude,
            longitude: orbitTarget.longitude,
            heading,
            tilt,
            zoom: nextZoom,
          });
        };

        const clearBuildingHighlight = () => {
          handle.buildingHighlightHandle?.remove();
          handle.buildingHighlightHandle = undefined;
        };

        const highlightBuilding = (buildingGraphic: Record<string, any> | null) => {
          clearBuildingHighlight();
          if (!buildingGraphic || typeof buildingsLayerView?.highlight !== "function") return;
          handle.buildingHighlightHandle = buildingsLayerView.highlight(buildingGraphic);
        };

        const updateHoveredProperty = (
          property: EquitonProperty | null,
          event?: Record<string, any>,
        ) => {
          const nextHoveredId = property?.id ?? null;
          const hoverChanged = hoveredIdRef.current !== nextHoveredId;
          hoveredIdRef.current = nextHoveredId;

          if (hoverChanged) {
            renderPropertyGraphics(
              handle,
              selectedIdRef.current,
              modeRef.current,
              hoveredIdRef.current,
            );
          }

          if (property && event) {
            setHoverCard({
              property,
              x: finiteOr(event.x, 0),
              y: finiteOr(event.y, 0),
            });
            return;
          }

          setHoverCard(null);
        };

        const clearHover = () => {
          hoverSequence += 1;
          updateHoveredProperty(null);
          clearBuildingHighlight();
        };

        view
          .whenLayerView(buildingsLayer)
          .then((layerView: Record<string, any>) => {
            if (!cancelled) {
              buildingsLayerView = layerView;
            }
          })
          .catch(() => undefined);

        handle.clickHandle = view.on("click", async (event: Record<string, unknown>) => {
          markInteraction();
          const hit = await view.hitTest(event);
          const propertyGraphic = hit.results?.find(
            (result: Record<string, any>) => result.graphic?.attributes?.propertyId,
          )?.graphic;
          const propertyId = propertyGraphic?.attributes?.propertyId;
          const property = equitonProperties.find((item) => item.id === propertyId);

          if (property) {
            onSelectRef.current(property);
          }
        });

        handle.dragHandle = view.on("drag", (event: Record<string, any>) => {
          markInteraction();
          const action = event.action;
          const rawButton =
            typeof event.button === "number" ? event.button : event.native?.button;
          const isPrimaryDrag = rawButton === undefined || rawButton === 0;

          if (action === "start") {
            if (!isPrimaryDrag) return;

            clearHover();
            orbitDrag = {
              x: finiteOr(event.x, 0),
              y: finiteOr(event.y, 0),
              heading: finiteOr(view.camera.heading, 0),
              tilt: finiteOr(view.camera.tilt, 68),
              zoom: finiteOr(view.zoom, 17),
            };
            event.stopPropagation?.();
            return;
          }

          if (!orbitDrag) return;

          if (action === "update") {
            const x = finiteOr(event.x, orbitDrag.x);
            const y = finiteOr(event.y, orbitDrag.y);
            const heading = orbitDrag.heading + (x - orbitDrag.x) * 0.18;
            const tilt = clamp(orbitDrag.tilt - (y - orbitDrag.y) * 0.04, 36, 64);
            const orbitZoom = Math.min(orbitDrag.zoom, 15.4);

            orbitAroundSelectedProperty(heading, tilt, orbitZoom);
            event.stopPropagation?.();
            return;
          }

          if (action === "end") {
            orbitDrag = null;
            event.stopPropagation?.();
          }
        });

        handle.pointerMoveHandle = view.on("pointer-move", (event: Record<string, any>) => {
          markInteraction();
          latestPointerEvent = event;

          if (pointerFrame !== null) return;

          pointerFrame = window.requestAnimationFrame(() => {
            pointerFrame = null;
            const pointerEvent = latestPointerEvent;
            if (!pointerEvent || cancelled) return;

            const sequence = hoverSequence + 1;
            hoverSequence = sequence;

            view
              .hitTest(pointerEvent)
              .then((hit: Record<string, any>) => {
                if (cancelled || sequence !== hoverSequence) return;

                const propertyGraphic = hit.results?.find(
                  (result: Record<string, any>) => result.graphic?.attributes?.propertyId,
                )?.graphic;
                const propertyId = propertyGraphic?.attributes?.propertyId;
                const buildingGraphic =
                  hit.results?.find(
                    (result: Record<string, any>) => result.graphic?.layer === buildingsLayer,
                  )?.graphic ?? null;
                const property =
                  equitonProperties.find((item) => item.id === propertyId) ??
                  (buildingGraphic && finiteOr(view.zoom, 0) >= 16
                    ? selectedPropertyRef.current
                    : null);

                updateHoveredProperty(property, pointerEvent);
                highlightBuilding(buildingGraphic);
              })
              .catch(() => undefined);
          });
        });

        const sceneContainer = containerRef.current;
        const handlePointerLeave = () => {
          markInteraction();
          clearHover();
        };
        sceneContainer.addEventListener("pointerleave", handlePointerLeave);
        handle.pointerLeaveCleanup = () => {
          sceneContainer.removeEventListener("pointerleave", handlePointerLeave);
        };

        const runAutoOrbit = () => {
          if (cancelled) return;

          const now = performance.now();
          const delta = Math.min(120, now - lastAutoAt);
          lastAutoAt = now;

          if (!orbitDrag && now - lastInteractionAt > 3400) {
            const heading = finiteOr(view.camera.heading, 328) + delta * 0.004;
            const tilt = clamp(finiteOr(view.camera.tilt, 60), 46, 64);
            const nextZoom = finiteOr(view.zoom, 17);
            orbitAroundSelectedProperty(heading, tilt, nextZoom);
          }
        };

        handle.animationCleanup = () => {
          if (orbitFrame !== null) window.cancelAnimationFrame(orbitFrame);
          if (autoTimer !== null) window.clearInterval(autoTimer);
          if (pointerFrame !== null) window.cancelAnimationFrame(pointerFrame);
        };

        sceneRef.current = handle;
        renderPropertyGraphics(handle, selectedId, mode, hoveredIdRef.current);
        await view.when();

        if (!cancelled) {
          setStatus("ready");
          flyToProperty(handle, selectedProperty, zoomTier, zoom);
          lastInteractionAt = performance.now();
          lastAutoAt = performance.now();
          autoTimer = window.setInterval(runAutoOrbit, 120);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("ArcGIS scene failed to load", error);
          setStatus("error");
        }
      }
    }

    createScene();

    return () => {
      cancelled = true;
      const scene = sceneRef.current;
      scene?.clickHandle?.remove();
      scene?.dragHandle?.remove();
      scene?.pointerMoveHandle?.remove();
      scene?.pointerLeaveCleanup?.();
      scene?.buildingHighlightHandle?.remove();
      scene?.animationCleanup?.();
      scene?.view?.destroy();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    renderPropertyGraphics(scene, selectedId, mode, hoveredIdRef.current);
  }, [selectedId, mode]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || status !== "ready") return;

    scene.markInteraction?.();
    flyToProperty(scene, selectedProperty, zoomTier, zoom);
  }, [selectedProperty, zoom, zoomTier, status]);

  return (
    <>
      <div ref={containerRef} className={styles.arcgisScene} />
      {status !== "ready" ? (
        <div className={styles.sceneStatus} role="status">
          <strong>{status === "error" ? "3D scene unavailable" : "Loading 3D buildings"}</strong>
          <span>
            {status === "error"
              ? "The investor data is still available in the property drawer."
              : "Esri Open 3D Buildings"}
          </span>
        </div>
      ) : null}
      {hoverCard && status === "ready" ? (
        <InvestmentHoverCard hoverCard={hoverCard} amount={amount} mode={mode} />
      ) : null}
    </>
  );
}

function InvestmentHoverCard({
  hoverCard,
  amount,
  mode,
}: {
  hoverCard: HoverCardState;
  amount: number;
  mode: InvestmentMode;
}) {
  const monthlyLow = (amount * equitonApartmentFund.targetAnnualNetReturn.low) / 12;
  const monthlyHigh = (amount * equitonApartmentFund.targetAnnualNetReturn.high) / 12;
  const x = Math.round(hoverCard.x + 18);
  const y = Math.round(hoverCard.y - 24);

  return (
    <aside
      className={styles.hoverCard}
      style={{
        left: `min(calc(100% - 250px), max(12px, ${x}px))`,
        top: `min(calc(100% - 206px), max(12px, ${y}px))`,
      }}
      aria-label={`${hoverCard.property.name} investment facts`}
    >
      <div className={styles.hoverCardHeader}>
        <span aria-hidden="true">{hoverCard.property.name.slice(0, 1)}</span>
        <div>
          <strong>{hoverCard.property.name}</strong>
          <small>
            {hoverCard.property.city}, {hoverCard.property.province}
          </small>
        </div>
      </div>
      <dl>
        <div>
          <dt>Capital</dt>
          <dd>{formatCurrency(amount)}</dd>
        </div>
        <div>
          <dt>Monthly range</dt>
          <dd>
            {formatCurrency(monthlyLow)}-{formatCurrency(monthlyHigh)}
          </dd>
        </div>
        <div>
          <dt>Target return</dt>
          <dd>8-12%</dd>
        </div>
        <div>
          <dt>Lens</dt>
          <dd>{mode === "total" ? "Total" : mode === "distribution" ? "Distribution" : "Appreciation"}</dd>
        </div>
      </dl>
      <p>{hoverCard.property.address}</p>
    </aside>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" />
      <path d="M9 3v15M15 6v15" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12a8 8 0 018-8 8.5 8.5 0 017.3 4.2" />
      <path d="M20 4v5h-5M20 12a8 8 0 01-8 8 8.5 8.5 0 01-7.3-4.2" />
      <path d="M4 20v-5h5" />
    </svg>
  );
}

function SourceIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 3h7v7" />
      <path d="M10 14L21 3" />
      <path d="M20 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h5" />
    </svg>
  );
}

function ScenarioBar({
  mode,
  amount,
}: {
  mode: InvestmentMode;
  amount: number;
}) {
  const low = amount * equitonApartmentFund.targetAnnualNetReturn.low;
  const high = amount * equitonApartmentFund.targetAnnualNetReturn.high;
  const mid = (low + high) / 2;

  return (
    <div className={styles.scenarioBar} data-mode={mode}>
      <div className={styles.scenarioBarHead}>
        <span>{getModeLabel(mode)}</span>
        <strong>{formatCurrency(mid)} midpoint</strong>
      </div>
      <div className={styles.barTrack}>
        <span className={styles.barLow} />
        <span className={styles.barHigh} />
      </div>
      <div className={styles.barLabels}>
        <span>{formatCurrency(low)}</span>
        <span>{formatCurrency(high)}</span>
      </div>
    </div>
  );
}

export default function InvestorMapClient() {
  const [selectedId, setSelectedId] = useState(equitonProperties[0].id);
  const [zoom, setZoom] = useState(1.25);
  const [mode, setMode] = useState<InvestmentMode>("total");
  const [amount, setAmount] = useState(100000);

  const selectedProperty =
    equitonProperties.find((property) => property.id === selectedId) ?? equitonProperties[0];
  const zoomTier = getZoomTier(zoom);

  const scenario = useMemo(() => {
    const safeAmount = Math.max(0, amount || 0);
    const annualLow = safeAmount * equitonApartmentFund.targetAnnualNetReturn.low;
    const annualHigh = safeAmount * equitonApartmentFund.targetAnnualNetReturn.high;

    return {
      annualLow,
      annualHigh,
      monthlyLow: annualLow / 12,
      monthlyHigh: annualHigh / 12,
    };
  }, [amount]);

  const focusProperty = useCallback((property: EquitonProperty) => {
    setSelectedId(property.id);
    setZoom((currentZoom) => Math.max(currentZoom, 3.25));
  }, []);

  function updateAmount(value: number) {
    if (!Number.isFinite(value)) return;
    setAmount(Math.min(Math.max(value, 0), 2000000));
  }

  function zoomIn() {
    setZoom((currentZoom) => Math.min(4, currentZoom + 0.45));
  }

  function zoomOut() {
    setZoom((currentZoom) => Math.max(1, currentZoom - 0.45));
  }

  function resetCamera() {
    setZoom(1.25);
  }

  return (
    <main className={styles.shell}>
      <section className={styles.mapStage} data-zoom-tier={zoomTier} data-mode={mode}>
        <div className={styles.mapBackdrop} aria-hidden="true">
          <span className={styles.gridLayer} />
          <span className={styles.roadOne} />
          <span className={styles.roadTwo} />
          <span className={styles.roadThree} />
          <span className={styles.lakeShape} />
        </div>

        <header className={styles.topBar}>
          <a href="/hunter-x-capital" className={styles.brandLockup} aria-label="Hunter X Capital">
            <span className={styles.brandMark}>H</span>
            <span>
              <strong>Investor Map</strong>
              <small>Equiton Apartment Fund demo</small>
            </span>
          </a>

          <div className={styles.amountCard}>
            <label htmlFor="investmentAmount">Scenario</label>
            <div>
              <input
                id="investmentAmount"
                type="number"
                value={amount}
                min={0}
                step={25000}
                onChange={(event) => updateAmount(Number(event.target.value))}
              />
            </div>
          </div>
        </header>

        <section className={styles.summaryPanel} aria-label="Investment scenario summary">
          <div>
            <span className={styles.summaryLabel}>Target annual net return</span>
            <strong>8-12%</strong>
          </div>
          <div>
            <span className={styles.summaryLabel}>Annual range</span>
            <strong>
              {formatCurrency(scenario.annualLow)}-{formatCurrency(scenario.annualHigh)}
            </strong>
          </div>
          <div>
            <span className={styles.summaryLabel}>Monthly equivalent</span>
            <strong>
              {formatCurrency(scenario.monthlyLow)}-{formatCurrency(scenario.monthlyHigh)}
            </strong>
          </div>
        </section>

        <div className={styles.modeSwitch} role="group" aria-label="Return lens">
          {(["distribution", "appreciation", "total"] as InvestmentMode[]).map((item) => (
            <button
              key={item}
              type="button"
              className={mode === item ? styles.modeActive : ""}
              onClick={() => setMode(item)}
            >
              {item === "distribution"
                ? "Distribution"
                : item === "appreciation"
                  ? "Appreciation"
                  : "Total"}
            </button>
          ))}
        </div>

        <div className={styles.zoomControls} aria-label="Map zoom controls">
          <button type="button" onClick={zoomIn} aria-label="Zoom in">
            <PlusIcon />
          </button>
          <button type="button" onClick={zoomOut} aria-label="Zoom out">
            <MinusIcon />
          </button>
          <button type="button" onClick={resetCamera} aria-label="Reset camera">
            <ResetIcon />
          </button>
        </div>

        <div className={styles.zoomReadout}>
          <MapIcon />
          <span>
            {zoomTier === "portfolio"
              ? "Province"
              : zoomTier === "city"
                ? "City"
                : zoomTier === "building"
                  ? "Building"
                  : "Facade"}
          </span>
          <strong>{zoom.toFixed(1)}x</strong>
        </div>

        <div className={styles.mapViewport} aria-label="Verified Equiton property 3D map">
          <ArcGisInvestorScene
            selectedProperty={selectedProperty}
            selectedId={selectedId}
            zoom={zoom}
            zoomTier={zoomTier}
            mode={mode}
            amount={amount}
            onSelectProperty={focusProperty}
          />
          <div className={styles.mapAttribution} aria-hidden="true">
            <span>Open 3D Buildings</span>
            <strong>Esri / Overture / OSM</strong>
          </div>
        </div>

        <aside className={styles.drawer} aria-label="Selected property details">
          <div className={styles.drawerHandle} aria-hidden="true" />
          <div className={styles.propertyMedia}>
            <img src={selectedProperty.imageUrl} alt={`${selectedProperty.name} exterior`} />
            <span>Address verified</span>
          </div>

          <div className={styles.drawerBody}>
            <div className={styles.propertyTitleRow}>
              <div>
                <p>
                  {selectedProperty.city}, {selectedProperty.province}
                </p>
                <h1>{selectedProperty.name}</h1>
              </div>
              <a
                href={selectedProperty.sourceUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open official source for ${selectedProperty.name}`}
              >
                <SourceIcon />
              </a>
            </div>

            <p className={styles.address}>{selectedProperty.address}</p>

            <div className={styles.propertyStrip} aria-label="Verified properties">
              {equitonProperties.map((property) => (
                <button
                  key={property.id}
                  type="button"
                  className={property.id === selectedId ? styles.stripActive : ""}
                  data-property-id={`selector-${property.id}`}
                  aria-label={`Select ${property.name}`}
                  onClick={() => focusProperty(property)}
                  onPointerDown={() => focusProperty(property)}
                >
                  <span>{formatCompactCurrency(amount)}</span>
                  <strong>{property.name}</strong>
                  <small>{property.city}</small>
                </button>
              ))}
            </div>

            <div className={styles.detailGrid}>
              <div>
                <span>Verified coordinate</span>
                <strong>
                  {selectedProperty.latitude.toFixed(5)}, {selectedProperty.longitude.toFixed(5)}
                </strong>
              </div>
              <div>
                <span>Scenario capital</span>
                <strong>{formatCurrency(amount)}</strong>
              </div>
              <div>
                <span>Monthly equivalent</span>
                <strong>
                  {formatCurrency(scenario.monthlyLow)}-{formatCurrency(scenario.monthlyHigh)}
                </strong>
              </div>
              <div>
                <span>Public fund source</span>
                <strong>Checked {equitonApartmentFund.sourceCheckedAt}</strong>
              </div>
              <div>
                <span>3D model source</span>
                <strong>Esri Open 3D Buildings</strong>
              </div>
            </div>

            <ScenarioBar mode={mode} amount={amount} />

            <p className={styles.complianceNote}>
              Illustrative only. Target returns and monthly equivalents are not guaranteed.
            </p>
            <p className={styles.modelStatus}>
              3D building context is rendered from Esri Open 3D Buildings, based on Overture Maps
              and OpenStreetMap contributor data. The selected property address and coordinate come
              from the verified Equiton listing.
            </p>
            <p className={styles.disclaimer}>{equitonApartmentFund.disclaimer}</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
