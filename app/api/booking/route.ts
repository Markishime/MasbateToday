import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { spot, formData, emailTo } = body;

    // Create email content
    const emailSubject = `Tourism Booking Request: ${spot.name}`;
    const emailBody = `
New Tourist Spot Booking Request

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOURIST SPOT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Spot Name: ${spot.name}
Location: ${spot.location}
Category: ${spot.category}
Rating: ${spot.rating}/5.0
Best Time: ${spot.bestTime}
Duration: ${spot.duration}
Price: ${spot.price}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VISITOR INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VISIT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Visit Date: ${formData.date}
Preferred Time: ${formData.time}
Number of Guests: ${formData.guests}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADDITIONAL MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.message || 'No additional message provided.'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This booking request was submitted through Masbate Today Tourism Portal.
Submitted on: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    // For now, we'll return a mailto link
    // In production, you should integrate with:
    // - Resend (recommended for Next.js)
    // - SendGrid
    // - Nodemailer with SMTP
    // - EmailJS
    
    const mailtoLink = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    return NextResponse.json({
      success: true,
      mailtoLink,
      message: 'Booking request prepared. Opening email client...'
    });
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process booking request' },
      { status: 500 }
    );
  }
}