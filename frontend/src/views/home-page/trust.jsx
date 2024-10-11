import JohnsHopkinsMedicine from "@/../public/images/home/JohnsHopkinsMedicine.jpg";
import NLU from "@/../public/images/home/NLU.png";
import Stanford from "@/../public/images/home/Stanford.png";
import Columbia from "@/../public/images/home/columbia.png";
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
          <h2 className="text-center text-black">
            Trusted by Healthcare Professionals <br /> of Top Heath Systems
          </h2>
          <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-4  mt-6 mx-6">
            {images.map((image, index) => {
              return (
                <div key={index}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={200}
                    height={200}
                    className="w-[200px] h-auto mx-auto"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Trust;
