// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, test } from "vitest";
import MissionModal from "../../src/components/MissionModal.jsx";

function ModalHarness() {
  const [open, setOpen] = useState(false);
  const [showExtraControl, setShowExtraControl] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>Open mission</button>
      <MissionModal open={open} title="Mission" onClose={() => setOpen(false)}>
        <button type="button">First action</button>
        <button type="button" onClick={() => setShowExtraControl(true)}>Show extra control</button>
        {showExtraControl && <button type="button">Extra action</button>}
      </MissionModal>
    </>
  );
}

describe("MissionModal", () => {
  afterEach(() => {
    cleanup();
    document.body.style.overflow = "";
  });

  test("manages focus, traps dynamically added controls, and restores the trigger on Escape", () => {
    render(<ModalHarness />);

    const trigger = screen.getByRole("button", { name: "Open mission" });
    trigger.focus();
    fireEvent.click(trigger);

    const closeButton = screen.getByRole("button", { name: "Close" });
    expect(closeButton).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(window, { key: "Tab", shiftKey: true });
    expect(screen.getByRole("button", { name: "Show extra control" })).toHaveFocus();

    fireEvent.click(screen.getByRole("button", { name: "Show extra control" }));
    screen.getByRole("button", { name: "Extra action" }).focus();
    fireEvent.keyDown(window, { key: "Tab" });
    expect(closeButton).toHaveFocus();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });
});
