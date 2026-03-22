export interface GlobeNode {
  id: "morgantown" | "lahore";
  label: string;
  role: string;
  location: string;
  latitude: number;
  longitude: number;
  chip: string;
}

export interface ArcConnection {
  id: string;
  from: GlobeNode["id"];
  to: GlobeNode["id"];
  height: number;
}

type EllipseShape = {
  center: [number, number];
  radius: [number, number];
};

const CONTINENT_SHAPES: readonly EllipseShape[] = [
  { center: [64, -146], radius: [12, 12] },
  { center: [55, -126], radius: [14, 22] },
  { center: [46, -112], radius: [18, 26] },
  { center: [36, -101], radius: [18, 24] },
  { center: [23, -102], radius: [12, 16] },
  { center: [15, -88], radius: [10, 12] },
  { center: [-12, -60], radius: [22, 14] },
  { center: [-30, -63], radius: [16, 12] },
  { center: [72, -42], radius: [8, 10] },
  { center: [54, -20], radius: [10, 16] },
  { center: [52, 10], radius: [14, 18] },
  { center: [50, 36], radius: [10, 16] },
  { center: [35, 22], radius: [18, 18] },
  { center: [18, 18], radius: [24, 18] },
  { center: [10, 46], radius: [10, 12] },
  { center: [30, 70], radius: [14, 18] },
  { center: [44, 88], radius: [16, 28] },
  { center: [28, 102], radius: [18, 22] },
  { center: [12, 103], radius: [14, 18] },
  { center: [-4, 118], radius: [10, 12] },
  { center: [-24, 134], radius: [14, 18] },
  { center: [-42, 173], radius: [7, 7] },
] as const;

const LAND_DOT_STEP = 1.6;
const COAST_DOT_STEP = 1.05;

function seededNoise(seed: number) {
  const value = Math.sin(seed * 91.173) * 43758.5453;
  return value - Math.floor(value);
}

function buildDotMap(step: number, mode: "land" | "coast") {
  const dots = new Map<string, [number, number]>();

  CONTINENT_SHAPES.forEach((shape, shapeIndex) => {
    const [centerLat, centerLon] = shape.center;
    const [radiusLat, radiusLon] = shape.radius;

    for (let lat = centerLat - radiusLat; lat <= centerLat + radiusLat; lat += step) {
      for (let lon = centerLon - radiusLon; lon <= centerLon + radiusLon; lon += step) {
        const normalized =
          ((lat - centerLat) * (lat - centerLat)) / (radiusLat * radiusLat) +
          ((lon - centerLon) * (lon - centerLon)) / (radiusLon * radiusLon);

        if (normalized > 1) {
          continue;
        }

        if (mode === "land" && normalized > 0.9) {
          continue;
        }

        if (mode === "coast" && (normalized < 0.78 || normalized > 1.02)) {
          continue;
        }

        const noise = seededNoise(shapeIndex * 1000 + lat * 37 + lon * 17);
        const jitterAmount = mode === "coast" ? 0.24 : 0.42;
        const jitteredLat = Number((lat + (noise - 0.5) * jitterAmount).toFixed(2));
        const jitteredLon = Number((lon + (noise - 0.5) * jitterAmount).toFixed(2));
        const key = `${jitteredLat.toFixed(2)}:${jitteredLon.toFixed(2)}`;

        dots.set(key, [jitteredLat, jitteredLon]);
      }
    }
  });

  return Array.from(dots.values());
}

export const ABOUT_GLOBE_NODES: readonly GlobeNode[] = [
  {
    id: "morgantown",
    label: "Strategy & Architecture",
    role: "US Strategy Hub",
    location: "Morgantown, WV",
    latitude: 39.6,
    longitude: -79.9,
    chip: "US-led direction",
  },
  {
    id: "lahore",
    label: "Engineering & Execution",
    role: "Engineering Office",
    location: "Lahore, PK",
    latitude: 31.5,
    longitude: 74.3,
    chip: "Follow-the-sun delivery",
  },
] as const;

export const ABOUT_GLOBE_ARCS: readonly ArcConnection[] = [
  {
    id: "morgantown-to-lahore",
    from: "morgantown",
    to: "lahore",
    height: 2.24,
  },
] as const;

export const ABOUT_GLOBE_LAND_DOTS = buildDotMap(LAND_DOT_STEP, "land");
export const ABOUT_GLOBE_COAST_DOTS = buildDotMap(COAST_DOT_STEP, "coast");
