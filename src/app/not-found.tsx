import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-on-background">
      <section className="glass-card w-full max-w-xl rounded-xl p-8 text-center">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.32em] text-on-surface-variant">
          404
        </p>
        <h1 className="text-3xl font-black text-white">
          Dashboard tidak ditemukan
        </h1>
        <p className="mt-3 text-sm leading-6 text-on-surface-variant">
          Pilih Dashboard 1 atau Dashboard 2 dari halaman utama.
        </p>
        <Link
          className="mt-6 inline-flex rounded bg-accent-blue px-4 py-2 text-sm font-bold text-white"
          href="/"
        >
          Ke Halaman Pilihan
        </Link>
      </section>
    </main>
  );
}
