import { Resend } from 'resend';

export interface ScrapeReport {
  inserted:  { model: string; category: string; url: string }[];
  updated:   { model: string; category: string; url: string; changedFields: string[] }[];
  failed:    string[];
  unchanged: number;
  error?:    string;
}

export async function sendScrapeReport(report: ScrapeReport): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to     = process.env.REPORT_EMAIL;

  if (!apiKey || !to) {
    console.warn('  Email skipped: RESEND_API_KEY or REPORT_EMAIL not set');
    return;
  }

  const resend  = new Resend(apiKey);
  const date    = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const isError = !!report.error;

  const subject = isError
    ? `⚠️ Avision Scrape FAILED — ${date}`
    : `Avision Scrape — ${date} | +${report.inserted.length} ~${report.updated.length} ✗${report.failed.length}`;

  const html = buildHtml(report, date);

  const { error } = await resend.emails.send({
    from:    'Avision Scraper <onboarding@resend.dev>',
    to,
    subject,
    html,
  });

  if (error) {
    console.error('  Email send failed:', error.message);
  } else {
    console.log(`  Email report sent to ${to}`);
  }
}

// ─── HTML builder ─────────────────────────────────────────────────────────────

function buildHtml(report: ScrapeReport, date: string): string {
  const sections: string[] = [];

  // Summary table
  sections.push(`
    <table style="border-collapse:collapse;margin-bottom:24px">
      <tr>
        <td style="${td}background:#d1fae5;color:#065f46">Inserted</td>
        <td style="${tdVal}">${report.inserted.length}</td>
      </tr>
      <tr>
        <td style="${td}background:#dbeafe;color:#1e40af">Updated</td>
        <td style="${tdVal}">${report.updated.length}</td>
      </tr>
      <tr>
        <td style="${td}background:#f3f4f6;color:#374151">Unchanged</td>
        <td style="${tdVal}">${report.unchanged}</td>
      </tr>
      <tr>
        <td style="${td}background:#fee2e2;color:#991b1b">Failed</td>
        <td style="${tdVal}">${report.failed.length}</td>
      </tr>
    </table>
  `);

  if (report.error) {
    sections.push(section('Fatal Error', `<pre style="background:#1f2937;color:#f9fafb;padding:16px;border-radius:6px;overflow:auto;font-size:12px">${esc(report.error)}</pre>`));
  }

  if (report.inserted.length > 0) {
    const rows = report.inserted.map(p =>
      `<li style="margin:4px 0"><a href="${p.url}" style="color:#1d4ed8">${esc(p.model)}</a> <span style="color:#6b7280">(${esc(p.category)})</span></li>`
    ).join('');
    sections.push(section('Inserted Products', `<ul style="margin:0;padding-left:20px">${rows}</ul>`));
  }

  if (report.updated.length > 0) {
    const rows = report.updated.map(p =>
      `<li style="margin:4px 0"><a href="${p.url}" style="color:#1d4ed8">${esc(p.model)}</a> <span style="color:#6b7280">(${esc(p.category)})</span> — <span style="color:#92400e">${p.changedFields.join(', ')}</span></li>`
    ).join('');
    sections.push(section('Updated Products', `<ul style="margin:0;padding-left:20px">${rows}</ul>`));
  }

  if (report.failed.length > 0) {
    const rows = report.failed.map(u =>
      `<li style="margin:4px 0"><a href="${u}" style="color:#dc2626">${esc(u)}</a></li>`
    ).join('');
    sections.push(section('Failed URLs', `<ul style="margin:0;padding-left:20px">${rows}</ul>`));
  }

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;color:#111;max-width:680px;margin:0 auto;padding:24px">
    <h2 style="margin-top:0">Avision Scrape Report</h2>
    <p style="color:#6b7280;margin-top:-12px">${date}</p>
    ${sections.join('\n')}
    <p style="color:#9ca3af;font-size:12px;margin-top:32px">avision-labs scraper</p>
  </body></html>`;
}

function section(title: string, content: string): string {
  return `<div style="margin-bottom:24px">
    <h3 style="margin:0 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.05em;color:#374151">${title}</h3>
    ${content}
  </div>`;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const td    = 'padding:6px 12px;font-weight:600;border-radius:4px;';
const tdVal = 'padding:6px 16px;font-size:18px;font-weight:700;';
