import Link from "next/link";

export const metadata = {
  title: "Frequently Asked Questions (FAQs)",
  description:
    "Get quick answers to the most common questions about Anix Lab (formerly Anix7 Tools). Learn more about features, support, usage policies, and tools.",
  keywords: [
    "Anix Lab Tools FAQ",
    "Anix7 Tools FAQ",
    "Anix Lab questions",
    "Help center",
    "Anix Lab support",
    "Common issues",
    "Tools usage",
    "User guide",
    "Account support",
    "Anix Lab help",
    "Frequently asked questions",
  ],
  alternates: { canonical: "/page/faqs" },
  addToSitemap: true,
};

export default function Faqs() {
  const baseUrl = new URL(process.env.BASE_URL!).hostname;
  const contactEmail = process.env.CONTACT_EMAIL ?? "contact@anixlab.in";
  return (
    <>
      <h1>Frequently Asked Questions (FAQs)</h1>
      <p className="my-1 ml-1">
        Welcome to the FAQ page for {baseUrl}! Below are answers to some common questions about our
        services. If you have any additional questions, feel free to contact us at{" "}
        <strong>
          <a rel="noopener" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </strong>
        .
      </p>

      <hr className="my-5" />

      <h3>
        1. <strong>What is {baseUrl}?</strong>
      </h3>
      <p className="my-1 ml-1">
        {baseUrl} is an all-in-one platform offering a wide range of free online tools including URL
        shorteners, image resizer, QR code generators, file uploader, and more.
      </p>

      <h3>
        2. <strong>How do I shorten a URL?</strong>
      </h3>
      <p className="my-1 ml-1">
        Just paste your long URL into the URL shortener tool on our homepage and click
        &ldquo;Shorten&rdquo;. Your new short link will be instantly ready to copy and use.
      </p>

      <h3>
        3. <strong>Is there a limit on how many URLs I can shorten?</strong>
      </h3>
      <p className="my-1 ml-1">
        There is no strict limit for now. However, for optimal performance and fair use, rate limits
        may apply in the future for free users.
      </p>

      <h3>
        4. <strong>Can I customize my shortened URL?</strong>
      </h3>
      <p className="my-1 ml-1">
        Currently, we offer auto-generated URLs. Soon, we plan to introduce custom aliases for Pro
        users.
      </p>

      <h3>
        5. <strong>How does the image upload tool work?</strong>
      </h3>
      <p className="my-1 ml-1">
        Upload an image using the tool and get an instant shareable image URL without creating an
        account.
      </p>

      <h3>
        6. <strong>Can I delete a link or uploaded image?</strong>
      </h3>
      <p className="my-1 ml-1">
        Yes. You&apos;ll be given a delete option or token after uploading. Use that to remove your
        content anytime.
      </p>

      <h3>
        7. <strong>What types of images can I upload?</strong>
      </h3>
      <p className="my-1 ml-1">
        We support JPG, PNG, WEBP, GIF, SVG, BMP, HEIC, ICO, and more. The max file size is
        typically 10 MB.
      </p>

      <h3>
        8. <strong>How does the bulk image resizer work?</strong>
      </h3>
      <p className="my-1 ml-1">
        Upload multiple images, choose the dimensions or percentage, and resize all at once.
        Download resized images individually or as a zip.
      </p>

      <h3>
        9. <strong>Can I compress images too?</strong>
      </h3>
      <p className="my-1 ml-1">
        Yes, our image tools offer an optional compression toggle to reduce file size while
        maintaining quality.
      </p>

      <h3>
        10. <strong>Do you support transparent PNGs and SVGs?</strong>
      </h3>
      <p className="my-1 ml-1">
        Absolutely. We retain transparency for formats that support it, including PNG and SVG files.
      </p>

      <h3>
        11. <strong>Is {baseUrl} free to use?</strong>
      </h3>
      <p className="my-1 ml-1">
        Yes, all our basic features are completely free. We also offer a Pro version to unlock
        additional benefits and remove ads.
      </p>

      <h3>
        12. <strong>Do I need to sign up or log in?</strong>
      </h3>
      <p className="my-1 ml-1">
        No login is required for most tools. Some advanced features may optionally require login in
        the future.
      </p>

      <h3>
        13. <strong>How secure is my data?</strong>
      </h3>
      <p className="my-1 ml-1">
        We do not store any unnecessary user data. All processing is done in the browser whenever
        possible. See our{" "}
        <Link href="https://www.anixlab.in/page/privacy-policy">Privacy Policy</Link> for details.
      </p>

      <h3>
        14. <strong>Do you have a QR code generator?</strong>
      </h3>
      <p className="my-1 ml-1">
        Yes, we offer a fully customizable QR code generator with support for logos, colors, and
        shapes.
      </p>

      <h3>
        15. <strong>Can I download all resized images at once?</strong>
      </h3>
      <p className="my-1 ml-1">
        Yes, after processing, you’ll see an option to download all images as a .zip file.
      </p>

      <h3>
        16. <strong>How do I rename images before downloading?</strong>
      </h3>
      <p className="my-1 ml-1">
        Use the rename input fields next to each image after resizing to set custom file names.
      </p>

      <h3>
        17. <strong>What is the Anix Lab Pro plan?</strong>
      </h3>
      <p className="my-1 ml-1">
        The Pro plan unlocks premium features like ad-free experience, larger uploads, faster
        performance, and early access to new tools.
      </p>

      <h3>
        18. <strong>Do you support dark mode?</strong>
      </h3>
      <p className="my-1 ml-1">
        Yes, our interface supports both light and dark themes based on your system preference.
      </p>

      <h3>
        19. <strong>Can I suggest a feature or tool?</strong>
      </h3>
      <p className="my-1 ml-1">
        Absolutely! We love user feedback. Email us at{" "}
        <strong>
          <a rel="noopener" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </strong>{" "}
        with your ideas.
      </p>

      <h3>
        20. <strong>How do I report bugs or errors?</strong>
      </h3>
      <p className="my-1 ml-1">
        If you notice any bugs, errors, or broken links, please let us know at{" "}
        <strong>
          <a rel="noopener" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </strong>
        .
      </p>
    </>
  );
}
