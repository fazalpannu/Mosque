import Link from "next/link";
import { API_BASE_URL } from "../../../lib/apiBaseUrl";

async function getMosque(id) {
  const res = await fetch(`${API_BASE_URL}/mosques/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function MosqueDetails({ params }) {
   const { id } = await params;
  const mosque = await getMosque(id);
  if (!mosque) {
    return (
      <main className="container">
        <p className="text-red-600">Mosque not found.</p>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="mb-6">
        <Link href="/" className="text-slate-700 underline">
          ← Back to listing
        </Link>
      </div>
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold mb-2">{mosque.name}</h1>
        <p className="text-slate-500 mb-4">{mosque.city}</p>
        <p className="mb-4">{mosque.address}</p>
        <p className="mb-2"><strong>Imam:</strong> {mosque.imam_name}</p>
        <p className="mb-2"><strong>Prayer time:</strong> {mosque.prayer_time}</p>
        <p className="text-sm text-slate-500">Created at: {new Date(mosque.created_at).toLocaleString()}</p>
      </section>
    </main>
  );
}
