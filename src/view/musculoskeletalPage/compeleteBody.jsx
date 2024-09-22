import { Container } from "@/components";
import Image from "next/image";
import Back from "../../../public/images/musculoskeletal/back.png";
import HipAndKnee from "../../../public/images/musculoskeletal/hip-knee.png";
import Neck from "../../../public/images/musculoskeletal/neck.png";
import WristAndHand from "../../../public/images/musculoskeletal/wrist-hand.png";

const Card = (props) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        width={200}
        height={200}
        className="h-[350px] w-auto"
        src={props.img}
        alt={props.text}
      />

      <h3 className="heading-5 text-center mt-4">{props.text}</h3>
    </div>
  );
};

const CompleteBody = () => {
  return (
    <div>
      <div className="bg-[#eaf4f7]">
        <div className="relative pt-[120px] pb-[120px] md:pb-[220px] md:mb-[220px]">
          <Container>
            <h2 className="heading-2 text-center">
              Targets all <br />
              <span className="text-primary">Body Parts</span>
            </h2>

            <p className="body-2 text-center mt-2 max-w-md mx-auto">
              Where are you experiencing pain? Our personalized exercise program focuses on the specific areas where you feel discomfort
            </p>

            <div className="md:absolute left-[0px] w-[100%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
              <Card
                img={Back.src}
                text="Back"
              />
              <Card
                img={HipAndKnee.src}
                text="Hip & Knee"
              />
              <Card
                img={WristAndHand.src}
                text="Wrist, Hand, Ancle & Foot"
              />
              <Card
                img={Neck.src}
                text="Neck, Shoulder & Elbow"
              />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default CompleteBody;
