import emailjs from '@emailjs/browser';

// 1. REPLACE THESE WITH YOUR ACTUAL KEYS FROM EMAILJS DASHBOARD
const SERVICE_ID = 'service_2imprs3';
const TEMPLATE_ID_ADMIN = 'template_76q0yua'; // Email to sorahul54
const TEMPLATE_ID_USER = 'template_3ztuz6h';   // Email to the User
const PUBLIC_KEY = 'GiI0L6ZTLWAswotWk';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const submitContactForm = async (data: ContactFormData) => {
  try {
    // --- EMAIL 1: Notify You (Admin) ---
    // This sends details TO sorahul54@gmail.com
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_ADMIN,
      {
        from_name: data.name,
        from_email: data.email, // The user's email
        subject: data.subject,
        message: data.message,
      },
      PUBLIC_KEY
    );

    const COOLDOWN_TIME = 2 * 60 * 1000; // 2 minutes in milliseconds
    const lastSent = localStorage.getItem('email_sent_at');
    const now = Date.now();

    const lastSentTimestamp = lastSent ? Number(lastSent) : 0;

    if (lastSent && (now - lastSentTimestamp < COOLDOWN_TIME)) {
      const remainingTime = Math.ceil((COOLDOWN_TIME - (now - lastSentTimestamp)) / 1000);
      alert(`Please wait ${remainingTime} seconds before sending another message.`);
      return;
    }

    // --- EMAIL 2: Auto-Reply to User ---
    // This sends a "Thank You" TO the user's email
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_USER,
      {
        to_name: data.name,
        to_email: data.email, // We send this TO the user
        original_subject: data.subject,
      },
      PUBLIC_KEY
    );

    return { success: true };
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw new Error('Failed to transmit message through the Grand Line.');
  }
};