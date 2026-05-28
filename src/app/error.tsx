"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-on-background">
      <section className="glass-card w-full max-w-xl rounded-xl p-8 text-center">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.32em] text-error">
          Dashboard Error
        </p>
        <h1 className="text-3xl font-black text-white">Tampilan gagal dimuat</h1>
        <p className="mt-3 text-sm leading-6 text-on-surface-variant">
          {error.message || "Terjadi error saat memuat dashboard."}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            className="rounded bg-accent-blue px-4 py-2 text-sm font-bold text-white"
            type="button"
            onClick={reset}
          >
            Coba Lagi
          </button>
          <Link
            className="rounded border border-white/10 px-4 py-2 text-sm font-bold text-on-surface-variant transition-colors hover:text-white"
            href="/"
          >
            Kembali
          </Link>
        </div>
      </section>
    </main>
  );
}
