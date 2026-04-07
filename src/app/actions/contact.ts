"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitProject(formData: FormData) {
  const projectType = formData.get("projectType") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email || !projectType) {
    return { success: false, error: "All fields are required." };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Vida Agency <onboarding@resend.dev>", // Resend's default testing address
      to: ["ukpabigodswill3@gmail.com"], // PUT YOUR ACTUAL EMAIL HERE
      subject: `New Lead: ${projectType} from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Project Initiation</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project Type:</strong> ${projectType}</p>
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