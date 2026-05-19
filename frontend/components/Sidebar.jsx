export default function Sidebar() {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Admin Menu</h2>
      <ul className="space-y-3 text-slate-700">
        <li>Add mosque</li>
        <li>Edit mosque</li>
        <li>Delete mosque</li>
      </ul>
    </aside>
  );
}
