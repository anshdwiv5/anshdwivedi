import { supabaseAdmin } from "@/integrations/supabase/client.server";

const NOTIFY_TO = "anshdwiv5@gmail.com";

export async function sendResumeRequest(email: string) {
  const timestamp = new Date().toISOString();

  // 1. Persist request
  const { error: insertError } = await supabaseAdmin
    .from("resume_requests")
    .insert({ email });

  if (insertError) {
    console.error("resume_requests insert failed", insertError);
    throw new Error("Could not save your request. Please try again.");
  }

  // 2. Notify Ansh via Resend
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured; skipping notification email");
    return { ok: true, emailed: false };
  }

  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;color:#0F0E47;line-height:1.6">
      <h2 style="margin:0 0 12px;color:#272757">New résumé request</h2>
      <p style="margin:0 0 8px"><strong>From:</strong> ${escapeHtml(email)}</p>
      <p style="margin:0 0 8px"><strong>When:</strong> ${escapeHtml(timestamp)}</p>
      <p style="margin:24px 0 0;color:#505081;font-size:13px">
        Sent automatically from anshdwivedi.com
      </p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Ansh's Site <onboarding@resend.dev>",
        to: [NOTIFY_TO],
        reply_to: email,
        subject: `Résumé request from ${email}`,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Resend send failed", res.status, text);
      return { ok: true, emailed: false };
    }
  } catch (err) {
    console.error("Resend request errored", err);
    return { ok: true, emailed: false };
  }

  return { ok: true, emailed: true };
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&"
      ? "&amp;"
      : c === "<"
        ? "&lt;"
        : c === ">"
          ? "&gt;"
          : c === '"'
            ? "&quot;"
            : "&#39;",
  );
}