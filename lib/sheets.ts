// lib/sheets.ts
import { JWT } from "google-auth-library";

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function getJwtClient() {
  const email = mustEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const keyRaw = mustEnv("GOOGLE_PRIVATE_KEY");
  const key = keyRaw.replace(/\\n/g, "\n");

  return new JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export type SheetsRow = Array<string | number | boolean | null>;

export async function appendRowToSheet(row: SheetsRow) {
  const sheetId = mustEnv("GOOGLE_SHEET_ID");
  const tab = process.env.GOOGLE_SHEET_TAB || "Form Responses";

  const jwt = getJwtClient();
  const accessToken = (await jwt.getAccessToken())?.token;
  if (!accessToken) throw new Error("Failed to get Google access token");

  const range = encodeURIComponent(`${tab}!A1`);
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append` +
    `?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [row],
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Sheets append failed (${res.status}): ${text}`);
  }

  return true;
}
