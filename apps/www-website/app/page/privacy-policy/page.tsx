import Hr from "@shared/components/ui/Hr";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Anix Lab (formerly Anix7) collects, uses, stores, and protects your data. Your privacy is important to us.",
  keywords: [
    "Anix Lab privacy policy",
    "Anix Lab data protection",
    "user information",
    "data usage",
    "cookie policy",
    "user rights",
    "privacy practices",
    "data security",
    "personal information",
    "Anix Lab (formerly Anix7)",
  ],
  alternates: { canonical: "/page/privacy-policy" },
  addToSitemap: true,
};

export default function PrivacyPolicy() {
  return (
    <>
      <h1>
        <strong>Privacy Policy</strong>
      </h1>

      <p className="my-1 ml-1">
        <strong>Effective Date:</strong> 06 July 2025
      </p>

      <p className="my-1 ml-1">
        At <strong>Anix Lab</strong> (formerly Anix7), accessible via{" "}
        <Link href="/">www.anixlab.in</Link> and its associated subdomains, your privacy is a top
        priority. This Privacy Policy explains how we collect, use, and safeguard your information
        when you use our services.
      </p>

      <p className="my-1 ml-1">
        By accessing or using Anix Lab platforms (including but not limited to{" "}
        <strong>Anix Lab Tools</strong>, <strong>Anix Play</strong> and <strong>AniPic</strong>,
        {/* <strong>Anix Lab Anime</strong>, and <strong>Anix Lab App Market</strong>), */}
        you agree to the terms outlined in this Privacy Policy.
      </p>

      <Hr />

      <h2>
        <strong>1. Information We Collect</strong>
      </h2>

      <p className="my-1 ml-1">We may collect the following types of information:</p>

      <h3>
        a. <strong>Personal Information</strong> <em>(voluntarily provided)</em>
      </h3>
      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>Name, email address, or contact details (e.g., support or feedback).</li>
        <li>Payment-related information for subscriptions or premium features.</li>
      </ul>

      <h3>
        b. <strong>Non-Personal Information</strong> <em>(automatically collected)</em>
      </h3>
      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>Browser type, device type, and operating system.</li>
        <li>IP address and approximate location.</li>
        <li>Usage data such as pages visited and interaction patterns.</li>
      </ul>

      <h3>
        c. <strong>Uploaded Content</strong>
      </h3>
      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>
          Files such as images, URLs, or QR data are processed locally in your browser unless
          explicitly uploaded for features like sharing or downloads.
        </li>
      </ul>

      <h3>
        d. <strong>Cookies &amp; Tracking Technologies</strong>
      </h3>
      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>Used to improve performance and remember user preferences.</li>
        <li>
          May include analytics tools (e.g., Google Analytics). We do{" "}
          <strong>not sell or trade user data</strong>.
        </li>
      </ul>

      <Hr />

      <h2>
        <strong>2. How We Use Your Information</strong>
      </h2>

      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>To operate and improve services</li>
        <li>To personalize user experience</li>
        <li>To analyze usage and performance</li>
        <li>To respond to support requests</li>
        <li>To display ads on free services</li>
        <li>To process payments and subscriptions</li>
        <li>To prevent fraud and misuse</li>
      </ul>

      <Hr />

      <h2>
        <strong>3. Google Login</strong>
      </h2>

      <p className="my-1 ml-1">
        When signing in with Google, we may access basic profile details such as name, email, and
        profile image for authentication purposes. You can revoke access anytime via your Google
        account settings.
      </p>

      <Hr />

      <h2>
        <strong>4. Cookies</strong>
      </h2>

      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>
          <strong>Essential Cookies:</strong> Required for functionality
        </li>
        <li>
          <strong>Analytics Cookies:</strong> For usage insights
        </li>
        <li>
          <strong>Advertising Cookies:</strong> For relevant ads
        </li>
      </ul>

      <p className="my-1 ml-1">You can control cookies through your browser settings.</p>

      <Hr />

      <h2>
        <strong>5. Data Retention</strong>
      </h2>

      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>
          Most tool data is processed locally and not stored unless required for specific features.
        </li>
        <li>
          Uploaded content (e.g., images) may be stored and publicly accessible until deleted by the
          user.
        </li>
        <li>Support-related data is retained as necessary.</li>
      </ul>

      <Hr />

      <h2>
        <strong>6. Data Sharing</strong>
      </h2>

      <p className="my-1 ml-1">
        We <strong>do not sell or rent</strong> your data.
      </p>

      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>Trusted service providers (payments, analytics)</li>
        <li>Legal authorities if required by law</li>
      </ul>

      <Hr />

      <h2>
        <strong>7. Your Rights</strong>
      </h2>

      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>
          <strong>Access:</strong> Request a copy of the personal data we hold about you.
        </li>
        <li>
          <strong>Correction:</strong> Request corrections to inaccurate or incomplete information.
        </li>
        <li>
          <strong>Deletion:</strong> Request the deletion of your personal data, subject to legal
          and contractual obligations.
        </li>
        <li>
          <strong>Revocation:</strong> Revoke Google login access at any time through your Google
          account settings.
        </li>
        <li>
          <strong>Opt-Out:</strong> Opt-out of personalized ads by managing your cookie preferences.
        </li>
      </ul>

      <p className="my-1 ml-1">
        To exercise these rights, contact us at:{" "}
        <strong>
          <a href="mailto:privacy@anixlab.in">privacy@anixlab.in</a>
        </strong>
      </p>

      <Hr />

      <h2>
        <strong>8. Children&apos;s Privacy</strong>
      </h2>

      <p className="my-1 ml-1">
        Our services are not intended for children under 13. We do not knowingly collect their data.
      </p>

      <Hr />

      <h2>
        <strong>9. Third-Party Services</strong>
      </h2>

      <p className="my-1 ml-1">
        Third-party tools (e.g., Google APIs, Telegram) operate under their own privacy policies.
      </p>

      <Hr />

      <h2>
        <strong>10. Security</strong>
      </h2>

      <p className="my-1 ml-1">
        We implement industry-standard security practices, but no system is 100% secure.
      </p>

      <Hr />

      <h2>
        <strong>11. Updates to This Policy</strong>
      </h2>

      <p className="my-1 ml-1">
        This policy may be updated periodically. Continued use of Anix Lab implies acceptance of the
        latest version.
      </p>

      <Hr />

      <h2>
        <strong>12. Contact</strong>
      </h2>

      <p className="my-1 ml-1">
        For questions, concerns, or privacy-related requests, please contact:
      </p>
      <p className="my-1 ml-1">
        📧 <strong>Email:</strong> <a href="mailto:privacy@anixlab.in">privacy@anixlab.in</a>
      </p>
      <p className="my-1 ml-1">
        🌐 <strong>Website:</strong> <Link href="/">www.anixlab.in</Link>
      </p>
    </>
  );
}
