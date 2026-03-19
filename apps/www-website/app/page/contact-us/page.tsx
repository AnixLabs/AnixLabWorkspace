export const metadata = {
  title: "Contact Us",
  description:
    "Need help, support, or have suggestions? Contact Anix Lab (formerly Anix7) via email for assistance, support, or collaboration inquiries.",
  keywords: [
    "Anix Lab contact",
    "Anix Lab support",
    "Anix Lab email",
    "Anix Lab help",
    "Anix Lab collaboration",
    "Anix Lab (formerly Anix7)",
  ],
  alternates: { canonical: "/page/contact-us" },
  addToSitemap: true,
};

export default function ContactUs() {
  return (
    <>
      <h1>
        <strong>Contact Anix Lab</strong>
      </h1>

      <p className="my-1 ml-1">
        Have questions, suggestions, or need assistance? The <strong>Anix Lab</strong> team
        (formerly Anix7) is here to help. We aim to respond to all inquiries within{" "}
        <strong>7–14 business days</strong>.
      </p>

      <hr className="my-4" />

      <h3 className="mt-2 mb-1">📧 General Inquiries</h3>
      <p className="ml-1">
        <strong>Email:</strong>{" "}
        <a rel="noopener" href="mailto:contact@anixlab.in">
          contact@anixlab.in
        </a>
      </p>

      <h3 className="mt-4 mb-1">🛠️ Support</h3>
      <p className="ml-1">
        For assistance with tools, features, or account-related issues:
        <br />
        <strong>Email:</strong>{" "}
        <a rel="noopener" href="mailto:support@anixlab.in">
          support@anixlab.in
        </a>
      </p>

      <h3 className="mt-4 mb-1">🤝 Collaborations & Partnerships</h3>
      <p className="ml-1">
        Interested in working with <strong>Anix Lab</strong>? Send your proposal to:
        <br />
        <a rel="noopener" href="mailto:contact@anixlab.in">
          contact@anixlab.in
        </a>
      </p>

      {/* Future Social Section */}
      {/* 
      <h3 className="mt-4 mb-1">🌐 Social Media</h3>
      <p className="ml-1">
        Stay connected for updates and announcements:
        <br />
        <strong>Instagram:</strong>{" "}
        <a href="https://instagram.com/anixlab.in" target="_blank" rel="noopener">
          @anixlab.in
        </a>
        <br />
        <strong>YouTube:</strong>{" "}
        <a href="https://youtube.com/@anixlab.in" target="_blank" rel="noopener">
          @anixlab.in
        </a>
      </p> 
      */}
    </>
  );
}
