export function generateContactEmailHTML({
  name,
  email,
  phone,
  message,
  newsletter,
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Newsletter Subscription:</strong> ${
          newsletter ? "Yes" : "No"
        }</p>
      </div>
      
      ${
        message
          ? `
        <div style="margin: 20px 0;">
          <h3 style="color: #555;">Message:</h3>
          <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #007bff; border-radius: 3px;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `
          : ""
      }
      
      <div style="margin-top: 30px; padding: 15px; background-color: #e9ecef; border-radius: 5px;">
        <small style="color: #666;">
          This email was sent from the Derma Veritas contact form.
        </small>
      </div>
    </div>
  `;
}
