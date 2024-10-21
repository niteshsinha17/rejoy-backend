import { Container, Section } from "@/components";
import Image from "next/image";
import Img from "../../../public/images/in-center-visits/patient-getting-treatment-massage.jpg";

const Card = (props) => {
  return (
    <div className="mt-4">
      <h5 className="heading-5">{props.heading}</h5>
      <p className="body-2 text-sm mt-1 max-w-md">{props.text}</p>
    </div>
  );
};

const Benefits = () => {
  return (
    <Section>
      <Container>
        <h2 className="text-center heading-2">
          Experience the numerous benefits of
          <br />
          <span className="text-primary">in-center visits at ReJoy</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 items-center">
          <div>
            <Card
              heading="Convenient access and scheduling:"
              text="Say goodbye to long wait times and schedule conflicts. Our dedicated center offers flexible appointment options, including evenings and weekends, so you can easily fit your visits into your busy schedule."
            />
            <Card
              heading="Comprehensive assessments:"
              text="In-center visits allow for thorough physical examinations and assessments, enabling our healthcare professionals to gain a comprehensive understanding of your needs. This ensures that your care is tailored to your specific condition and goals."
            />
            <Card
              heading="Personalized treatment plans:"
              text="With in-center visits, our healthcare professionals can provide hands-on therapies and interventions, maximizing the effectiveness of your treatment plan and helping you achieve optimal outcomes."
            />
            <Card
              heading="Collaborative care:"
              text="ReJoy ensures seamless coordination of care by integrating digital and in-center visits through our dedicated care team. Your treatment plan will be consistently monitored and adjusted to meet your evolving needs."
            />
          </div>
          <div>
            <Image
              src={Img}
              alt="Patient getting treatment massage"
              className="rounded-xl w-[100%]"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Benefits;
