// Dashboard types
export type DashboardTwoCategory =
  | "All Categories"
  | "Sales"
  | "Production"
  | "Raw Material"
  | "Cost";

export type DashboardTwoBusinessUnit =
  | "All Units"
  | "TKPI Floor Division"
  | "Panel Division";

export type DashboardTwoRegion = "Global View" | "SEA Region" | "North America" | "Europe";

export type DashboardTwoPeriod = "Last 7 Days" | "Last 30 Days" | "Last 90 Days" | "YTD";

export type PlantStatus = "Optimal" | "Target" | "Critical" | "Alert" | "Watch" | "Stable";

// Sales types
export interface PlantSalesData {
  name: string;
  sales: string;
  volume: string;
  achievement: number;
  status: string;
  statusClass: string;
}

export interface RegionData {
  sales: string;
  target: string;
  growth: string;
  plants: PlantSalesData[];
  regions: Array<[string, number, string]>;
}

// Production types
export interface DivisionProductionData {
  name: string;
  output: string;
  oee: string;
  gap: string;
  yield: string;
  status: PlantStatus;
  trend: number[];
}

export interface Division {
  division: string;
  items: DivisionProductionData[];
}

export interface Anomaly {
  type: "Critical" | "Alert" | "Notice";
  color: string;
  bgColor: string;
  borderColor: string;
  shadowColor: string;
  message: string;
}

export interface SKU {
  name: string;
  division: string;
  volume: string;
  eff: string;
}

export interface Machine {
  name: string;
  health: number;
  status: string;
  statusColor: string;
}

export interface ProductionDashboardData {
  output: { value: string; unit: string; target: string };
  oee: { value: string; unit: string; progress: number };
  energy: { value: string; unit: string; status: string };
  downtime: { value: string; unit: string; trend: string };
  quality: { value: string; unit: string; status: string };
  plants: Division[];
  anomalies: Anomaly[];
  skus: SKU[];
  machines: Machine[];
}

// KPI types
export interface GroupKPI {
  label: string;
  value: string;
  variance: string;
  note: string;
  positive: boolean;
  alert: boolean;
}
