import { Container, Section } from "@/components";
import Image from "next/image";
import StepImageXs from "../../../public/images/digital-tharapy/step-xs.png";
import StepImageMd from "../../../public/images/digital-tharapy/steps-md.png";

const Section4 = () => {
  return (
    <Section>
      <Container>
        <h2 className="heading-2 text-center">
          The Power of
          <br />
          <span className="text-primary"> Rejoy&apos;s Digital Therapist</span>
        </h2>

        <Image
          className="mt-5 mx-auto hidden md:block"
          src={StepImageMd}
          alt="steps"
        />
        <Image
          className="mt-5 mx-auto md:hidden"
          src={StepImageXs}
          alt="steps"
        />
      </Container>
    </Section>
  );
};

export default Section4;
