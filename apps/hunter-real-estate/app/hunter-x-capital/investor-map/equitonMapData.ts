export type InvestmentMode = "distribution" | "appreciation" | "total";

export type VerificationStatus = "verified-official-page" | "pending";

export type BuildingFootprint = {
  id: string;
  label: string;
  points: ReadonlyArray<readonly [number, number]>;
  height: number;
  facade: string;
  roof: string;
};

export type EquitonProperty = {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  latitude: number;
  longitude: number;
  sourceUrl: string;
  imageUrl: string;
  verifiedAt: string;
  verificationStatus: VerificationStatus;
  modelStatus: string;
  siteModel: {
    source: string;
    attribution: string;
    footprints: BuildingFootprint[];
  };
  buildingProfile: {
    floors: number;
    width: number;
    depth: number;
    accent: string;
  };
};

export const equitonApartmentFund = {
  name: "Equiton Residential Income Fund Trust",
  shortName: "Equiton Apartment Fund",
  sourceUrl: "https://equiton.com/individual-investors/our-funds/apartment-fund/",
  sourceCheckedAt: "2026-07-06",
  targetAnnualNetReturn: {
    low: 0.08,
    high: 0.12,
  },
  facts: [
    "Focused on monthly income and long-term growth through apartment buildings.",
    "Returns are described through income generation, equity growth, and property value appreciation.",
    "Targeted annual net return is 8-12%, stated by Equiton as illustrative and not guaranteed.",
  ],
  disclaimer:
    "Targets and illustrative scenarios are not guarantees. Actual results may differ. Investors should rely on the applicable Offering Memorandum and suitability advice before making any investment decision.",
};

