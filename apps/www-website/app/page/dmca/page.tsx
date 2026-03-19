import Hr from "@shared/components/ui/Hr";
import Link from "next/link";

export const metadata = {
  title: "DMCA",
  description:
    "Review the DMCA Policy of Anix Lab (formerly Anix7). Learn how to submit copyright infringement claims, takedown notices, and counter-notifications.",
  keywords: [
    "Anix Lab DMCA",
    "Anix Lab copyright policy",
    "Anix Lab (formerly Anix7)",
    "DMCA takedown",
    "copyright infringement",
    "submit DMCA request",
    "intellectual property",
    "content removal policy",
  ],
  alternates: { canonical: "/page/dmca" },
  addToSitemap: true,
};

export default function DMCA() {
  return (
    <>
      <h1>
        <strong>DMCA Notice and Takedown Policy</strong>
      </h1>

      <p className="my-1 ml-1">
        <strong>Effective Date:</strong> June 6, 2025
      </p>

      <p className="my-1 ml-1">
        At <strong>Anix Lab</strong> (formerly Anix7), we respect the intellectual property rights
        of others and expect our users to do the same. This policy outlines how we respond to
        copyright infringement claims in accordance with the{" "}
        <strong>Digital Millennium Copyright Act (DMCA)</strong>, 17 U.S.C. § 512.
      </p>

      <Hr />

      <h2>
        📩 <strong>Submitting a DMCA Takedown Notice</strong>
      </h2>

      <p className="my-1 ml-1">
        If you believe that content hosted on{" "}
        <strong>
          <Link href="/">www.anixlab.in</Link>
        </strong>{" "}
        or its subdomains (e.g., tools, anime, wallpapers, apps) infringes your copyright, you may
        submit a formal DMCA takedown request.
      </p>

      <p className="my-1 ml-1">Your notice must include the following information:</p>

      <ol className="list-decimal ml-5 pl-5 *:my-4">
        <li>
          <p className="ml-1">
            <strong>Identification of the copyrighted work:</strong> Provide a description,
            reference, or URL of the original work.
          </p>
        </li>
        <li>
          <p className="ml-1">
            <strong>Identification of the infringing material:</strong> Include exact URLs or
            details to locate the content on our platform.
          </p>
        </li>
        <li>
          <p className="ml-1">
            <strong>Contact information:</strong> Full name, address, phone number, and email.
          </p>
        </li>
        <li>
          <p className="ml-1">
            <strong>Good faith statement:</strong> A statement confirming you believe the use is not
            authorized by the copyright owner, agent, or law.
          </p>
        </li>
        <li>
          <p className="ml-1">
            <strong>Accuracy & authority statement:</strong> A statement under penalty of perjury
            that the information is accurate and you are authorized to act on behalf of the owner.
          </p>
        </li>
        <li>
          <p className="ml-1">
            <strong>Signature:</strong> Physical or electronic signature of the claimant.
          </p>
        </li>
      </ol>

      <p className="ml-1">Submit your DMCA notice to:</p>

      <p className="ml-1">
        <strong>Email:</strong>{" "}
        <a rel="noopener" href="mailto:dmca@anixlab.in">
          dmca@anixlab.in
        </a>
        <br />
        <strong>Subject:</strong> DMCA Takedown Request
      </p>

      <p className="ml-1">
        Upon receiving a valid request, we will review and take appropriate action, which may
        include removing or restricting access to the content.
      </p>

      <Hr />

      <h2>
        🔄 <strong>Counter-Notification</strong>
      </h2>

      <p className="my-1 ml-1">
        If your content has been removed and you believe this was done in error or qualifies as fair
        use, you may submit a counter-notification including:
      </p>

      <ol className="list-decimal ml-5 pl-5 *:my-4">
        <li>
          <p className="ml-1">
            <strong>Identification of removed content:</strong> Include details and previous
            location.
          </p>
        </li>
        <li>
          <p className="ml-1">
            <strong>Statement under penalty of perjury:</strong> Confirm the removal was a mistake
            or misidentification.
          </p>
        </li>
        <li>
          <p className="ml-1">
            <strong>Contact details:</strong> Full contact info and consent to jurisdiction.
          </p>
        </li>
        <li>
          <p className="ml-1">
            <strong>Signature:</strong> Physical or electronic signature.
          </p>
        </li>
      </ol>

      <p className="ml-1">Send your counter-notice to:</p>

      <p className="ml-1">
        <strong>Email:</strong>{" "}
        <a rel="noopener" href="mailto:dmca@anixlab.in">
          dmca@anixlab.in
        </a>
        <br />
        <strong>Subject:</strong> DMCA Counter-Notification
      </p>

      <p className="ml-1">
        If valid, content may be restored unless legal action is initiated by the original claimant.
      </p>

      <Hr />

      <h2>
        ⚖️ <strong>Repeat Infringer Policy</strong>
      </h2>
      <p className="my-1 ml-1">
        Users who repeatedly violate copyright laws may have their access permanently restricted or
        terminated at our discretion.
      </p>

      <Hr />

      <h2>
        📝 <strong>Good Faith Notice</strong>
      </h2>
      <p className="my-1 ml-1">
        Submitting false or misleading DMCA claims or counter-notices may result in legal
        consequences. Ensure all submissions are made honestly and in good faith.
      </p>

      <Hr />

      <h2>
        📬 <strong>Contact Us</strong>
      </h2>
      <p className="my-1 ml-1">For any DMCA-related queries:</p>
      <p className="my-1 ml-1">
        📧 <strong>Email:</strong> <a href="mailto:dmca@anixlab.in">dmca@anixlab.in</a>
      </p>
      <p className="my-1 ml-1">
        🌐 <strong>Website:</strong> <Link href="/">www.anixlab.in</Link>
      </p>
    </>
  );
}
