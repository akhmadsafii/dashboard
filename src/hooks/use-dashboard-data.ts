"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  DashboardTwoCategory,
  DashboardTwoBusinessUnit,
  DashboardTwoRegion,
  DashboardTwoPeriod,
  RegionData,
  PlantSalesData,
  ProductionDashboardData,
  GroupKPI,
} from "@/types";
import {
  regionSalesData,
  productionDashboardData,
  groupKPIs,
  filterPlantsByBusinessUnit,
  periodMultipliers,
} from "@/data/mock-data";

interface UseDashboardDataReturn {
  // Filter states
  category: DashboardTwoCategory;
  setCategory: (category: DashboardTwoCategory) => void;
  businessUnit: DashboardTwoBusinessUnit;
  setBusinessUnit: (unit: DashboardTwoBusinessUnit) => void;
  region: DashboardTwoRegion;
  setRegion: (region: DashboardTwoRegion) => void;
  timePeriod: DashboardTwoPeriod;
  setTimePeriod: (period: DashboardTwoPeriod) => void;

  // Derived states
  isSalesCategory: boolean;
  isProductionCategory: boolean;
  isPlantSales: boolean;

  // Data
  groupKPIs: GroupKPI[];
  currentRegionData: RegionData;
  filteredPlantData: PlantSalesData[];
  productionData: ProductionDashboardData;

  // Scaled values based on time period
  scaledSales: string;
  scaledTarget: string;

  // Loading state
  isLoading: boolean;
}

export function useDashboardData(): UseDashboardDataReturn {
  // Filter states
  const [category, setCategory] = useState<DashboardTwoCategory>("All Categories");
  const [businessUnit, setBusinessUnit] = useState<DashboardTwoBusinessUnit>("All Units");
  const [region, setRegion] = useState<DashboardTwoRegion>("Global View");
  const [timePeriod, setTimePeriod] = useState<DashboardTwoPeriod>("Last 30 Days");
  const [isLoading, setIsLoading] = useState(false);

  // Derived states
  const isSalesCategory = category === "Sales";
  const isProductionCategory = category === "Production";
  const isPlantSales = isSalesCategory && businessUnit !== "All Units";

  // Current region data
  const currentRegionData = regionSalesData[region];

  // Filter plant data by business unit
  const filteredPlantData = filterPlantsByBusinessUnit(
    currentRegionData.plants,
    businessUnit
  );

  // Calculate scaled values based on time period
  const periodFactor = periodMultipliers[timePeriod] || 1;
  const baseSales = parseFloat(currentRegionData.sales.replace("$", "").replace("M", ""));
  const baseTarget = parseFloat(currentRegionData.target.replace("$", "").replace("M", ""));
  const scaledSales = (baseSales * periodFactor).toFixed(1);
  const scaledTarget = (baseTarget * periodFactor).toFixed(1);

  return {
    // Filter states
    category,
    setCategory,
    businessUnit,
    setBusinessUnit,
    region,
    setRegion,
    timePeriod,
    setTimePeriod,

    // Derived states
    isSalesCategory,
    isProductionCategory,
    isPlantSales,

    // Data
    groupKPIs,
    currentRegionData,
    filteredPlantData,
    productionData: productionDashboardData,

    // Scaled values
    scaledSales,
    scaledTarget,

    // Loading state
    isLoading,
  };
}
