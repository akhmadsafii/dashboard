export type DashboardMode = "comparison" | "single";

export type PlantComparison = {
  revenueB: number;
  production: number;
  rawMaterial: string;
  rawDays: number;
  cost: string;
  costNote: string;
  hr: string;
  efficiency: string;
};

export type Plant = {
  id: string;
  name: string;
  location: string;
  division: string;
  revenue: string;
  growth: string;
  comparison: PlantComparison;
  target: number;
  targetNote: string;
  products: readonly {
    name: string;
    revenue: string;
    percent: number;
    color: string;
  }[];
  trend: readonly {
    month: string;
    target: number;
    actual: number;
  }[];
  regions: readonly {
    name: string;
    status: string;
    highlight: boolean;
  }[];
  quickStats: readonly {
    label: string;
    value: string;
    note: string;
    icon: string;
    tone: string;
    progress?: number;
  }[];
};

export type DashboardModuleSlug =
  | "sales"
  | "production"
  | "raw-material"
  | "cost"
  | "hr";

export type DashboardModule = {
  slug: DashboardModuleSlug;
  title: string;
  eyebrow: string;
  description: string;
  icon: string;
  tone: string;
};
