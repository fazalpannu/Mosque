import MosqueCard from "../components/MosqueCard";

async function getMosques() {
  const res = await fetch("http://127.0.0.1:8000/mosques", { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const mosques = await getMosques();

  return (
    <main className="container">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Mosque Finder</h1>
        <p className="text-slate-600">Browse mosques and see details for each location.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {mosques.length ? (
          mosques.map((mosque) => <MosqueCard key={mosque.id} mosque={mosque} />)
        ) : (
          <p>No mosques found yet.</p>
        )}
      </div>
    </main>
  );
}
