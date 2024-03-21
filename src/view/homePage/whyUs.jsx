import { Section } from "@/components";
import Image from "next/image";
import LookingFigure from "../../../public/images/home/looking-figure.png";

const Card = (props) => {
  return (
    <div className="p-[24px] md:py-[40px] max-w-3xl mx-auto mb-2 md:mb-[0px] ">
      <h3 className="heading-5 text-[#3E7FB9]">{props.title}</h3>
      <p className="body-2 mt-4 px-5">{props.description}</p>
    </div>
  );
};

const WhyUs = () => {
  return (
    <Section>
      <h2 className="xs:pt-[60px] heading-2 text-center">
        Why Choose
        <span className="text-primary"> Rejoy Health?</span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:space-x-5 mt-2 sm:mt-6 text-center">
        <Card
          title="Precision"
          description="Precise information through advanced AI and verified sources"
        />
        <Card
          title="Connection"
          description="Bridge the gap between information and professional support seamlessly"
        />
        <Card
          title="Empowerment"
          description="Take charge of your health with intuitive tools"
        />
      </div>
      <Image
        className="absolute top-1 left-0 -z-10"
        src={LookingFigure}
        alt="looking-figure"
      />
    </Section>
  );
};

export default WhyUs;
