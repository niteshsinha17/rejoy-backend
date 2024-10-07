import { Container, Section } from "@/components";
import Image from "next/image";
import AreaOfPain from "../../../public/images/musculoskeletal/area-of-pain.png";
import CostSaving from "../../../public/images/musculoskeletal/cost-saving.png";
import Feedback from "../../../public/images/musculoskeletal/feedback.png";
import ReduceSurgeryIntent from "../../../public/images/musculoskeletal/reduce-surgery-intent.png";
import SpotPainReduction from "../../../public/images/musculoskeletal/spot-pain.png";

const Card = (props) => {
  return (
    <div className="p-5 text-center">
      <Image
        className="w-[150px] mx-auto"
        src={props.image}
        alt={props.alt}
      />

      <div className="text-xl font-bold mt-4 text-primary">{props.text1}</div>
      <div className="text-xl mt-2 font-medium">{props.text2}</div>
    </div>
  );
};

const ProvenOutcomes = () => {
  return (
    <Section>
      <Container>
        <h2 className="heading-2 text-center">
          Better And Proven <span className="text-primary">OutComes</span>
        </h2>

        <p className="body-1 mt-4 text-center">
          Not only do our at-home and automated physical therapy produce better outcomes, it also offers increased convenience and
          accessibility for patients, as well as the ability to be more consistent with treatment. In addition, it is more cost-effective.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mt-6">
          <Card
            image={CostSaving}
            alt="cost-saving"
            text1="42%"
            text2="Cost Saving"
          />
          <Card
            image={ReduceSurgeryIntent}
            alt="reduce-surgery-intent"
            text1="57%"
            text2="Reduce Surgery Intent"
          />
          <Card
            image={SpotPainReduction}
            alt="spot-pain-reduction"
            text1="59%"
            text2="Spot Pain Reduction"
          />

          <Card
            image={Feedback}
            alt="feedback"
            text1="9.8/10"
            text2="Patient Satisfaction"
          />

          <Card
            image={AreaOfPain}
            alt="area-of-pain"
            text1="97%"
            text2="Improved Area of Pain"
          />
        </div>
      </Container>
    </Section>
  );
};

export default ProvenOutcomes;
