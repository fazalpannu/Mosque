import Link from "next/link";

export default function MosqueCard({ mosque }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">{mosque.name}</h2>
          <p className="text-sm text-slate-500">{mosque.city}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{mosque.prayer_time}</span>
      </div>
      <p className="text-slate-700 mb-4">{mosque.address}</p>
      <p className="text-sm text-slate-600 mb-4">Imam: {mosque.imam_name}</p>
      <Link href={`/mosques/${mosque.id}`} className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
        View details
      </Link>
    </article>
  );
}
