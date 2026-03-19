import Image from "next/image";
import Resizer, { LaunchResizer } from "./resizer";

export const metadata = {
  title: "Image Resizer | Bulk Image Resizer | Resize Multiple Images Online",
  description:
    "Free online image resizer by Anix Lab (formerly Anix7) — resize PNG, JPG, WebP, and more formats in bulk, quickly and securely.",
  keywords: [
    "Bulk Image Resizer",
    "Resize Images Online",
    "Batch Image Resizer",
    "Anix Lab Tools Image Resizer",
    "Resize multiple images",
    "Resize images in bulk",
    "Free image resizer",
    "Online image resizer",
    "Resize photos",
    "Bulk photo resizer",
    "Anix Lab Tools",
    "Image Resizer by Anix Lab Tools",
    "Resize JPG PNG SVG WebP images",
    "Image resizing without losing quality",
    "Resize images for free",
    "Browser based image resizer",
    "Secure image resizer tool",
    "Drag and drop image resizer",
    "Responsive image resizer",
    "Compress and resize images",
    "Resize images without upload",
    "Resize images for websites",
    "Resize images for e-commerce",
    "Resize images for Instagram",
    "Resize images for blog",
    "Resize high-res images online",
    "Resize HEIC images online",
    "Resize images for web",
    "Fast image resizer",
    "Simple bulk image resizer",
    "Resize tool for social media images",
    "Best image resizer tool",
    "Resize all image formats",
    "Download resized images as ZIP",
    "No upload image resizer",
    "Batch resize tool",
    "Image resizer for professionals",
    "Resize multiple photos",
    "High quality image resizer",
    "Custom dimension image resizer",
    "Easy bulk image editor",
    "Adjust image width and height",
    "Change image resolution",
    "Image dimension editor online",
    "Resize and rename images",
    "Resize images with aspect ratio",
    "Mobile image resizer",
    "Lightweight image resizer",
    "Free bulk photo editing tool",
  ],

  openGraph: {
    url: "/bulk-image-resizer",
    siteName: "Anix Lab Tools",
    images: [
      {
        url: `/assets/img/image-resizer-og.jpeg`,
        width: 1200,
        height: 630,
        alt: "Anix Lab Tools Bulk Image Resizer",
      },
    ],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/bulk-image-resizer" },
  addToSitemap: true,
};

export default function BulkImageResizer() {
  return (
    <>
      <Resizer />
      <section className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center">Anix Lab Tools - Bulk Image Resizer</h1>

        <p className="mt-4">
          Welcome to the <strong>Anix Lab Tools Bulk Image Resizer</strong> — your all-in-one
          solution for resizing multiple images quickly and efficiently. Whether you&apos;re a
          designer, photographer, or content creator, this tool is designed to simplify your
          workflow while maintaining top image quality.
        </p>

        {/* Image Placeholder */}
        <Image
          width={200}
          height={200}
          src="/assets/img/image-upload.png"
          alt="Upload multiple images"
          className="drop-shadow-2xl mt-6 mx-auto w-2/3 max-w-sm"
        />

        <h2>How to Resize Images in Bulk</h2>
        <ul className="list-disc ml-6">
          <li>
            <strong>Upload Multiple Images:</strong> Drag and drop your images or select them
            manually. You can upload PNG, JPEG, SVG, WEBP, and more.
          </li>
          <li>
            <strong>Specify Dimensions:</strong> Set the desired width or height. The tool
            intelligently maintains aspect ratio for quality retention.
          </li>
          <li>
            <strong>Download with Ease:</strong> Get your resized images individually or all at once
            in a ZIP file.
          </li>
          {/* <li>
          <strong>Rename Files:</strong> Optionally rename your images before
          downloading them.
        </li> */}
        </ul>

        {/* Image Placeholder */}
        <Image
          width={200}
          height={200}
          src="/assets/img/image-resize.png"
          alt="Resize and download options"
          className="drop-shadow-2xl mt-6 mx-auto w-2/3 max-w-sm"
        />

        <h2>Why Use Anix Lab&apos;s Bulk Image Resizer?</h2>
        <ul className="list-disc ml-6">
          <li>
            <strong>Privacy-First:</strong> All resizing happens in your browser. Your images never
            leave your device, ensuring complete privacy.
          </li>
          <li>
            <strong>High Compatibility:</strong> Supports a wide range of formats including PNG,
            JPEG, SVG, HEIC, WEBP, and more.
          </li>
          <li>
            <strong>Efficient Processing:</strong> Resize dozens of images in seconds — no more
            waiting.
          </li>
          <li>
            <strong>Preserved Quality:</strong> Even after resizing, your images maintain sharpness
            and clarity.
          </li>
          <li>
            <strong>Simple & Intuitive:</strong> A clean interface makes the tool easy to use for
            everyone — no technical skills required.
          </li>
        </ul>

        {/* Image Placeholder */}
        <Image
          width={200}
          height={200}
          src="/assets/img/upload-step.png"
          alt="User interface of Anix Lab image resizer"
          className="drop-shadow-2xl mt-6 mx-auto w-2/3 max-w-sm"
        />

        <h2 className="mt-8">Perfect for Every Use Case</h2>
        <p>
          Whether you&apos;re preparing product images for an online store, optimizing photos for
          web publishing, or creating social media content, Anix Lab&apos;s Bulk Image Resizer gets
          the job done quickly and reliably.
        </p>

        <h2 className="mt-8">Start Resizing Now</h2>
        <p>
          Stop wasting time resizing images one by one. Try the{" "}
          <strong>Anix Lab Tools Bulk Image Resizer</strong> and experience faster, smarter image
          processing — right from your browser.
        </p>

        <LaunchResizer />
      </section>
    </>
  );
}
