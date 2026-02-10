import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { spot, formData, emailTo } = body;

    // Store booking request in Firestore (backend log for admins)
    if (db) {
      try {
        const bookingsRef = collection(db, "bookings");
        await addDoc(bookingsRef, {
          spotId: spot.id,
          spotName: spot.name,
          spotLocation: spot.location,
          spotCategory: spot.category,
          spotInclusions: spot.inclusions ?? [],
          spotExclusions: spot.exclusions ?? [],
          spotItinerary: spot.itinerary ?? [],
          visitorName: formData.name,
          visitorEmail: formData.email,
          visitorPhone: formData.phone,
          visitDate: formData.date,
          preferredTime: formData.time,
          guests: formData.guests,
          message: formData.message,
          createdAt: new Date(),
          status: "pending",
          source: "masbate-today-website",
        });
      } catch (err) {
        console.error("Error saving booking to Firestore:", err);
      }
    }

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
PACKAGE INCLUSIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${(spot.inclusions && spot.inclusions.length > 0 ? spot.inclusions.join("\n") : "No inclusions specified.")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PACKAGE EXCLUSIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${(spot.exclusions && spot.exclusions.length > 0 ? spot.exclusions.join("\n") : "No exclusions specified.")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ITINERARY / SCHEDULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${(spot.itinerary && spot.itinerary.length > 0 ? spot.itinerary.join("\n") : "No itinerary provided.")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADDITIONAL MESSAGE / NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.message || "No additional message provided."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This booking request was submitted through Masbate Today Tourism Portal.
Submitted on: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    // Prepare inclusions, exclusions, and itinerary HTML
    const inclusionsHTML = spot.inclusions && spot.inclusions.length > 0
      ? spot.inclusions.map((inc: string) => `<li style="margin-bottom: 8px;">${inc}</li>`).join('')
      : '<li style="color: #6b6b6b; font-style: italic;">No inclusions specified.</li>';
    
    const exclusionsHTML = spot.exclusions && spot.exclusions.length > 0
      ? spot.exclusions.map((exc: string) => `<li style="margin-bottom: 8px;">${exc}</li>`).join('')
      : '<li style="color: #6b6b6b; font-style: italic;">No exclusions specified.</li>';
    
    const itineraryHTML = spot.itinerary && spot.itinerary.length > 0
      ? spot.itinerary.map((item: string) => `<p style="margin: 0 0 10px 0; color: #1a1a1a; font-size: 15px; line-height: 1.6;">${item}</p>`).join('')
      : '<p style="margin: 0; color: #6b6b6b; font-style: italic;">No itinerary provided.</p>';

    // Create beautiful HTML email template with Masbate Today theme
    const emailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tourism Booking Request - Masbate Today</title>
</head>
<body style="margin: 0; padding: 0; font-family: Georgia, 'Times New Roman', serif; background-color: #f5f0e8; line-height: 1.6;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f0e8; padding: 20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border: 3px solid #8b6f47; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8b6f47 0%, #5c4a37 100%); padding: 30px 40px; text-align: center; border-bottom: 4px solid #5c4a37;">
              <h1 style="margin: 0; color: #f5f0e8; font-size: 32px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase; font-family: Georgia, serif;">
                MASBATE TODAY
              </h1>
              <p style="margin: 10px 0 0 0; color: #f5f0e8; font-size: 14px; font-style: italic; letter-spacing: 2px;">
                TOURISM BOOKING REQUEST
              </p>
            </td>
          </tr>
          
          <!-- Date Stamp -->
          <tr>
            <td style="padding: 15px 40px; background-color: #f5f0e8; border-bottom: 2px solid #8b6f47;">
              <p style="margin: 0; color: #6b6b6b; font-size: 12px; text-align: right; font-style: italic;">
                ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • ${new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit' })} PHT
              </p>
            </td>
          </tr>

          <!-- Tourist Spot Information Section -->
          <tr>
            <td style="padding: 30px 40px;">
              <div style="border-left: 4px solid #8b6f47; padding-left: 20px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px 0; color: #5c4a37; font-size: 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                  📍 Tourist Spot Information
                </h2>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;"><strong>Spot Name:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;">${spot.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;"><strong>Location:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;">${spot.location}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;"><strong>Category:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;">${spot.category}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;"><strong>Rating:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;">${spot.rating}/5.0 ⭐</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;"><strong>Best Time:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;">${spot.bestTime}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;"><strong>Duration:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;">${spot.duration}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;"><strong>Price:</strong></td>
                    <td style="padding: 8px 0; color: #8b6f47; font-size: 15px; font-weight: bold;">${spot.price}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Visitor Information Section -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <div style="border-left: 4px solid #8b6f47; padding-left: 20px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px 0; color: #5c4a37; font-size: 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                  👤 Visitor Information
                </h2>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;"><strong>Full Name:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;">${formData.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;"><a href="mailto:${formData.email}" style="color: #8b6f47; text-decoration: none;">${formData.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;"><strong>Phone:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;"><a href="tel:${formData.phone}" style="color: #8b6f47; text-decoration: none;">${formData.phone}</a></td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Visit Details Section -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <div style="border-left: 4px solid #8b6f47; padding-left: 20px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px 0; color: #5c4a37; font-size: 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                  📅 Visit Details
                </h2>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;"><strong>Visit Date:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;">${formData.date}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;"><strong>Preferred Time:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;">${formData.time}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;"><strong>Number of Guests:</strong></td>
                    <td style="padding: 8px 0; color: #8b6f47; font-size: 15px; font-weight: bold;">${formData.guests}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Package Inclusions -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <div style="border-left: 4px solid #8b6f47; padding-left: 20px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px 0; color: #5c4a37; font-size: 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                  ✅ Package Inclusions
                </h2>
                <ul style="margin: 0; padding-left: 20px; color: #1a1a1a; font-size: 15px; line-height: 1.8;">
                  ${inclusionsHTML}
                </ul>
              </div>
            </td>
          </tr>

          <!-- Package Exclusions -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <div style="border-left: 4px solid #8b6f47; padding-left: 20px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px 0; color: #5c4a37; font-size: 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                  ❌ Package Exclusions
                </h2>
                <ul style="margin: 0; padding-left: 20px; color: #1a1a1a; font-size: 15px; line-height: 1.8;">
                  ${exclusionsHTML}
                </ul>
              </div>
            </td>
          </tr>

          <!-- Itinerary Section -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <div style="border-left: 4px solid #8b6f47; padding-left: 20px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px 0; color: #5c4a37; font-size: 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                  🗓️ Itinerary / Schedule
                </h2>
                <div style="background-color: #f5f0e8; padding: 20px; border-radius: 5px; border: 1px solid #e0d5c4;">
                  ${itineraryHTML}
                </div>
              </div>
            </td>
          </tr>

          <!-- Additional Message -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <div style="border-left: 4px solid #8b6f47; padding-left: 20px;">
                <h2 style="margin: 0 0 15px 0; color: #5c4a37; font-size: 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                  💬 Additional Message / Notes
                </h2>
                <div style="background-color: #f5f0e8; padding: 20px; border-radius: 5px; border: 1px solid #e0d5c4;">
                  <p style="margin: 0; color: #1a1a1a; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${formData.message || "No additional message provided."}</p>
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f5f0e8; padding: 25px 40px; border-top: 3px solid #8b6f47; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #6b6b6b; font-size: 12px; font-style: italic;">
                This booking request was submitted through
              </p>
              <p style="margin: 0; color: #8b6f47; font-size: 16px; font-weight: bold; letter-spacing: 1px;">
                MASBATE TODAY TOURISM PORTAL
              </p>
              <p style="margin: 15px 0 0 0; color: #6b6b6b; font-size: 11px;">
                Submitted on: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Manila", dateStyle: "long", timeStyle: "short" })}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    // Try to send via SMTP if configured (free method using Gmail/SMTP)
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Masbate Today Tourism" <${smtpUser}>`,
          to: emailTo,
          subject: emailSubject,
          text: emailBody,
          html: emailHTML,
        });

        return NextResponse.json({
          success: true,
          mailtoLink: null,
          message: "Booking request sent via email.",
        });
      } catch (err) {
        console.error("Error sending booking email via SMTP:", err);
        // Fall through to mailto fallback below
      }
    }

    // Fallback: return a mailto link that opens the user's email client
    const mailtoLink = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
      emailBody
    )}`;

    return NextResponse.json({
      success: true,
      mailtoLink,
      message: "Booking request prepared. Opening email client...",
    });
  } catch (error) {
    console.error("Error processing booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process booking request" },
      { status: 500 }
    );
  }
}