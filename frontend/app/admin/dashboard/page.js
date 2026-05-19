"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../services/api";
import { clearAuthToken, getAuthToken } from "../../../utils/auth";

export default function AdminDashboard() {
  const [mosques, setMosques] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push("/login");
      return;
    }

    api.get("/mosques", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setMosques(res.data))
      .catch(() => setError("Unable to load mosques."));
  }, [router]);

  function handleLogout() {
    clearAuthToken();
    router.push("/login");
  }

  async function deleteMosque(id) {
    const token = getAuthToken();
    if (!token) return;

    try {
      await api.delete(`/mosques/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setMosques((current) => current.filter((mosque) => mosque.id !== id));
    } catch (err) {
      setError("Failed to remove mosque.");
    }
  }

  return (
    <main className="container">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <p className="text-slate-600">Manage mosque listings and update details.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => router.push("/admin/add-mosque")} className="rounded-2xl bg-slate-900 px-4 py-3 text-white">
            Add Mosque
          </button>
          <button onClick={handleLogout} className="rounded-2xl border border-slate-300 px-4 py-3 text-slate-900">
            Sign out
          </button>
        </div>
      </div>

      {error && <p className="mb-4 rounded-2xl bg-red-50 p-4 text-red-700">{error}</p>}

      <div className="space-y-4">
        {mosques.length ? (
          mosques.map((mosque) => (
            <article key={mosque.id} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
                <div>
                  <h2 className="text-2xl font-semibold">{mosque.name}</h2>
                  <p className="text-slate-600">{mosque.city}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => router.push(`/admin/edit/${mosque.id}`)} className="rounded-2xl bg-slate-900 px-4 py-2 text-white">
                    Edit
                  </button>
                  <button onClick={() => deleteMosque(mosque.id)} className="rounded-2xl border border-red-300 px-4 py-2 text-red-700">
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p className="rounded-3xl bg-white p-6 shadow-sm">No mosques available.</p>
        )}
      </div>
    </main>
  );
}
