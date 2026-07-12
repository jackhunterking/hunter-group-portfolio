// Loose structural typings for the ArcGIS SDK, which is loaded from Esri's CDN
// (AMD) rather than bundled.

export type ArcGisModule = new (options?: Record<string, unknown>) => Record<string, any>;

export type ArcGisRequire = (
  modules: string[],
  callback: (...loadedModules: ArcGisModule[]) => void,
  errback?: (error: unknown) => void,
) => void;

export type ArcGisModules = {
  Map: ArcGisModule;
  SceneView: ArcGisModule;
  SceneLayer: ArcGisModule;
  GraphicsLayer: ArcGisModule;
  Graphic: ArcGisModule;
  Point: ArcGisModule;
  SimpleMarkerSymbol: ArcGisModule;
  TextSymbol: ArcGisModule;
};

declare global {
  interface Window {
    require?: ArcGisRequire;
  }
}
