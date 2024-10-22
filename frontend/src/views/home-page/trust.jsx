import JohnsHopkinsMedicine from "@/../public/images/home/JohnsHopkinsMedicine.jpg";
import NLU from "@/../public/images/home/NLU.png";
import Columbia from "@/../public/images/home/columbia.png";
import Stanford from "@/../public/images/home/stanford.png";
import { Container, Section } from "@/components";
import Image from "next/image";

const images = [
  {
    src: JohnsHopkinsMedicine,
    alt: "Johns Hopkins Medicine",
  },
  {
    src: Columbia,
    alt: "Columbia",
  },
  {
    src: Stanford,
    alt: "Stanford",
  },
  {
    src: NLU,
    alt: "NLU",
  },
];

const Trust = () => {
  return (
    <Section>
      <Container>
        <div>
          <h2 className="text-center text-black max-w-[400px] sm:max-w-[760px] lg:max-w-screen-md mx-auto">
            Trusted by Healthcare Professionals of Top Heath Systems
          </h2>
          <div className="overflow-hidden mt-6">
            <div className="flex w-full max-w-screen-md mx-auto justify-between max-md:animate-marquee">
              {images.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[240px] flex justify-center"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={140}
                      height={200}
                      className="h-auto"
                    />
                  </div>
                );
              })}
              {images.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[240px] flex justify-center md:hidden"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={140}
                      height={200}
                      className="h-auto"
                      style={{
                        height: "auto",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Trust;
