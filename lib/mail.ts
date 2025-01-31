import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;
const fromEmail = "mail@kittyat.me";
const brandColor = "#6366f1";
const brandLight = "#e0e7ff";

const generateEmailHtml = (content: string, subject: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body { 
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; 
            line-height: 1.6; 
            color: #1e293b;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, ${brandColor}, #4f46e5);
            padding: 2rem;
            text-align: center;
        }
        .logo {
            height: 40px;
            margin-bottom: 1rem;
        }
        .brand-text {
            color: white;
            font-size: 1.5rem;
            font-weight: 600;
            letter-spacing: -0.025em;
        }
        .content {
            padding: 2rem;
        }
        h2 {
            color: ${brandColor};
            margin-top: 0;
            font-size: 1.5rem;
        }
        .button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: ${brandColor};
            color: white !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            transition: transform 0.1s ease, box-shadow 0.1s ease;
            margin: 1rem 0;
        }
        .button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);
        }
        .code {
            font-family: 'Courier New', monospace;
            font-size: 1.5rem;
            letter-spacing: 0.1em;
            padding: 1rem;
            background: ${brandLight};
            border-radius: 8px;
            margin: 1.5rem 0;
            text-align: center;
        }
        .footer {
            padding: 1.5rem;
            background: #f1f5f9;
            text-align: center;
            font-size: 0.875rem;
            color: #64748b;
        }
        .disclaimer {
            margin: 1.5rem 0;
            padding: 1rem;
            background: #fff4f2;
            border-radius: 8px;
            color: #dc2626;
            font-size: 0.875rem;
        }
        .link {
            color: ${brandColor};
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="brand-text">Kittyat.me</div>
        </div>
        
        <div class="content">
            ${content}
        </div>

        <div class="footer">
            <p>Need help? <a href="mailto:support@kittyat.me" class="link">Contact our support team</a></p>
            <p>© ${new Date().getFullYear()} Kittyat.me. All rights reserved.</p>
            <div style="margin-top: 1rem;">
                <a href="${domain}" class="link" style="margin: 0 8px;">Home</a>
                <a href="${domain}/privacy" class="link" style="margin: 0 8px;">Privacy</a>
                <a href="${domain}/terms" class="link" style="margin: 0 8px;">Terms</a>
            </div>
        </div>
    </div>
</body>
</html>
`;

const icon = (name: string) => 
  `<svg style="width:18px;height:18px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <!-- Add your icons here or use Font Awesome -->
  </svg>`;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const content = `
    <h2>🔐 Two-Factor Authentication Code</h2>
    <p>Hello there,</p>
    <p>Your verification code is:</p>
    <div class="code">${token}</div>
    <p>This code will expire in <strong>10 minutes</strong>.</p>
    <div class="disclaimer">
        <strong>Security Tip:</strong> Never share this code with anyone, including Kittyat.me staff.
    </div>
  `;
  
  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "🔑 Your 2FA Code - Kittyat.me",
    html: generateEmailHtml(content, "Two-Factor Authentication"),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  const content = `
    <h2>🔄 Reset Your Password</h2>
    <p>We received a request to reset your password. Click the button below to securely update your password:</p>
    <a href="${resetLink}" class="button">
        ${icon('lock')}
        Reset Password
    </a>
    <p>Or copy this link to your browser:</p>
    <p style="word-break: break-all; color: ${brandColor};">${resetLink}</p>
    <div class="disclaimer">
        <strong>Note:</strong> This link will expire in 1 hour. If you didn't request this, please ignore this email.
    </div>
  `;

  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "🔓 Password Reset Request - Kittyat.me",
    html: generateEmailHtml(content, "Password Reset"),
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const content = `
    <h2>🎉 Welcome to KittyAt!</h2>
    <p>Thank you for signing up! Let's get your email verified:</p>
    <a href="${confirmLink}" class="button">
        ${icon('verify')}
        Verify Email Address
    </a>
    <p>Or copy this link to your browser:</p>
    <p style="word-break: break-all; color: ${brandColor};">${confirmLink}</p>
    <p>Once verified, you'll have full access to your account.</p>
    <div class="disclaimer">
        <strong>Can't click the button?</strong> Make sure you're using a modern browser and that your email client supports HTML emails.
    </div>
  `;

  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "✨ Confirm Your Email - Kittyat.me",
    html: generateEmailHtml(content, "Email Verification"),
  });
};