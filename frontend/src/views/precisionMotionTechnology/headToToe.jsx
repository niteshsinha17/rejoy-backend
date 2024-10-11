import { Container, Section } from "@/components";
import Image from "next/image";
import Back from "../../../public/images/musculoskeletal/back.png";
import HipAndKnee from "../../../public/images/musculoskeletal/hip-knee.png";
import Neck from "../../../public/images/musculoskeletal/neck.png";
import WristAndHand from "../../../public/images/musculoskeletal/wrist-hand.png";

const Card = (props) => {
  return (
    <div className="text-center">
      <Image
        width={100}
        height={100}
        className="h-[200px] w-auto m-auto"
        src={props.img}
        alt={props.text}
      />

      <h3 className="heading-5 text-center mt-4">{props.heading}</h3>
      <p className="body-2 text-center mt-2 max-w-md mx-auto">{props.text}</p>
    </div>
  );
};

const HeadToToe = () => {
  return (
    <div className="bg-[#eaf4f7]">
      <Section>
        <Container>
          <h2 className="text-center heading-2 text-textPrimary">From Head to Toe, We've Got It Covered</h2>

          <p className="text-center max-w-3xl mx-auto body-1 mt-4">
            No matter which area of your body requires attention, Rejoy is here to support you. Our targeted care addresses various regions,
            including:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
            <Card
              img={Back.src}
              heading="Back & Spine"
            />
            <Card
              img={HipAndKnee.src}
              heading="Hips & Knee"
            />
            <Card
              img={WristAndHand.src}
              heading="Hand and Wrist"
            />
            <Card
              img={Neck.src}
              heading="Neck & joints"
            />
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default HeadToToe;