export const equitonProperties: EquitonProperty[] = [
  {
    id: "lynnwood-place",
    name: "Lynnwood Place",
    address: "19 & 23 Lynnwood Drive, Brantford, Ontario",
    city: "Brantford",
    province: "Ontario",
    latitude: 43.13997,
    longitude: -80.23679,
    sourceUrl: "https://www.equitonliving.com/residential/19-lynnwood-drive",
    imageUrl: "https://assets.rentsync.com/equiton/images/gallery/768/1773850691481_lynnwood.png",
    verifiedAt: "2026-07-06",
    verificationStatus: "verified-official-page",
    modelStatus:
      "No-runtime-API 3D massing model. Exact address and coordinate are verified; production footprint should be replaced with exported OSM/LiDAR/site-survey geometry.",
    siteModel: {
      source: "Local no-API prototype massing based on the verified address coordinate.",
      attribution:
        "Address and exterior reference are from the official Equiton Living listing. Footprint is a local prototype model pending open-data or survey import.",
      footprints: [
        {
          id: "lynnwood-19",
          label: "19 Lynnwood",
          points: [
            [27, 28],
            [49, 24],
            [56, 70],
            [32, 74],
          ],
          height: 31,
          facade: "#d9c398",
          roof: "#5f6d75",
        },
        {
          id: "lynnwood-23",
          label: "23 Lynnwood",
          points: [
            [58, 29],
            [78, 34],
            [70, 77],
            [49, 72],
          ],
          height: 29,
          facade: "#ccb17d",
          roof: "#4e5962",
        },
      ],
    },
    buildingProfile: {
      floors: 12,
      width: 70,
      depth: 30,
      accent: "#ebc76b",
    },
  },
  {
    id: "park-manor",
    name: "Park Manor",
    address: "120 St Paul Avenue, Brantford, Ontario",
    city: "Brantford",
    province: "Ontario",
    latitude: 43.1463676,
    longitude: -80.2818273,
    sourceUrl: "https://www.equitonliving.com/residential/120-st-paul-avenue",
    imageUrl: "https://assets.rentsync.com/equiton/images/gallery/768/1781101719838_park_manor__4_.png",
    verifiedAt: "2026-07-06",
    verificationStatus: "verified-official-page",
    modelStatus:
      "No-runtime-API 3D massing model. Exact address and coordinate are verified; production footprint should be replaced with exported OSM/LiDAR/site-survey geometry.",
    siteModel: {
      source: "Local no-API prototype massing based on the verified address coordinate.",
      attribution:
        "Address and exterior reference are from the official Equiton Living listing. Footprint is a local prototype model pending open-data or survey import.",
      footprints: [
        {
          id: "park-manor-main",
          label: "Park Manor",
          points: [
            [34, 22],
            [68, 25],
            [70, 44],
            [58, 44],
            [60, 76],
            [31, 73],
          ],
          height: 24,
          facade: "#c9b185",
          roof: "#53636d",
        },
      ],
    },
    buildingProfile: {
      floors: 8,
      width: 62,
      depth: 34,
      accent: "#d8b766",
    },
  },
  {
    id: "wynbrook-mayfair",
    name: "Wynbrook & Mayfair",
    address: "30 Campbell Court, Stratford, Ontario",
    city: "Stratford",
    province: "Ontario",
    latitude: 43.3842797,
    longitude: -80.9759261,
    sourceUrl: "https://www.equitonliving.com/residential/31-campbell-court",
    imageUrl: "https://assets.rentsync.com/equiton/images/gallery/768/1781034498449_wynbrook__2_.png",
    verifiedAt: "2026-07-06",
    verificationStatus: "verified-official-page",
    modelStatus:
      "Official page slug differs from displayed address; map uses displayed official data-address. No-runtime-API footprint is a prototype massing model pending open-data or survey import.",
    siteModel: {
      source: "Local no-API prototype massing based on the verified address coordinate.",
      attribution:
        "Address and exterior reference are from the official Equiton Living listing. Footprint is a local prototype model pending open-data or survey import.",
      footprints: [
        {
          id: "wynbrook",
          label: "Wynbrook",
          points: [
            [25, 31],
            [56, 26],
            [60, 43],
            [30, 49],
          ],
          height: 19,
          facade: "#b7c0c9",
          roof: "#586777",
        },
        {
          id: "mayfair",
          label: "Mayfair",
          points: [
            [48, 54],
            [80, 48],
            [84, 65],
            [52, 72],
          ],
          height: 18,
          facade: "#c7b690",
          roof: "#637485",
        },
      ],
    },
    buildingProfile: {
      floors: 6,
      width: 78,
      depth: 32,
      accent: "#9fb1c7",
    },
  },
  {
    id: "the-foresite",
    name: "The Foresite",
    address: "65 Times Avenue, Markham, Ontario",
    city: "Markham",
    province: "Ontario",
    latitude: 43.8409304,
    longitude: -79.3914731,
    sourceUrl: "https://www.equitonliving.com/residential/65-times-avenue",
    imageUrl: "https://assets.rentsync.com/equiton/images/gallery/768/1777668053063_the_foresite__1_.png",
    verifiedAt: "2026-07-06",
    verificationStatus: "verified-official-page",
    modelStatus:
      "No-runtime-API 3D massing model. Exact address and coordinate are verified; production footprint should be replaced with exported OSM/LiDAR/site-survey geometry.",
    siteModel: {
      source: "Local no-API prototype massing based on the verified address coordinate.",
      attribution:
        "Address and exterior reference are from the official Equiton Living listing. Footprint is a local prototype model pending open-data or survey import.",
      footprints: [
        {
          id: "foresite-tower",
          label: "65 Times",
          points: [
            [38, 24],
            [69, 24],
            [72, 42],
            [61, 43],
            [62, 76],
            [39, 76],
            [40, 43],
            [34, 42],
          ],
          height: 39,
          facade: "#d7c18d",
          roof: "#4f5962",
        },
      ],
    },
    buildingProfile: {
      floors: 16,
      width: 58,
      depth: 30,
      accent: "#ebc76b",
    },
  },
  {
    id: "thamesview-apartments",
    name: "Thamesview Apartments",
    address: "75 Mary Street, Chatham, Ontario",
    city: "Chatham",
    province: "Ontario",
    latitude: 42.4023988,
    longitude: -82.1968103,
    sourceUrl: "https://www.equitonliving.com/residential/75-mary-street",
    imageUrl: "https://assets.rentsync.com/equiton/images/gallery/768/1781035838300_thamesview__3_.png",
    verifiedAt: "2026-07-06",
    verificationStatus: "verified-official-page",
    modelStatus:
      "No-runtime-API 3D massing model. Exact address and coordinate are verified; production footprint should be replaced with exported OSM/LiDAR/site-survey geometry.",
    siteModel: {
      source: "Local no-API prototype massing based on the verified address coordinate.",
      attribution:
        "Address and exterior reference are from the official Equiton Living listing. Footprint is a local prototype model pending open-data or survey import.",
      footprints: [
        {
          id: "thamesview-main",
          label: "75 Mary",
          points: [
            [32, 24],
            [67, 30],
            [65, 44],
            [52, 43],
            [49, 74],
            [27, 70],
          ],
          height: 28,
          facade: "#cab381",
          roof: "#596978",
        },
      ],
    },
    buildingProfile: {
      floors: 11,
      width: 64,
      depth: 28,
      accent: "#c9b06d",
    },
  },
];
