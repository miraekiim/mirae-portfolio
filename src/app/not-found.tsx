import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-heading text-6xl font-bold">
        <span className="text-indigo-500">
          404
        </span>
      </h1>
      <p className="text-slate-500">Page not found.</p>
      <Link
        href="/"
        className="mt-4 rounded-lg border border-slate-200 px-6 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50"
      >
        Back to Home
      </Link>
    </div>
  );
}
