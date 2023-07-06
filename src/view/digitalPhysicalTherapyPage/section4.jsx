"use client";
import { Container, Section } from "@/components";
import useScreenSize from "@/hooks/screenSize";
import Image from "next/image";
import StepImageXs from "../../../public/images/digital-tharapy/step-xs.png";
import StepImageMd from "../../../public/images/digital-tharapy/steps-md.png";

const Section4 = () => {
  const screenSize = useScreenSize();

  return (
    <Section>
      <Container>
        <h2 className="heading-2 text-center">
          The Power of
          <br />
          <span className="text-primary"> Rejoy&apos;s Digital Therapist</span>
        </h2>

        <Image
          className="mt-5 mx-auto"
          src={screenSize < 768 ? StepImageXs : StepImageMd}
          alt="steps"
        />
      </Container>
    </Section>
  );
};

export default Section4;
