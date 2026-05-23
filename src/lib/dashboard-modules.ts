import type { DashboardModule } from "@/types/dashboard";

export const dashboardModules = [
  {
    slug: "sales",
    title: "Sales Performance",
    eyebrow: "Revenue",
    description: "Detail pendapatan, pertumbuhan, target, dan tren penjualan per plant.",
    icon: "CircleDollarSign",
    tone: "text-accent-blue",
  },
  {
    slug: "production",
    title: "Production Volume",
    eyebrow: "Manufacturing",
    description: "Detail utilisasi produksi, kapasitas, dan performa shift per plant.",
    icon: "Factory",
    tone: "text-success",
  },
  {
    slug: "raw-material",
    title: "Raw Material",
    eyebrow: "Inventory",
    description: "Detail posisi stok bahan baku, umur stok, dan coverage operasional.",
    icon: "Boxes",
    tone: "text-warning",
  },
  {
    slug: "cost",
    title: "Cost Analysis",
    eyebrow: "Finance",
    description: "Detail biaya operasional dan status budget per plant.",
    icon: "WalletCards",
    tone: "text-error",
  },
  {
    slug: "hr",
    title: "HR Productivity",
    eyebrow: "People",
    description: "Detail kehadiran, produktivitas, dan efisiensi tenaga kerja.",
    icon: "UsersRound",
    tone: "text-accent-blue",
  },
] as const satisfies DashboardModule[];

export function getDashboardModule(slug: string) {
  return dashboardModules.find((module) => module.slug === slug);
}
