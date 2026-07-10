import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
// const resend2 = new Resend(process.env.RESEND_API_KEY);

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

<div style="background:#f8fafc;padding:40px;font-family:Arial,sans-serif;">

<div style="max-width:700px;margin:auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">

<div style="background:#2563eb;padding:30px;">
<h1 style="margin:0;color:white;">VeloRa Technologies</h1>
<p style="margin-top:8px;color:#dbeafe;">
Web Development • AI Automation • Business Solutions
</p>
</div>

<div style="padding:30px;">

<h2 style="color:#2563eb;">
🚀 New Lead Received
</h2>

<p style="color:#64748b;">
A new consultation request has been submitted through your website.
</p>

<table width="100%" style="border-collapse:collapse;margin-top:20px;">

<tr>
<td style="padding:12px;background:#f8fafc;border:1px solid #e5e7eb;font-weight:bold;">
Name
</td>

<td style="padding:12px;border:1px solid #e5e7eb;">
${name}
</td>
</tr>

<tr>
<td style="padding:12px;background:#f8fafc;border:1px solid #e5e7eb;font-weight:bold;">
Email
</td>

<td style="padding:12px;border:1px solid #e5e7eb;">
${email}
</td>
</tr>

<tr>
<td style="padding:12px;background:#f8fafc;border:1px solid #e5e7eb;font-weight:bold;">
Company
</td>

<td style="padding:12px;border:1px solid #e5e7eb;">
${company || "Not Provided"}
</td>
</tr>

<tr>
<td style="padding:12px;background:#f8fafc;border:1px solid #e5e7eb;font-weight:bold;">
Service
</td>

<td style="padding:12px;border:1px solid #e5e7eb;">
${service}
</td>
</tr>

</table>

<h3 style="margin-top:25px;color:#111827;">
Project Description
</h3>

<div style="background:#f8fafc;border:1px solid #e5e7eb;padding:20px;border-radius:10px;color:#475569;">
${message}
</div>

</div>

<div style="padding:20px;background:#111827;text-align:center;">
<p style="margin:0;color:#94a3b8;">
VeloRa Technologies • Building Digital Solutions
</p>
</div>

</div>

</div>
`
,
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