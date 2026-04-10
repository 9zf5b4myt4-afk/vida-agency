"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitProject(formData: FormData) {
  // Extract all fields
  const projectType = formData.get("projectType") as string;
  const currency = formData.get("currency") as string;
  const budget = formData.get("budget") as string;
  const clientType = formData.get("clientType") as string;
  const businessStatus = formData.get("businessStatus") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const details = formData.get("details") as string;

  if (!name || !email || !projectType) {
    return { success: false, error: "Missing required fields." };
  }

  // STEP 1: SAVE TO VIDA SYSTEMS DATABASE
  try {
    const dbUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://api.vidasystems.agency";
    const dbResponse = await fetch(`${dbUrl}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone: phone || "",
        projectType,
        budget: `${currency} ${budget}`, // e.g., "NGN 15M - 35M"
        clientType,
        businessStatus,
        details,
      }),
    });

    if (!dbResponse.ok) {
      console.error("Payload CMS Error:", await dbResponse.text());
      // We log the error, but we intentionally don't "return" here 
      // so that if the DB is down, it still attempts to send you the email!
    }
  } catch (dbError) {
    console.error("Database Connection Error:", dbError);
  }

  // STEP 2: SEND EMAIL NOTIFICATION
  try {
    const { error } = await resend.emails.send({
      from: "Vida Agency <onboarding@resend.dev>", 
      to: ["ukpabigodswill3@gmail.com"], 
      subject: `New Lead: ${projectType} from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 40px; border-radius: 12px; border: 1px solid #e5e7eb;">
          <h2 style="color: #111827; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 16px;">New Project Initiation</h2>
          
          <div style="margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <p style="margin-bottom: 6px; font-size: 12px; color: #6b7280; text-transform: uppercase;">Contact Info</p>
              <p style="margin: 0 0 8px 0; color: #111827;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 0 0 8px 0; color: #111827;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 0 0 8px 0; color: #111827;"><strong>Phone:</strong> ${phone}</p>
            </div>
            <div>
              <p style="margin-bottom: 6px; font-size: 12px; color: #6b7280; text-transform: uppercase;">Client Profile</p>
              <p style="margin: 0 0 8px 0; color: #111827;"><strong>Type:</strong> ${clientType}</p>
              <p style="margin: 0 0 8px 0; color: #111827;"><strong>Status:</strong> ${businessStatus}</p>
            </div>
          </div>

          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
            <p style="margin-bottom: 6px; font-size: 12px; color: #6b7280; text-transform: uppercase;">Project Scope</p>
            <p style="margin: 0 0 12px 0; color: #111827;"><strong>Objective:</strong> ${projectType}</p>
            <p style="margin: 0 0 12px 0; color: #111827;"><strong>Estimated Budget:</strong> <span style="background-color: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${currency} ${budget}</span></p>
          </div>

          <div style="margin-top: 24px; background-color: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h3 style="color: #111827; margin-top: 0; margin-bottom: 12px; font-size: 14px; text-transform: uppercase;">Project Brief:</h3>
            <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap; margin: 0;">${details}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: "Failed to send email." };
    }

    return { success: true };
  } catch (error) {
    console.error("Server Error:", error);
    return { success: false, error: "Internal server error." };
  }
}