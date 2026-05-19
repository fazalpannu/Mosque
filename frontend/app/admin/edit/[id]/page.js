"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import api from "../../../../services/api";
import { getAuthToken } from "../../../../utils/auth";

export default function EditMosquePage({ params }) {
  const { id } = use(params);
  const [form, setForm] = useState({ name: "", city: "", address: "", imam_name: "", prayer_time: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push("/login");
      return;
    }

    api.get(`/mosques/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setForm(res.data))
      .catch(() => setError("Unable to load mosque details."));
  }, [id, router]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const token = getAuthToken();
    if (!token) {
      router.push("/login");
      return;
    }
     
    try {
      await api.put(`/mosques/${id}`, form, { headers: { Authorization: `Bearer ${token}` } });
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Unable to update mosque.");
    }
  }

  return (
    <main className="container">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-10 shadow-lg">
        <h1 className="text-3xl font-semibold mb-6">Edit Mosque</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "name", label: "Name" },
            { name: "city", label: "City" },
            { name: "address", label: "Address" },
            { name: "imam_name", label: "Imam Name" },
            { name: "prayer_time", label: "Prayer Time" },
          ].map((field) => (
            <div key={field.name}>
              <label className="mb-2 block text-sm font-medium text-slate-700">{field.label}</label>
              <input
                value={form[field.name] || ""}
                onChange={(event) => setForm({ ...form, [field.name]: event.target.value })}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                required
              />
            </div>
          ))}

          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="rounded-2xl bg-slate-900 px-5 py-3 text-white">
              Update Mosque
            </button>
            <button type="button" onClick={() => router.push("/admin/dashboard")} className="rounded-2xl border border-slate-300 px-5 py-3 text-slate-900">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
