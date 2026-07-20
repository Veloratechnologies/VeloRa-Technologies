import { Resend } from "resend";

export default function handler(req, res) {
  return res.status(200).json({
    envKeys: Object.keys(process.env)
      .filter((k) => k.includes("RESEND") || k.includes("NEXT"))
      .sort(),
    resend: process.env.RESEND_API_KEY ?? "NOT_FOUND",
  });
}