export function Field({ label, value, onChange, required = false }) {
  return <label className="grid gap-2 text-sm font-semibold text-slate-700">{label}<input required={required} value={value} onChange={(event) => onChange(event.target.value)} className="form-control" /></label>;
}

export function SelectField({ label, value, onChange, options }) {
  return <label className="grid gap-2 text-sm font-semibold text-slate-700">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="form-control">{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

export function TextAreaField({ label, value, onChange }) {
  return <label className="grid gap-2 text-sm font-semibold text-slate-700">{label}<textarea value={value} onChange={(event) => onChange(event.target.value)} className="form-control min-h-28 py-3" /></label>;
}
