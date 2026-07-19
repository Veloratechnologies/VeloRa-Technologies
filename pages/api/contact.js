import { Resend } from "resend";

export default async function handler(req, res) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    return res.status(200).json({
      success: true,
      hasKey: !!process.env.RESEND_API_KEY,
      keyStart: process.env.RESEND_API_KEY?.substring(0, 6),
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}