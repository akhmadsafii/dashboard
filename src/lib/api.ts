// API utilities for dashboard data fetching
// This file will be used for future API integration

import type { RegionData, ProductionDashboardData } from "@/types";

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Fetch region sales data
export async function fetchRegionSalesData(region: string): Promise<RegionData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/sales/region?region=${encodeURIComponent(region)}`);
    if (!response.ok) throw new Error("Failed to fetch region sales data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching region sales data:", error);
    return null;
  }
}

// Fetch production dashboard data
export async function fetchProductionData(): Promise<ProductionDashboardData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/production/dashboard`);
    if (!response.ok) throw new Error("Failed to fetch production data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching production data:", error);
    return null;
  }
}

// Fetch group KPIs
export async function fetchGroupKPIs(): Promise<unknown> {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/kpis`);
    if (!response.ok) throw new Error("Failed to fetch KPIs");
    return await response.json();
  } catch (error) {
    console.error("Error fetching KPIs:", error);
    return null;
  }
}

// Generic fetch wrapper with caching
export async function fetchData<T>(
  endpoint: string,
  options?: {
    revalidate?: number;
    tags?: string[];
  }
): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: {
        revalidate: options?.revalidate ?? 60,
        tags: options?.tags,
      },
    });
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}
