export function generateAppointmentEmailHTML(appointmentData) {
  const {
    appointmentNumber,
    name,
    email,
    phone,
    treatment,
    treatmentDetails,
    preferredDate,
    additionalInfo,
    referralCodeUsed,
    referrerReward,
    userDiscount,
    originalPrice,
    finalPrice,
    createdAt,
  } = appointmentData;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        New Appointment Booked
      </h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Client Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate}</p>
        <p><strong>Treatment:</strong> ${
          treatmentDetails?.treatmentName || treatment
        }</p>
        ${
          treatmentDetails?.optionName
            ? `<p><strong>Option:</strong> ${treatmentDetails.optionName}</p>`
            : ""
        }
        ${
          treatmentDetails?.optionPrice
            ? `<p><strong>Price:</strong> ${treatmentDetails.optionPrice}</p>`
            : ""
        }
        ${
          originalPrice
            ? `<p><strong>Original Price:</strong> £${originalPrice}</p>`
            : ""
        }
        ${
          finalPrice && finalPrice !== originalPrice
            ? `<p><strong>Final Price (after discount):</strong> £${finalPrice}</p>`
            : ""
        }
        ${
          referralCodeUsed
            ? `<p><strong>Referral Code Used:</strong> ${referralCodeUsed}</p>`
            : ""
        }
        ${
          referrerReward
            ? `<p><strong>Referrer Reward:</strong> £${referrerReward}</p>`
            : ""
        }
        ${
          userDiscount
            ? `<p><strong>User Discount:</strong> £${userDiscount}</p>`
            : ""
        }
        <p><strong>Booked At:</strong> ${
          createdAt?.toDate?.()
            ? createdAt.toDate().toLocaleString()
            : createdAt
        }</p>
      </div>
      
      ${
        additionalInfo
          ? `
        <div style="margin: 20px 0;">
          <h3 style="color: #555;">Additional Information:</h3>
          <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #007bff; border-radius: 3px;">
            ${additionalInfo.replace(/\n/g, "<br>")}
          </div>
        </div>
      `
          : ""
      }
      
      <div style="margin-top: 30px; padding: 15px; background-color: #e9ecef; border-radius: 5px;">
        <small style="color: #666;">
          This is an automated notification. Please check the admin dashboard for full details and to manage this appointment.
        </small>
      </div>
    </div>
  `;
}
