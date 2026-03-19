import Hr from "@shared/components/ui/Hr";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Anix7 collects, uses, stores, and protects your data. Your privacy is important to us.",
  keywords: [
    "Anix7 privacy policy",
    "data protection",
    "user information",
    "data usage",
    "cookie policy",
    "user rights",
    "privacy practices",
    "data security",
    "personal information",
    "GDPR compliance",
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
        At <strong>Anix7</strong> (accessible via <Link href="/">www.anix7.in</Link> and all
        associated subdomains), your privacy is a top priority. This Privacy Policy outlines how we
        collect, use, and protect your personal information when you use any of our services.
      </p>
      <p className="my-1 ml-1">
        By accessing or using Anix7 or any of its associated platforms (including but not limited to{" "}
        <strong>Anix7 Tools</strong>, <strong>Anix7 Games</strong>,{" "}
        {/* <strong>Anix7 AI</strong>,{" "} */}
        <strong>Anix7 Photos</strong>, <strong>AniPic</strong>, <strong>Anix7 Anime</strong>, and{" "}
        <strong>Anix7 App Market</strong>), you agree to this Privacy Policy.
      </p>
      <Hr />
      <h2>
        <strong>1. Information We Collect</strong>
      </h2>
      <p className="my-1 ml-1">
        We may collect the following types of information when you interact with our platforms:
      </p>
      <h3>
        a. <strong>Personal Information</strong> <em>(only when voluntarily submitted)</em>:
      </h3>
      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>Name, email, or contact info (e.g., via support forms, feedback).</li>
        <li>Payment-related details if you purchase a subscription or premium feature.</li>
      </ul>
      <h3>
        b. <strong>Non-Personal Information</strong> <em>(automatically collected)</em>:
      </h3>
      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>Browser type, device type, OS version.</li>
        <li>IP address and approximate location.</li>
        <li>Pages visited, time spent, and interaction data (for analytics).</li>
      </ul>
      <h3>
        c. <strong>Uploaded Files &amp; Content</strong>:
      </h3>
      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>
          Images, URLs, QR data, and other content processed by our tools remain in your browser
          unless explicitly uploaded to our server (e.g., for temporary download links).
        </li>
      </ul>
      <h3>
        d. <strong>Cookies &amp; Tracking Technologies</strong>:
      </h3>
      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>To remember user preferences, improve performance, and measure usage patterns.</li>
        <li>
          We may use cookies for analytics (Google Analytics, for example), but we{" "}
          <strong>do not use cookies to sell or trade data</strong>.
        </li>
      </ul>
      <Hr />
      <h2>
        <strong>2. How We Use Your Information</strong>
      </h2>
      <p className="my-1 ml-1">We use your data for the following purposes:</p>
      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>To operate and improve our tools and services.</li>
        <li>To personalize your user experience.</li>
        <li>To analyze website traffic and optimize performance.</li>
        <li>To respond to user support requests or feedback.</li>
        <li>To display personalized ads on the free version of the site.</li>
        <li>To process payments and manage subscriptions (only applicable for Pro features).</li>
        <li>To prevent abuse, fraud, or misuse of our services.</li>
      </ul>
      <Hr />
      <h2>
        <strong>3. Google Login Integration</strong>
      </h2>
      <p className=" my-1 ml-1">When you use the login feature via Google, we:</p>
      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>
          Request to access name, email address and profile picture for the purpose of
          authentication.
        </li>
        <li>Allow you to revoke access at any time through your Google account settings.</li>
      </ul>
      <p className=" my-1 ml-1">
        We comply with Google’s API Services User Data Policy and ensure that your data is handled
        securely.
      </p>
      <Hr />
      <h2>
        <strong>4. Cookies and Tracking Technologies</strong>
      </h2>
      <p className=" my-1 ml-1">
        We use cookies and similar technologies to enhance your experience and analyze website
        traffic. These include:
      </p>
      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>
          <strong>Essential Cookies:</strong> Required for the proper functioning of the website.
        </li>
        <li>
          <strong>Analytics Cookies:</strong> Help us understand how users interact with our site.
        </li>
        <li>
          <strong>Advertising Cookies:</strong> Used to display personalized ads on the free version
          of the site.
        </li>
      </ul>
      <p className=" my-1 ml-1">
        You can manage your cookie preferences through your browser settings.
      </p>
      <Hr />
      <h2>
        <strong>5. Data Retention</strong>
      </h2>
      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>
          Files processed in-browser are never stored on our servers, except when required for
          specific download or sharing functions. However, images uploaded using the Image Upload
          feature are stored on our servers and may be publicly accessible. Users retain control and
          can delete their uploaded images at any time.
        </li>
        <li>
          Contact or support-related data may be retained as long as needed for support or legal
          compliance.
        </li>
      </ul>
      <Hr />
      <h2>
        <strong>6. Sharing Your Information</strong>
      </h2>
      <p className="my-1 ml-1">
        We <strong>do not sell, rent, or trade</strong> your personal data.
      </p>
      <p className="my-1 ml-1">We may share data with:</p>
      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>
          <strong>Service providers</strong> (e.g., payment gateways, analytics platforms) under
          strict confidentiality agreements.
        </li>
        <li>
          <strong>Legal authorities</strong> if required to comply with law or protect our
          users/platform.
        </li>
      </ul>
      <Hr />
      <h2>
        <strong>7. Your Rights</strong>
      </h2>
      <p className=" my-1 ml-1">You have the following rights regarding your personal data:</p>
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
        Anix7 is not intended for children under the age of 13. We do not knowingly collect personal
        data from children. If we learn we’ve collected data from a child under 13, we will delete
        it promptly.
      </p>
      <Hr />
      <h2>
        <strong>9. Third-Party Services</strong>
      </h2>
      <p className="my-1 ml-1">
        We may link or integrate with third-party tools and platforms (e.g., Telegram bots, Imgur,
        Google APIs). These services operate independently and are governed by their own privacy
        policies. We recommend reviewing them before use.
      </p>
      <Hr />
      <h2>
        <strong>10. Security Measures</strong>
      </h2>
      <p className="my-1 ml-1">
        We use modern security standards and best practices to protect your data. However, no online
        service is 100% secure, and we cannot guarantee absolute protection against all threats.
      </p>
      <Hr />
      <h2>
        <strong>11. Changes to This Policy</strong>
      </h2>
      <p className="my-1 ml-1">
        We may update this Privacy Policy from time to time. The most recent version will always be
        available on this page with the updated effective date. Continued use of Anix7 after changes
        indicates your acceptance of the updated policy.
      </p>
      <Hr />
      <h2>
        <strong>12. Contact Us</strong>
      </h2>
      <p className="my-1 ml-1">
        For questions, concerns, or privacy-related requests, please contact:
      </p>
      <p className="my-1 ml-1">
        📧 <strong>Email:</strong> <a href="mailto:privacy@anix7.in">privacy@anix7.in</a>
      </p>
      <p className="my-1 ml-1">
        🌐 <strong>Website:</strong> <Link href="/">www.anix7.in</Link>
      </p>
    </>
  );
}
