import { expect, test } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";
import process from "node:process";
import { createLessonDraft, createModuleDraft } from "../../src/courseSchema.js";

test("real Supabase account, profile, publication and catalog flow", async ({ page, request }) => {
  test.skip(process.env.E2E_SUPABASE !== "true", "Supabase E2E secrets are not configured.");
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  test.skip(!url || !anonKey || !serviceKey, "Missing Supabase environment variables.");

  const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const anon = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const stamp = Date.now();
  const email = `ci-${stamp}@pulsateach.dev`;
  const password = `CiPassword${stamp}!`;
  let authUserId;
  let localUserId;
  let courseId;
  const browserErrors = [];
  page.on("pageerror", (error) => browserErrors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") browserErrors.push(`console: ${message.text()}`);
  });

  try {
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: { roles: ["admin", "author", "reviewer"] },
      user_metadata: { name: "CI Learner", locale: "fr" }
    });
    if (createError) throw createError;
    authUserId = created.user.id;
    localUserId = `supabase-${authUserId}`;

    await page.goto("/auth");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel(/Mot de passe|Password/).fill(password);
    await page.getByRole("button", { name: /Se connecter|Sign in/ }).last().click();
    await expect(page).toHaveURL(/\/dashboard$/);

    const { data: signedIn, error: signInError } = await anon.auth.signInWithPassword({ email, password });
    if (signInError) throw signInError;
    const headers = { Authorization: `Bearer ${signedIn.session.access_token}`, "Content-Type": "application/json" };

    const module = createModuleDraft(0);
    module.title = { fr: "Fondations CI", en: "CI Foundations" };
    module.description = { fr: "Comprendre le flux CI.", en: "Understand CI flow." };
    module.deliverable = { fr: "Une page testée", en: "A tested page" };
    const lesson = createLessonDraft("html", 0);
    lesson.title = { fr: "Première leçon CI", en: "First CI lesson" };
    lesson.brief = { fr: "Crée un titre principal.", en: "Create a main heading." };
    lesson.course.fr.introduction = "Cette leçon vérifie le catalogue dynamique de bout en bout.";
    lesson.tests = [{ type: "selector", label: "Un titre h1 est présent", value: "h1", amount: 1 }];
    module.lessons = [lesson];

    const createdCourse = await request.post("http://127.0.0.1:4190/api/courses", {
      headers,
      data: {
        title: { fr: "Formation CI dynamique", en: "Dynamic CI course" },
        description: { fr: "Formation publiée par le test réel.", en: "Course published by real test." },
        curriculum: { modules: [module] }
      }
    });
    expect(createdCourse.ok()).toBeTruthy();
    const course = await createdCourse.json();
    courseId = course.id;
    const submitted = await request.patch(`http://127.0.0.1:4190/api/courses/${course.id}`, {
      headers,
      data: { status: "review", expectedVersion: course.version }
    });
    expect(submitted.ok()).toBeTruthy();
    const submittedCourse = await submitted.json();
    const approved = await request.patch(`http://127.0.0.1:4190/api/courses/${course.id}`, {
      headers,
      data: { status: "approved", comment: "Validated by Supabase E2E", expectedVersion: submittedCourse.version }
    });
    expect(approved.ok()).toBeTruthy();
    const approvedCourse = await approved.json();
    const published = await request.patch(`http://127.0.0.1:4190/api/courses/${course.id}`, {
      headers,
      data: { status: "published", expectedVersion: approvedCourse.version }
    });
    expect(published.ok()).toBeTruthy();

    await page.goto("/studio");
    await expect(page.getByText("Formation CI dynamique").first()).toBeVisible();
    await expect(page.getByText(/Plan de cours|Course outline/)).toBeVisible();
    await page.getByText("Fondations CI").click();
    await page.getByText("Première leçon CI").click();
    await expect(page.getByText(/Éditer la leçon|Edit lesson/)).toBeVisible();
    await expect(page.getByText(/Prévisualisation apprenant|Learner preview/)).toBeVisible();

    await expect.poll(async () => {
      const catalogResponse = await request.get("http://127.0.0.1:4190/api/catalog", { headers });
      if (!catalogResponse.ok()) return false;
      const catalog = await catalogResponse.json();
      return catalog.tracks.some((track) => track.id === course.slug);
    }, {
      message: "Published course should become available through the public catalog API",
      timeout: 15_000
    }).toBe(true);

    const browserCatalogResponse = page.waitForResponse((response) =>
      response.url().includes("/api/catalog") && response.request().resourceType() === "fetch"
    );
    await page.goto("/catalog");
    const catalogResponse = await browserCatalogResponse;
    expect(catalogResponse.ok()).toBeTruthy();
    const browserCatalog = await catalogResponse.json();
    expect(browserCatalog.tracks.some((track) => track.id === course.slug)).toBe(true);
    const expectedCatalogTitle = await page.evaluate(() =>
      document.documentElement.lang === "en" ? "Dynamic CI course" : "Formation CI dynamique"
    );
    expect(browserErrors).toEqual([]);
    await expect(page.getByRole("heading", { name: /Formations disponibles|Available courses/ })).toBeVisible();
    await expect.poll(
      () => page.locator("body").innerText(),
      { message: "The published course title should be visible in the catalog" }
    ).toContain(expectedCatalogTitle);
    await page.goto(`/learn/${course.slug}/${module.id}/${lesson.id}`);
    await expect(page.getByText("Première leçon CI").first()).toBeVisible();

    const exported = await request.get("http://127.0.0.1:4190/api/account/export", { headers });
    expect(exported.ok()).toBeTruthy();
    expect((await exported.json()).account.email).toBe(email);

    const avatar = await request.post("http://127.0.0.1:4190/api/account/avatar", {
      headers,
      data: {
        dataUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9ZJ4sAAAAASUVORK5CYII="
      }
    });
    expect(avatar.ok()).toBeTruthy();
    expect((await avatar.json()).avatarUrl).toContain("/avatars/");

    const removedCourse = await request.delete(`http://127.0.0.1:4190/api/courses/${course.id}`, { headers });
    expect(removedCourse.ok()).toBeTruthy();
    courseId = null;

    const deletedAccount = await request.delete("http://127.0.0.1:4190/api/account", {
      headers,
      data: { confirmation: "DELETE" }
    });
    expect(deletedAccount.ok()).toBeTruthy();
    authUserId = null;
    localUserId = null;
  } finally {
    if (courseId) await admin.from("course_drafts").delete().eq("id", courseId);
    if (localUserId) {
      await admin.from("learning_events").delete().eq("user_id", localUserId);
      await admin.from("progress").delete().eq("user_id", localUserId);
      await admin.from("profiles").delete().eq("local_user_id", localUserId);
    }
    if (authUserId) await admin.auth.admin.deleteUser(authUserId);
  }
});
