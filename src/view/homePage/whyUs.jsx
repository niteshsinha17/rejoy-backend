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
        Why you need
        <span className="text-primary"> Rejoy Health?</span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:space-x-5 mt-2 sm:mt-6 text-center">
        <Card
          title="Targeted Musculoskeletal Care"
          description="Receive specialized attention and effective strategies to manage musculoskeletal conditions and improve mobility."
        />
        <Card
          title="Proven Efficacy"
          description="Join the thousands who have already improved their lives with our next-gen AI-powered solutions."
        />
        <Card
          title="Rewards for Healthy Choices"
          description="Earn incentives for making positive changes to your daily routine and adopting healthier movement habits."
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
