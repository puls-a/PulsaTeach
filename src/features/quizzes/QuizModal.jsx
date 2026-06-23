import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function QuizModal({ titleId, locale, onClose, children }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const dialog = dialogRef.current;
    const selector = 'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    document.body.style.overflow = "hidden";
    dialog?.querySelector(selector)?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current?.();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const focusable = [...dialog.querySelectorAll(selector)];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[75] grid place-items-center bg-slate-950/60 p-2 backdrop-blur-sm sm:p-5">
      <button type="button" className="absolute inset-0 cursor-default" onClick={onClose} aria-label={locale === "fr" ? "Fermer le quiz" : "Close quiz"} />
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} className="surface relative z-10 max-h-[calc(100dvh-1rem)] w-full max-w-4xl min-w-0 overflow-y-auto overscroll-contain p-4 text-ink shadow-2xl sm:max-h-[calc(100dvh-2.5rem)] sm:p-6">
        <button type="button" onClick={onClose} className="nav-icon-button absolute right-3 top-3 z-10 bg-white" aria-label={locale === "fr" ? "Quitter le quiz" : "Exit quiz"}>
          <X className="size-5" />
        </button>
        {children}
      </section>
    </div>
  );
}
