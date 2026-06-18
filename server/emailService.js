const resendApiKey = process.env.RESEND_API_KEY;
const emailFrom = process.env.PULSATEACH_EMAIL_FROM || "PulsaTeach <onboarding@resend.dev>";

export const transactionalEmailEnabled = Boolean(resendApiKey && emailFrom);

export async function sendWelcomeEmail({ email, displayName, locale = "fr" }) {
  if (!transactionalEmailEnabled || !email) return { skipped: true };
  const fr = locale === "fr";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: emailFrom,
      to: [email],
      subject: fr ? "Ton parcours PulsaTeach est prêt" : "Your PulsaTeach path is ready",
      html: welcomeTemplate({ displayName, fr })
    })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || `Resend ${response.status}`);
  return payload;
}

function welcomeTemplate({ displayName, fr }) {
  const name = escapeHtml(displayName || (fr ? "apprenant" : "learner"));
  return `<!doctype html>
<html lang="${fr ? "fr" : "en"}">
  <body style="margin:0;background:#eef2ff;font-family:Arial,sans-serif;color:#172033">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 16px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#fff;border:1px solid #dbe3f0;border-radius:20px;overflow:hidden">
          <tr><td style="padding:24px 28px;background:#4f46e5;color:#fff;font-size:24px;font-weight:700">PulsaTeach</td></tr>
          <tr><td style="padding:32px 28px">
            <p style="margin:0 0 10px;color:#4f46e5;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em">${fr ? "Bienvenue" : "Welcome"}</p>
            <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2">${fr ? `Ton parcours est prêt, ${name}` : `Your path is ready, ${name}`}</h1>
            <p style="margin:0 0 24px;color:#526075;font-size:16px;line-height:1.7">${fr ? "Tes préférences sont enregistrées. Commence par la prochaine leçon recommandée et avance à ton rythme." : "Your preferences are saved. Start with the recommended lesson and learn at your own pace."}</p>
            <a href="https://pulsateach.vercel.app/#/path" style="display:inline-block;padding:14px 22px;border-radius:12px;background:#22c55e;color:#fff;text-decoration:none;font-weight:700">${fr ? "Voir mon parcours" : "View my path"}</a>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}
