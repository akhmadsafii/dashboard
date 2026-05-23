import {
  BarChart3,
  Bell,
  Boxes,
  CalendarClock,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Factory,
  LayoutDashboard,
  MapPinned,
  Megaphone,
  PackageCheck,
  ShieldCheck,
  TrendingUp,
  Truck,
  UsersRound,
  WalletCards,
  Zap,
} from "lucide-react";
import type { Plant } from "@/types/dashboard";

export const dashboardIcons = {
  BarChart3,
  Bell,
  Boxes,
  CalendarClock,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Factory,
  LayoutDashboard,
  MapPinned,
  Megaphone,
  PackageCheck,
  ShieldCheck,
  TrendingUp,
  Truck,
  UsersRound,
  WalletCards,
  Zap,
};

export const salesSummary = {
  panel: {
    label: "Panel Product",
    revenue: "Rp 312.8 B",
    growth: "+4.2% YTD",
    trend: "up",
  },
  floor: {
    label: "Floor Product",
    revenue: "Rp 169.7 B",
    growth: "-1.5% YTD",
    trend: "down",
  },
  aggregate: "Rp 482.5 B",
};

export const productionSummary = {
  shift: "Active Shift 01",
  panel: {
    label: "Panel Product (M3)",
    volume: "5,824",
    inventory: "1,450 Pallets",
    progress: 82,
  },
  floor: {
    label: "Floor Product (M2)",
    volume: "2,628",
    inventory: "690 Pallets",
    progress: 65,
  },
};

export const rawMaterialSummary = [
  {
    label: "Panel",
    stock: "88.4% Stock",
    value: "Rp 8.2 B",
    tone: "panel",
  },
  {
    label: "Floor",
    stock: "76.1% Stock",
    value: "Rp 4.3 B",
    tone: "floor",
  },
] as const;

export const costSummary = [
  {
    label: "Panel Product",
    total: "Rp 18.2 B",
    fixed: "38%",
    variable: "62%",
    tone: "panel",
  },
  {
    label: "Floor Product",
    total: "Rp 10.2 B",
    fixed: "45%",
    variable: "55%",
    tone: "floor",
  },
] as const;

export const hrSummary = [
  {
    branch: "Panel Branch",
    productivityRate: "98.5% PR",
    manpower: "842",
    manhours: "6.7k",
    efficiencyLabel: "Efficiency (M3/MP/Day)",
    baseEfficiency: 6.92,
    maxDrift: 0.1,
    tone: "panel",
  },
  {
    branch: "Floor Branch",
    productivityRate: "97.8% PR",
    manpower: "406",
    manhours: "3.2k",
    efficiencyLabel: "Efficiency (M2/MP/Day)",
    baseEfficiency: 6.47,
    maxDrift: 0.15,
    tone: "floor",
  },
] as const;

export const tickerItems = [
  {
    icon: "Megaphone",
    tone: "text-warning",
    text: "NOTIFIKASI: Audit K3 mingguan DSN Group akan dilaksanakan pada hari Jumat jam 14:00 di Area Kiln Dry Panel.",
  },
  {
    icon: "Truck",
    tone: "text-success",
    text: "LOGISTIK: 8 truk kontainer (5 Panel, 3 Floor) dijadwalkan tiba sore ini untuk pengiriman ekspor Yokohama & Busan.",
  },
  {
    icon: "Bell",
    tone: "text-accent-blue",
    text: "KUALITAS: Reject rate shift pagi Panel tercatat 0.3% - Floor tercatat 0.5%. Mempertahankan standar mutu ekspor.",
  },
  {
    icon: "Zap",
    tone: "text-warning",
    text: "ENERGI: Efisiensi penggunaan listrik grup tercatat 18.4 MWh - Sesuai dengan parameter target operasional bulanan.",
  },
] as const;

