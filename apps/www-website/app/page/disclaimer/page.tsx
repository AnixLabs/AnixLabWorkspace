import Hr from "@shared/components/ui/Hr";
import Link from "next/link";

export const metadata = {
  title: "Disclaimer",
  description:
    "Read the legal disclaimer for Anix Lab (formerly Anix7). Understand limitations of liability, user responsibilities, third-party links, and content usage policies.",
  keywords: [
    "Anix Lab Disclaimer",
    "Anix Lab legal",
    "Anix Lab policies",
    "Anix Lab (formerly Anix7)",
    "legal disclaimer",
    "user responsibility",
    "third-party links",
    "tools disclaimer",
    "apps disclaimer",
  ],
  alternates: { canonical: "/page/disclaimer" },
  addToSitemap: true,
};

export default function Disclaimer() {
  return (
    <>
      <h1>
        <strong>Disclaimer</strong>
      </h1>

      <p className="my-1 ml-1">
        <strong>Effective Date:</strong> 06 July 2025
      </p>

      <p className="my-1 ml-1">
        Welcome to <strong>Anix Lab</strong> (formerly Anix7). By accessing or using{" "}
        <Link href="/">www.anixlab.in</Link> and any of its subdomains (including Anix Lab Tools,
        Games, Anime Reviews, App Market, and more), you agree to this Disclaimer in full. If you do
        not agree, please discontinue use of our website and services.
      </p>

      <Hr />

      <h2>
        <strong>1. General Information</strong>
      </h2>
      <p className="my-1 ml-1">
        All content, tools, and services provided on <strong>Anix Lab</strong> are for{" "}
        <strong>informational, educational, or entertainment purposes only</strong>. While we strive
        to ensure accuracy and reliability, we make{" "}
        <strong>no guarantees regarding completeness, accuracy, or reliability</strong> of any
        content or functionality.
      </p>

      <Hr />

      <h2>
        <strong>2. No Professional Advice</strong>
      </h2>
      <p className="my-1 ml-1">
        <strong>Anix Lab</strong> does not provide professional, legal, medical, or financial
        advice. Any content, suggestions, or generated outputs (including AI responses, QR codes,
        shortened URLs, or media tools) should not be considered a substitute for professional
        consultation.
      </p>

      <Hr />

      <h2>
        <strong>3. Use at Your Own Risk</strong>
      </h2>
      <p className="my-1 ml-1">
        Your use of all tools, downloads, and services is strictly <strong>at your own risk</strong>
        . <strong>Anix Lab</strong> is not responsible for:
      </p>
      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>Loss or corruption of data</li>
        <li>File or system issues</li>
        <li>Misuse of generated QR codes or links</li>
        <li>Inaccurate AI or tool-generated outputs</li>
        <li>Device or browser compatibility issues</li>
      </ul>

      <Hr />

      <h2>
        <strong>4. External Links</strong>
      </h2>
      <p className="my-1 ml-1">
        Our platform may contain links to third-party websites or services. We do{" "}
        <strong>not control, endorse, or assume responsibility</strong> for any external content,
        policies, or practices.
      </p>

      <Hr />

      <h2>
        <strong>5. Content Ownership</strong>
      </h2>
      <p className="my-1 ml-1">
        We do not claim ownership of user-submitted content. However, you remain solely responsible
        for any content you upload, create, or distribute using <strong>Anix Lab</strong>. You agree
        not to submit content that is unlawful, infringing, or violates third-party rights.
      </p>

      <Hr />

      <h2>
        <strong>6. Service Availability</strong>
      </h2>
      <p className="my-1 ml-1">
        We aim to maintain uninterrupted access but do{" "}
        <strong>not guarantee continuous availability</strong>. Features, tools, or pricing may be
        modified, suspended, or discontinued at any time without notice.
      </p>

      <Hr />

      <h2>
        <strong>7. Limitation of Liability</strong>
      </h2>
      <p className="my-1 ml-1">
        To the fullest extent permitted by law, <strong>Anix Lab</strong>, its owners, and
        affiliates shall not be liable for any{" "}
        <strong>indirect, incidental, or consequential damages</strong> arising from your use—or
        inability to use—our services.
      </p>

      <Hr />

      <h2>
        <strong>8. Affiliate &amp; Advertising Disclaimer</strong>
      </h2>
      <p className="my-1 ml-1">
        Some sections of the platform may include advertisements or affiliate links. We may earn a
        commission from qualifying actions at no additional cost to you. However, we do not
        guarantee or endorse all third-party offerings.
      </p>

      <Hr />

      <h2>
        <strong>9. Changes to This Disclaimer</strong>
      </h2>
      <p className="my-1 ml-1">
        This Disclaimer may be updated periodically without prior notice. Continued use of the
        platform indicates your acceptance of any revised terms.
      </p>

      <Hr />

      <h2>
        <strong>10. Contact Us</strong>
      </h2>
      <p className="my-1 ml-1">For questions or concerns regarding this Disclaimer:</p>
      <p className="my-1 ml-1">
        📧 <strong>Email:</strong> <a href="mailto:legal@anixlab.in">legal@anixlab.in</a>
      </p>
      <p className="my-1 ml-1">
        🌐 <strong>Website:</strong> <Link href="/">www.anixlab.in</Link>
      </p>
    </>
  );
}
