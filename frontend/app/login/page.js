"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";
import { setAuthToken } from "../../utils/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    try {
      const response = await api.post("/auth/login", { email, password });
     console.log("Login  response:", response.data);
      setAuthToken(response.data.access_token);
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  }

  return (
    <main className="container">
      <div className="mx-auto max-w-lg rounded-3xl bg-white p-10 shadow-lg">
        <h1 className="text-3xl font-semibold mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