export const plants = [
  {
    id: "artha-niaga",
    name: "Artha Niaga",
    location: "Cikarang",
    division: "Sales Performance",
    revenue: "Rp 482.5B",
    growth: "+12.4%",
    comparison: {
      revenueB: 482.5,
      production: 94.2,
      rawMaterial: "820 Ton",
      rawDays: 14,
      cost: "Rp 4.2B",
      costNote: "3% di atas budget",
      hr: "98.1%",
      efficiency: "6.88",
    },
    target: 68,
    targetNote:
      "Target tahunan tercapai sebesar 68.2%. Kinerja penjualan menunjukkan akselerasi positif pada kuartal kedua.",
    products: [
      {
        name: "Panel System",
        revenue: "Rp 294.1B",
        percent: 61,
        color: "bg-secondary-container",
      },
      {
        name: "Flooring Unit",
        revenue: "Rp 188.4B",
        percent: 39,
        color: "bg-secondary-fixed-dim",
      },
    ],
    trend: [
      { month: "Jan", target: 60, actual: 55 },
      { month: "Feb", target: 65, actual: 62 },
      { month: "Mar", target: 75, actual: 80 },
      { month: "Apr", target: 70, actual: 78 },
      { month: "Mei*", target: 85, actual: 45 },
    ],
    regions: [
      { name: "Jawa Barat", status: "Dominan", highlight: true },
      { name: "Jawa Timur", status: "Tumbuh", highlight: false },
      { name: "Sumatera Utara", status: "Stabil", highlight: false },
    ],
    quickStats: [
      {
        label: "Produksi",
        value: "94.2%",
        note: "Utilisasi line aktif",
        icon: "Factory",
        tone: "border-secondary-container text-secondary-fixed",
        progress: 94,
      },
      {
        label: "Bahan Baku",
        value: "820 Ton",
        note: "Aman untuk 14 Hari",
        icon: "PackageCheck",
        tone: "border-secondary-fixed-dim text-secondary-fixed-dim",
      },
      {
        label: "Biaya Operasional",
        value: "Rp 4.2B",
        note: "3% di atas budget",
        icon: "CreditCard",
        tone: "border-error text-error",
      },
      {
        label: "SDM / HR",
        value: "98.1%",
        note: "Kehadiran hari ini",
        icon: "UsersRound",
        tone: "border-success text-success",
      },
    ],
  },
  {
    id: "dsj-panel",
    name: "DSJ Panel",
    location: "Samarinda",
    division: "Panel Manufacturing",
    revenue: "Rp 312.8B",
    growth: "+9.8%",
    comparison: {
      revenueB: 312.8,
      production: 96.8,
      rawMaterial: "1,240 Ton",
      rawDays: 18,
      cost: "Rp 6.1B",
      costNote: "1% di bawah budget",
      hr: "97.4%",
      efficiency: "7.12",
    },
    target: 72,
    targetNote:
      "Output panel stabil dan didukung order ekspor berulang dari pelanggan Asia Timur.",
    products: [
      {
        name: "Plywood Export",
        revenue: "Rp 201.4B",
        percent: 64,
        color: "bg-secondary-container",
      },
      {
        name: "Domestic Panel",
        revenue: "Rp 111.4B",
        percent: 36,
        color: "bg-secondary-fixed-dim",
      },
    ],
    trend: [
      { month: "Jan", target: 58, actual: 61 },
      { month: "Feb", target: 63, actual: 66 },
      { month: "Mar", target: 70, actual: 74 },
      { month: "Apr", target: 78, actual: 76 },
      { month: "Mei*", target: 82, actual: 58 },
    ],
    regions: [
      { name: "Kalimantan Timur", status: "Dominan", highlight: true },
      { name: "Sulawesi Selatan", status: "Tumbuh", highlight: false },
      { name: "Jawa Timur", status: "Stabil", highlight: false },
    ],
    quickStats: [
      {
        label: "Produksi",
        value: "96.8%",
        note: "Utilisasi line aktif",
        icon: "Factory",
        tone: "border-secondary-container text-secondary-fixed",
        progress: 97,
      },
      {
        label: "Bahan Baku",
        value: "1,240 Ton",
        note: "Aman untuk 18 Hari",
        icon: "PackageCheck",
        tone: "border-secondary-fixed-dim text-secondary-fixed-dim",
      },
      {
        label: "Biaya Operasional",
        value: "Rp 6.1B",
        note: "1% di bawah budget",
        icon: "CreditCard",
        tone: "border-success text-success",
      },
      {
        label: "SDM / HR",
        value: "97.4%",
        note: "Kehadiran hari ini",
        icon: "UsersRound",
        tone: "border-success text-success",
      },
    ],
  },
  {
    id: "floor-unit",
    name: "Floor Unit",
    location: "Surabaya",
    division: "Floor Product",
    revenue: "Rp 169.7B",
    growth: "+5.1%",
    comparison: {
      revenueB: 169.7,
      production: 91.7,
      rawMaterial: "560 Ton",
      rawDays: 12,
      cost: "Rp 3.7B",
      costNote: "2% di atas budget",
      hr: "98.6%",
      efficiency: "6.47",
    },
    target: 63,
    targetNote:
      "Demand flooring domestik meningkat, sementara export backlog sedang dipercepat untuk pengiriman akhir bulan.",
    products: [
      {
        name: "Engineered Floor",
        revenue: "Rp 104.5B",
        percent: 62,
        color: "bg-secondary-container",
      },
      {
        name: "Decking Product",
        revenue: "Rp 65.2B",
        percent: 38,
        color: "bg-secondary-fixed-dim",
      },
    ],
    trend: [
      { month: "Jan", target: 52, actual: 48 },
      { month: "Feb", target: 58, actual: 56 },
      { month: "Mar", target: 63, actual: 67 },
      { month: "Apr", target: 69, actual: 72 },
      { month: "Mei*", target: 74, actual: 52 },
    ],
    regions: [
      { name: "Jawa Timur", status: "Dominan", highlight: true },
      { name: "Bali", status: "Tumbuh", highlight: false },
      { name: "DKI Jakarta", status: "Stabil", highlight: false },
    ],
    quickStats: [
      {
        label: "Produksi",
        value: "91.7%",
        note: "Utilisasi line aktif",
        icon: "Factory",
        tone: "border-secondary-container text-secondary-fixed",
        progress: 92,
      },
      {
        label: "Bahan Baku",
        value: "560 Ton",
        note: "Aman untuk 12 Hari",
        icon: "PackageCheck",
        tone: "border-secondary-fixed-dim text-secondary-fixed-dim",
      },
      {
        label: "Biaya Operasional",
        value: "Rp 3.7B",
        note: "2% di atas budget",
        icon: "CreditCard",
        tone: "border-error text-error",
      },
      {
        label: "SDM / HR",
        value: "98.6%",
        note: "Kehadiran hari ini",
        icon: "UsersRound",
        tone: "border-success text-success",
      },
    ],
  },
] as const satisfies readonly Plant[];
