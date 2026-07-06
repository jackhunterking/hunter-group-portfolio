"use client";

import { type CSSProperties, useMemo, useState } from "react";
import {
  type BuildingFootprint,
  type EquitonProperty,
  type InvestmentMode,
  equitonApartmentFund,
  equitonProperties,
} from "./equitonMapData";
import styles from "./investor-map.module.css";

const bounds = equitonProperties.reduce(
  (current, property) => ({
    minLat: Math.min(current.minLat, property.latitude),
    maxLat: Math.max(current.maxLat, property.latitude),
    minLng: Math.min(current.minLng, property.longitude),
    maxLng: Math.max(current.maxLng, property.longitude),
  }),
  {
    minLat: Number.POSITIVE_INFINITY,
    maxLat: Number.NEGATIVE_INFINITY,
    minLng: Number.POSITIVE_INFINITY,
    maxLng: Number.NEGATIVE_INFINITY,
  },
);

const currencyFormatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

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

function projectPoint(property: Pick<EquitonProperty, "latitude" | "longitude">) {
  const x =
    ((property.longitude - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 52 + 22;
  const y =
    (1 - (property.latitude - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 50 + 23;

  return { x, y };
}

function getZoomTier(zoom: number) {
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

function polygonPath(points: ReadonlyArray<readonly [number, number]>) {
  return points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ")
    .concat(" Z");
}

function offsetPoints(points: ReadonlyArray<readonly [number, number]>, dx: number, dy: number) {
  return points.map(([x, y]) => [x + dx, y + dy] as const);
}

function getCentroid(points: ReadonlyArray<readonly [number, number]>) {
  const total = points.reduce(
    (current, [x, y]) => ({
      x: current.x + x,
      y: current.y + y,
    }),
    { x: 0, y: 0 },
  );

  return {
    x: total.x / points.length,
    y: total.y / points.length,
  };
}

function getSidePolygons(footprint: BuildingFootprint) {
  const dx = -footprint.height * 0.18;
  const dy = -footprint.height * 0.36;

  return footprint.points.map((point, index) => {
    const nextPoint = footprint.points[(index + 1) % footprint.points.length];
    const [x1, y1] = point;
    const [x2, y2] = nextPoint;

    return [
      [x1, y1],
      [x2, y2],
      [x2 + dx, y2 + dy],
      [x1 + dx, y1 + dy],
    ] as const;
  });
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

function getFootprintStyle(property: EquitonProperty) {
  const position = projectPoint(property);

  return {
    "--x": `${position.x}%`,
    "--y": `${position.y}%`,
    "--accent": property.buildingProfile.accent,
  } as CSSProperties;
}

function FootprintModel({
  property,
}: {
  property: EquitonProperty;
}) {
  return (
    <svg className={styles.footprintSvg} viewBox="0 0 120 120" aria-hidden="true">
      <path
        className={styles.siteParcel}
        d="M 12 34 L 81 18 L 108 70 L 38 101 L 10 75 Z"
      />
      <path className={styles.siteRoad} d="M 4 88 C 30 77 55 72 116 57" />
      <path className={styles.siteRoadSecondary} d="M 21 18 C 42 34 78 43 111 48" />

      {property.siteModel.footprints.map((footprint) => {
        const dx = -footprint.height * 0.18;
        const dy = -footprint.height * 0.36;
        const roofPoints = offsetPoints(footprint.points, dx, dy);
        const labelPoint = getCentroid(roofPoints);

        return (
          <g
            key={footprint.id}
            className={styles.footprintShape}
            style={
              {
                "--wall-color": footprint.facade,
                "--roof-color": footprint.roof,
              } as CSSProperties
            }
          >
            <path className={styles.footprintBase} d={polygonPath(footprint.points)} />
            {getSidePolygons(footprint).map((side, index) => (
              <path
                key={`${footprint.id}-side-${index}`}
                className={styles.footprintWall}
                d={polygonPath(side)}
              />
            ))}
            <path className={styles.footprintRoof} d={polygonPath(roofPoints)} />
            <path className={styles.footprintRoofEdge} d={polygonPath(roofPoints)} />
            <text className={styles.footprintText} x={labelPoint.x} y={labelPoint.y}>
              {footprint.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function PropertyFootprint({
  property,
  selected,
  onSelect,
}: {
  property: EquitonProperty;
  selected: boolean;
  onSelect: (property: EquitonProperty) => void;
}) {
  return (
    <button
      type="button"
      className={`${styles.propertyFootprint} ${selected ? styles.propertySelected : ""}`}
      style={getFootprintStyle(property)}
      data-property-id={property.id}
      onClick={() => onSelect(property)}
      onPointerDown={() => onSelect(property)}
      aria-label={`${property.name}, ${property.address}`}
    >
      <span className={styles.footprintShadow} />
      <FootprintModel property={property} />
      <span className={styles.pinPulse} />
      <span className={styles.propertyLabel}>
        <strong>{property.name}</strong>
        <span>{property.city}</span>
      </span>
    </button>
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
  const [zoom, setZoom] = useState(2.6);
  const [mode, setMode] = useState<InvestmentMode>("total");
  const [amount, setAmount] = useState(100000);

  const selectedProperty =
    equitonProperties.find((property) => property.id === selectedId) ?? equitonProperties[0];
  const zoomTier = getZoomTier(zoom);

  const cityClusters = useMemo(() => {
    const grouped = equitonProperties.reduce(
      (current, property) => {
        const existing = current.get(property.city) ?? [];
        existing.push(property);
        current.set(property.city, existing);
        return current;
      },
      new Map<string, EquitonProperty[]>(),
    );

    return Array.from(grouped.entries()).map(([city, properties]) => {
      const latitude =
        properties.reduce((total, property) => total + property.latitude, 0) / properties.length;
      const longitude =
        properties.reduce((total, property) => total + property.longitude, 0) / properties.length;
      const position = projectPoint({ latitude, longitude });

      return { city, properties, position };
    });
  }, []);

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

  function updateAmount(value: number) {
    if (!Number.isFinite(value)) return;
    setAmount(Math.min(Math.max(value, 0), 2000000));
  }

  function focusProperty(property: EquitonProperty) {
    setSelectedId(property.id);
    setZoom((currentZoom) => Math.max(currentZoom, 3.25));
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
              {item === "distribution" ? "Distribution" : item === "appreciation" ? "Appreciation" : "Total"}
            </button>
          ))}
        </div>

        <div className={styles.zoomControls} aria-label="Map zoom controls">
          <button
            type="button"
            onClick={() => setZoom((currentZoom) => Math.min(4, currentZoom + 0.45))}
            aria-label="Zoom in"
          >
            <PlusIcon />
          </button>
          <button
            type="button"
            onClick={() => setZoom((currentZoom) => Math.max(1, currentZoom - 0.45))}
            aria-label="Zoom out"
          >
            <MinusIcon />
          </button>
          <button type="button" onClick={() => setZoom(2.6)} aria-label="Reset camera">
            <ResetIcon />
          </button>
        </div>

        <div className={styles.zoomReadout}>
          <MapIcon />
          <span>{zoomTier === "portfolio" ? "Province" : zoomTier === "city" ? "City" : zoomTier === "building" ? "Building" : "Facade"}</span>
          <strong>{zoom.toFixed(1)}x</strong>
        </div>

        <div className={styles.mapViewport} aria-label="Verified Equiton property map">
          <div className={styles.mapAttribution} aria-hidden="true">
            <span>No runtime map API</span>
            <strong>Verified addresses</strong>
          </div>
          <div
            className={styles.mapWorld}
            style={{ "--map-scale": `${1 + (zoom - 1) * 0.14}` } as CSSProperties}
          >
            {zoomTier === "portfolio"
              ? cityClusters.map((cluster) => (
                  <button
                    key={cluster.city}
                    type="button"
                    className={styles.cityCluster}
                    style={
                      {
                        "--x": `${cluster.position.x}%`,
                        "--y": `${cluster.position.y}%`,
                      } as CSSProperties
                    }
                    onClick={() => {
                      setZoom(2);
                      setSelectedId(cluster.properties[0].id);
                    }}
                  >
                    <span>{cluster.properties.length}</span>
                    <strong>{cluster.city}</strong>
                  </button>
                ))
              : equitonProperties.map((property) => (
                  <PropertyFootprint
                    key={property.id}
                    property={property}
                    selected={property.id === selectedId}
                    onSelect={focusProperty}
                  />
                ))}
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
                <p>{selectedProperty.city}, {selectedProperty.province}</p>
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
                <strong>No API local massing</strong>
              </div>
            </div>

            <ScenarioBar mode={mode} amount={amount} />

            <p className={styles.complianceNote}>
              Illustrative only. Target returns and monthly equivalents are not guaranteed.
            </p>
            <p className={styles.modelStatus}>{selectedProperty.modelStatus}</p>
            <p className={styles.modelStatus}>{selectedProperty.siteModel.attribution}</p>
            <p className={styles.disclaimer}>{equitonApartmentFund.disclaimer}</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
