import { X } from "lucide-react";

export default function MissionModal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/55 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={title}>
      <div className="max-h-[86vh] w-full max-w-2xl overflow-auto rounded-[28px] bg-white p-5 clay">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-display text-3xl font-bold">{title}</h2>
          <button type="button" onClick={onClose} className="grid size-11 place-items-center rounded-2xl bg-cloud shadow-clayPressed" aria-label="Close">
            <X className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
