// app/page.js
import { CardButton } from "@shared/components/ui/Button";
import { Paragraph } from "@shared/components/ui/Paragraph";
import Section, { CardSection } from "@shared/components/ui/Section";

export const metadata = {
  title: "Anix Lab - Explore Tools, Anime, Games, and More",
  description:
    "Anix Lab (formerly Anix7) is your all-in-one digital hub for smart tools, anime content, wallpapers, and mini games. Explore, create, and enjoy in one place.",
  alternates: { canonical: "/" },
  addToSitemap: true,
};

export default function Home() {
  const Drops = [
    {
      title: "Anix Lab Tools",
      description:
        "A powerful collection of online utilities including URL shortener, image tools, QR code generator, and more — designed to simplify your everyday digital tasks.",
      image: "/assets/img/tools.png",
      url: "https://tools.anixlab.in",
    },
  ];

  return (
    <>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center">
        Welcome to Anix Lab
      </h1>

      <Paragraph className="mb-6 sm:w-5/6 mx-auto">
        Welcome to <strong>Anix Lab</strong> (formerly Anix7) — your ultimate digital playground
        where creativity meets utility. Whether you&apos;re looking to shorten URLs, generate QR
        codes,
        {/* explore anime content,  */}
        or enjoy interactive mini games, we&apos;ve got something for everyone. Dive into a seamless
        experience of tools, visuals, and entertainment — all in one place. Explore, create, and
        enjoy — because at Anix Lab, there&apos;s always something new waiting for you.
      </Paragraph>

      <Section title="Explore & Create with Anix Lab">
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
