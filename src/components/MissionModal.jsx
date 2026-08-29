import { useEffect, useRef } from "react";
import { X } from "lucide-react";

let bodyScrollLockCount = 0;
let previousBodyOverflow = "";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[contenteditable='true']"
].join(", ");

function lockBodyScroll() {
  if (bodyScrollLockCount === 0) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  bodyScrollLockCount += 1;
}

function unlockBodyScroll() {
  bodyScrollLockCount -= 1;
  if (bodyScrollLockCount === 0) document.body.style.overflow = previousBodyOverflow;
}

export default function MissionModal({ open, title, children, onClose, closeLabel = "Close" }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);
  const onCloseRef = useRef(onClose);

  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;

    returnFocusRef.current = document.activeElement;
    lockBodyScroll();
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      // Query on every Tab so controls rendered while the modal is open are included.
      const focusableElements = Array.from(dialogRef.current?.querySelectorAll(focusableSelector) ?? [])
        .filter((element) => element.getAttribute("aria-hidden") !== "true" && element.tabIndex >= 0);

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      unlockBodyScroll();
      if (returnFocusRef.current instanceof HTMLElement && document.contains(returnFocusRef.current)) {
        returnFocusRef.current.focus();
      }
    };
  }, [open]);

  if (!open) return null;

  return (
    <div ref={dialogRef} tabIndex={-1} className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/55 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={title} onMouseDown={onClose}>
      <div className="max-h-[86vh] w-full max-w-2xl overflow-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-display text-3xl font-bold">{title}</h2>
          <button ref={closeButtonRef} type="button" onClick={onClose} className="nav-icon-button" aria-label={closeLabel}>
            <X className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
