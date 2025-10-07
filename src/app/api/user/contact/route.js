import { sendEmail } from '@/utils/sendemail';
import { generateContactEmailHTML } from '@/emails/contact';

export async function POST(request) {
  try {
    const { name, email, phone, message, newsletter } = await request.json();

    // Validate required fields
    if (!name || !email || !phone) {
      return Response.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Generate email content
    const htmlContent = generateContactEmailHTML({
      name,
      email,
      phone,
      message,
      newsletter
    });

    // Send email
    await sendEmail({
      to: process.env.EMAIL_USER, // Send to your own email
      subject: `New Contact Form Submission from ${name}`,
      html: htmlContent
    });

    return Response.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
