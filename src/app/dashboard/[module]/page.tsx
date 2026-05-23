import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { dashboardIcons, plants } from "@/lib/dashboard-data";
import { dashboardModules, getDashboardModule } from "@/lib/dashboard-modules";
import type { DashboardModuleSlug, Plant } from "@/types/dashboard";

type PageProps = {
  params: Promise<{
    module: string;
  }>;
};

export function generateStaticParams() {
  return dashboardModules.map((module) => ({
    module: module.slug,
  }));
}

function getPlantMetric(plant: Plant, slug: DashboardModuleSlug) {
  switch (slug) {
    case "sales":
      return {
        primary: plant.revenue,
        secondary: plant.growth,
        note: `Target YTD ${plant.target}%`,
        progress: plant.target,
      };
    case "production":
      return {
        primary: `${plant.comparison.production}%`,
        secondary: "Utilisasi",
        note: "Produksi terhadap kapasitas aktif",
        progress: plant.comparison.production,
      };
    case "raw-material":
      return {
        primary: plant.comparison.rawMaterial,
        secondary: `${plant.comparison.rawDays} hari`,
        note: "Coverage bahan baku",
        progress: Math.min(plant.comparison.rawDays * 5, 100),
      };
    case "cost":
      return {
        primary: plant.comparison.cost,
        secondary: plant.comparison.costNote,
        note: "Status budget operasional",
        progress: plant.comparison.costNote.includes("bawah") ? 78 : 92,
      };
    case "hr":
      return {
        primary: plant.comparison.hr,
        secondary: `Eff ${plant.comparison.efficiency}`,
        note: "Kehadiran dan produktivitas",
        progress: Number.parseFloat(plant.comparison.hr),
      };
  }
}

export default async function ModuleDetailPage({ params }: PageProps) {
  const { module: moduleSlug } = await params;
  const dashboardModule = getDashboardModule(moduleSlug);

  if (!dashboardModule) {
    notFound();
  }

  const Icon =
    dashboardIcons[dashboardModule.icon as keyof typeof dashboardIcons];

  return (
    <main className="min-h-screen bg-background text-on-background">
      <header className="border-b border-white/5 bg-surface/50 px-6 py-6 backdrop-blur-md lg:px-12">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <Link
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-on-surface-variant transition-colors hover:text-white"
              href="/"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden />
            </Link>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-on-surface-variant">
                DSN Group Detail Dashboard
              </p>
              <h1 className="mt-1 text-3xl font-black uppercase tracking-tight text-white lg:text-4xl">
                {dashboardModule.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
            <Icon className={`h-7 w-7 ${dashboardModule.tone}`} aria-hidden />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                {dashboardModule.eyebrow}
              </p>
              <p className="text-sm font-semibold text-white">
                {dashboardModule.description}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="grid gap-6 p-6 lg:grid-cols-3 lg:p-12">
        {plants.map((plant) => {
          const metric = getPlantMetric(plant, dashboardModule.slug);

          return (
            <article
              className="glass-card flex min-h-72 flex-col justify-between rounded-xl p-6"
              key={plant.id}
            >
              <div>
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="comparison-label text-accent-blue">
                      {plant.name}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                      {plant.location}
                    </p>
                  </div>
                  <span className="rounded bg-white/5 px-2 py-1 text-[10px] font-black uppercase text-on-surface-variant">
                    {plant.division}
                  </span>
                </div>

                <p className="text-5xl font-black tracking-tighter text-white">
                  {metric.primary}
                </p>
                <p className="mt-2 text-sm font-bold text-success">
                  {metric.secondary}
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  <span>{metric.note}</span>
                  <span>{Math.round(metric.progress)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-accent-blue"
                    style={{ width: `${metric.progress}%` }}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
