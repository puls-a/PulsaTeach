import { expect, test } from "@playwright/test";

const arenas = [
  {
    name: "Flexbox Arena",
    route: "/flexbox-arena",
    validate: /Valider|Validate/
  },
  {
    name: "JavaScript Arena",
    route: "/js-arena",
    validate: /Tester|Run tests/
  }
];

for (const arena of arenas) {
  test(`${arena.name} stays actionable and within the viewport`, async ({ page }, testInfo) => {
    await page.goto(arena.route, { waitUntil: "networkidle" });
    await dismissConsent(page);

    await expect(page.getByRole("heading", { level: 1, name: arena.name })).toBeVisible();
    const lab = page.locator("section.lab-shell");
    const validate = page.getByRole("button", { name: arena.validate }).first();
    const editor = page.getByRole("textbox", { name: /Code CSS de mission|CSS mission code|Code JavaScript de mission|JavaScript mission code/ });

    await expect(lab).toBeVisible();
    await expect(validate).toBeVisible();
    await expect(editor).toBeVisible();

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    }));
    expect(dimensions.scrollWidth, `${arena.route} should not horizontally overflow`).toBeLessThanOrEqual(dimensions.clientWidth);

    const panels = lab.locator(":scope > div > div");
    await expect(panels).toHaveCount(2);
    const [editorPanel, previewPanel] = await Promise.all([panels.nth(0).boundingBox(), panels.nth(1).boundingBox()]);
    expect(editorPanel).not.toBeNull();
    expect(previewPanel).not.toBeNull();

    if (testInfo.project.name === "mobile-chromium") {
      expect(previewPanel.y).toBeGreaterThan(editorPanel.y);
    } else {
      expect(previewPanel.x).toBeGreaterThan(editorPanel.x);
      expect(Math.abs(previewPanel.y - editorPanel.y)).toBeLessThanOrEqual(1);
    }
  });

  test(`${arena.name} mission modal closes with Escape and restores its trigger focus`, async ({ page }) => {
    await page.goto(arena.route, { waitUntil: "networkidle" });
    await dismissConsent(page);

    const trigger = page.getByRole("button", { name: "Mission" });
    await trigger.focus();
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: arena.name });
    await expect(dialog).toBeVisible();
    const closeButton = dialog.getByRole("button", { name: /Fermer|Close/ });
    await closeButton.focus();
    await expect(closeButton).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });
}

async function dismissConsent(page) {
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();
}
