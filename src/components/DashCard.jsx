export default function DashCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 grid size-9 place-items-center rounded-lg bg-indigo-50 text-indigoPop"><Icon className="size-5" /></div>
      <p className="font-display text-2xl font-bold text-ink">{value}</p>
      <p className="mt-1 text-sm font-semibold text-slate-500">{label}</p>
    </div>
  );
}
