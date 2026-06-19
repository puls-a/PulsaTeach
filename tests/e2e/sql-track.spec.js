import { expect, test } from "@playwright/test";

test("SQL track validates a constrained PostgreSQL table", async ({ page }) => {
  await page.goto("/#/catalog");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();
  await expect(page.getByText(/SQL et PostgreSQL/).first()).toBeVisible();

  await page.goto("/#/learn/sql-postgresql/sql-foundations/sql-01-tables", {
    waitUntil: "networkidle"
  });
  await expect(page.getByRole("heading", { name: /Créer tables et types|Create tables and types/ }).first()).toBeVisible();
  await expect(page.getByText(/sql-01-tables\.sql/)).toBeVisible();

  await page.getByLabel(/Éditeur de code|Code editor/).fill(
    "create type project_visibility as enum ('private', 'team');\ncreate table projects (\n id uuid primary key default gen_random_uuid(),\n owner_id uuid not null,\n name text not null check (char_length(name) > 1),\n created_at timestamptz not null default now()\n);"
  );
  await page.getByRole("button", { name: /Lancer|Run/ }).click();
  await expect(page.getByText(/C'est validé|Passed\. XP/)).toBeVisible();
  await expect(page.getByText(/Migration PostgreSQL|PostgreSQL migration/)).toBeVisible();
});
