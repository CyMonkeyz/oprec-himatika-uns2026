// lib/drive.ts
import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { Readable } from "node:stream";

const DRIVE_SCOPES = ["https://www.googleapis.com/auth/drive.file"];

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function getJwtClient() {
  const email = mustEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const keyRaw = mustEnv("GOOGLE_PRIVATE_KEY");
  const keyWithNewlines = keyRaw.replace(/\\n/g, "\n");
  const key =
    keyWithNewlines.includes("-----BEGIN")
      ? keyWithNewlines
      : /^[A-Za-z0-9+/=\n\r]+$/.test(keyWithNewlines)
        ? Buffer.from(keyWithNewlines, "base64").toString("utf-8")
        : keyWithNewlines;

  return new JWT({
    email,
    key,
    scopes: DRIVE_SCOPES,
  });
}

export function getDriveClient() {
  const auth = getJwtClient();
  return google.drive({ version: "v3", auth });
}

export function sanitizeBaseName(name: string) {
  const cleaned = (name || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s-_]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned || "Tanpa Nama";
}

export function getImageExt(mime: string) {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  return "";
}

export async function uploadImageToDrive(params: {
  file: File;
  folderId: string;
  name: string;
}) {
  const drive = getDriveClient();
  const buffer = Buffer.from(await params.file.arrayBuffer());
  const stream = Readable.from(buffer);

  const res = await drive.files.create({
    requestBody: {
      name: params.name,
      parents: [params.folderId],
    },
    media: {
      mimeType: params.file.type,
      body: stream,
    },
    fields: "id, webViewLink, name, size",
    supportsAllDrives: true,
  });

  return res.data;
}

export function parseDriveError(err: any) {
  const status = err?.response?.status || 500;
  const data = err?.response?.data?.error;
  const reason = data?.errors?.[0]?.reason || err?.errors?.[0]?.reason;
  const message = data?.message || err?.message || "Upload gagal";

  if (reason === "storageQuotaExceeded") {
    return {
      status: 507,
      code: reason,
      message:
        "Penyimpanan Google Drive penuh. Coba pindahkan folder ke Shared Drive atau gunakan OAuth dengan akun Drive yang punya kuota cukup.",
    };
  }

  if (status === 403) {
    return {
      status,
      code: reason || "forbidden",
      message:
        "Akses Drive ditolak. Pastikan folder sudah dibagikan ke service account dan izin Editor sudah benar.",
    };
  }

  if (status === 429) {
    return {
      status,
      code: reason || "rateLimit",
      message: "Terlalu banyak request ke Drive. Coba lagi sebentar ya.",
    };
  }

  return {
    status: status >= 400 ? status : 500,
    code: reason || "upload_failed",
    message,
  };
}
