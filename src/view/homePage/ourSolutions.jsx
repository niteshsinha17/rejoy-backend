import { Container, Section } from "@/components";
import LeftImageSection from "@/components/leftImageSection";
import RightImageSection from "@/components/rightImageSection";
import { ROUTES } from "@/enum";
import Link from "next/link";
import AiChat from "../../../public/images/home/ai-chatbot.png";
import DigitalTherapy from "../../../public/images/home/digital-therapy.png";
import Providers from "../../../public/images/home/providers.png";

const ButtonLink = (props) => {
  return (
    <Link
      className="text-base md:text-lg bg-green py-3 px-6 text-white font-poppins font-semibold rounded-3xl hover:bg-yellow hover:text-textPrimary inline-block"
      href={props.href}
    >
      {props.text}
    </Link>
  );
};

const OurSolutions = () => {
  return (
    <Section>
      <Container>
        <h2 className="heading-2 text-center">
          Rejoy <span className="text-primary">Health Care Center</span>
        </h2>
        <p className="body-1 mt-4 text-center">
          We offer a holistic approach to improving health and well-being by
          addressing physical health needs
        </p>
        <LeftImageSection
          heading="Smart Guidance with AI Chatbot"
          para="Say goodbye to generic advice! Our AI chatbot provides personalized insights tailored to your unique health needs. Input your condition and symptoms to receive expert guidance that speaks directly to you."
          custom={
            <div className="mt-4">
              <ButtonLink
                href={ROUTES.PRECISION_MOTION_TECHNOLOGY}
                text="Learn More"
              />
            </div>
          }
          img={AiChat}
          imgAlt="Smart Guidance with AI Chatbot"
        />

        <RightImageSection
          heading="Seamless Care Connections"
          para="Rejoy Health goes beyond information—it connects you with trusted healthcare providers, including expert Physical Therapists. Choose virtual consultations or find nearby outpatient clinics effortlessly through our platform."
          custom={
            <div className="mt-4">
              <ButtonLink
                href={ROUTES.DIGITAL_PHYSICAL_THERAPY}
                text="Learn More"
              />
            </div>
          }
          img={Providers}
          imgAlt="Seamless Care Connections"
        />
        <LeftImageSection
          heading="Handy Tools for Personalized Wellness"
          para="Take control of your health with our user-friendly tools to Track pain levels, Movement monitoring with computer vision, tracking steps and access personalized services that adapt to your individual health journey."
          custom={
            <div className="mt-4">
              <ButtonLink href={ROUTES.MUSCULOSKELETAL} text="Learn More" />
            </div>
          }
          img={DigitalTherapy}
          imgAlt="Handy Tools for Personalized Wellness"
        />
      </Container>
    </Section>
  );
};

export default OurSolutions;
