import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-serif text-6xl font-bold">
        <span className="bg-gradient-to-r from-[#0d9488] to-[#7c3aed] bg-clip-text text-transparent">
          404
        </span>
      </h1>
      <p className="text-white/50">Page not found.</p>
      <Link
        href="/"
        className="mt-4 rounded-lg border border-white/10 px-6 py-2 text-sm text-white/70 transition-colors hover:bg-white/5"
      >
        Back to Home
      </Link>
    </div>
  );
}
