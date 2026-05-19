import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white py-4">
      <div className="container flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-xl font-semibold text-slate-900">
          Mosque Finder
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-slate-700 hover:text-slate-900">
            Admin login
          </Link>
        </div>
      </div>
    </nav>
  );
}
