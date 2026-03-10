// app/page.js
import { CardButton } from "@shared/components/ui/Button";
import { Paragraph } from "@shared/components/ui/Paragraph";
import Section, { CardSection } from "@shared/components/ui/Section";

export const metadata = {
  alternates: { canonical: "/" },
  addToSitemap: true,
};

export default function Home() {
  const Drops = [
    {
      title: "Anix7 - Tools",
      description:
        "Anix7 - Tools is your all-in-one hub for online productivity, featuring a URL shortener, image uploader, and a range of other intuitive tools to simplify your digital tasks.",
      image: "/assets/img/tools.png",
      url: "https://tools.anix7.in",
    },
  ];
  return (
    <>
      {/* <div className="my-5">
        <h1 className="text-3xl font-bold text-center mb-4">
          Fast & Secure URL Shortener
        </h1>
        <p className="text-lg text-center mb-6">
          Shorten long URLs from various platforms, share them effortlessly, and
          track performance with ease.
        </p>
      </div> */}

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center">Welcome to Anix7</h1>
      <Paragraph className="mb-6 sm:w-5/6 mx-auto">
        Welcome to Anix7 — your ultimate digital playground where creativity meets curiosity.
        Whether you&apos;re looking to shorten URLs, generate QR codes,
        {/* discover breathtaking */}
        {/* anime wallpapers in 4K, read the latest anime reviews, or just pass the time with fun little games, */}{" "}
        we&apos;ve got something for everyone. Dive into a world of smart tools
        {/*, artistic visuals, AI-generated photos, and nature&apos;s finest moments */} — all in
        one place. Explore, create, download, and enjoy — because at Anix7, there&apos;s always
        something new waiting for you.
      </Paragraph>
      <Section title="Explore & Create with Anix7">
        <CardSection className="md:grid-cols-2">
          {Drops.map(({ url, image, title, description }, index) => (
            <CardButton
              key={index}
              className="snap-start flex-col [&>div]:text-center!"
              href={url}
              title={title}
              description={description}
              image={image}
              imageClassName="w-full max-w-96 aspect-auto"
              imageWidth={380}
              imageHeight={380}
            />
          ))}
        </CardSection>
      </Section>
    </>
  );
}
