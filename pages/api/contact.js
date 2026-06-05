import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  try {
    const { name, email, company, service, message } = req.body;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "akashwork0252@gmail.com",

      subject: `New Lead - ${service}`,

      html: `
        <h2>New Lead Received</h2>

        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return res.status(200).json({
      success: true,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
    });
  }
}