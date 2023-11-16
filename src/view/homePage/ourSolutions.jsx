import { Container, Section } from "@/components";
import LeftImageSection from "@/components/leftImageSection";
import RightImageSection from "@/components/rightImageSection";
import { ROUTES } from "@/enum";
import Link from "next/link";
import DigitalTherapy from "../../../public/images/home/digital-therapy.png";
import Move from "../../../public/images/home/move.png";
import Musculoskeletal from "../../../public/images/home/musculoskeletal.png";
import OnCall from "../../../public/images/home/on-call.png";
import PreciseMotion from "../../../public/images/home/precise-motion.png";
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
          heading="Precision Motion Technology"
          para="Precision Motion Technology, powered by RejoyMotion™, establishes an unprecedented benchmark in joint and muscle care. We recognize that precise movement is crucial for optimal recovery and well-being. By integrating RejoyMotion™ technology, we deliver unrivaled accuracy and effectiveness in our programs. This advanced technology enhances joint and muscle care, enabling individuals to achieve their health goals with unparalleled precision. Our commitment to incorporating RejoyMotion™ technology sets us apart in providing exceptional care for joint and muscle health."
          custom={
            <div className="mt-4">
              <ButtonLink
                href={ROUTES.PRECISION_MOTION_TECHNOLOGY}
                text="Learn More"
              />
            </div>
          }
          img={PreciseMotion}
          imgAlt="Precision Motion Technology"
        />

        <RightImageSection
          heading="Digital Physical Therapy"
          para="Rejoy Health's Digital Therapist leverages artificial intelligence to provide real-time feedback, making movement an effective form of medicine. By capturing detailed movement data, the therapist can customize the program based on actual performance, eliminating guesswork and maximizing relief."
          custom={
            <div className="mt-4">
              <ButtonLink
                href={ROUTES.DIGITAL_PHYSICAL_THERAPY}
                text="Learn More"
              />
            </div>
          }
          img={DigitalTherapy}
          imgAlt="Digital Physical Therapy"
        />
        <LeftImageSection
          heading="Targeted Musculoskeletal Care"
          para="Use our therapeutic exercises created by professional PTs to manage your back and joint pains. Our AI system and computer vision leave you at ease that you are performing the exercises properly."
          custom={
            <div className="mt-4">
              <ButtonLink href={ROUTES.MUSCULOSKELETAL} text="Learn More" />
            </div>
          }
          img={Musculoskeletal}
          imgAlt="Targeted Musculoskeletal Care"
        />
        <RightImageSection
          heading="On Call"
          para="When immediate relief is essential, our on-demand team of Physical Health Specialists is readily available. Offering round-the-clock text-based support across three continents, patients can access high-quality care precisely when and where they require it. Say goodbye to waiting on hold or speaking with unqualified individuals beforehand."
          custom={
            <div className="mt-4">
              <ButtonLink href={ROUTES.ON_CALL} text="Learn More" />
            </div>
          }
          img={OnCall}
          imgAlt="On Call"
        />
        <LeftImageSection
          heading="Move more and get rewared"
          para="About half of musculoskeletal (MSK) pain can be attributed to insufficient physical activity, with 80% of adults falling short of the recommended daily minimum of 20-25 minutes. This underscores a fundamental factor contributing to the global epidemic of physical pain. Movement is integral for promoting longevity, well-being, and a life free from discomfort. Our move program is designed to enhance and sustain physical health and prevent health risks."
          custom={
            <div className="mt-4">
              <ButtonLink href={ROUTES.MOVE_AND_EARN} text="Learn More" />
            </div>
          }
          img={Move}
          imgAlt="Move"
        />
      </Container>
    </Section>
  );
};

export default OurSolutions;
