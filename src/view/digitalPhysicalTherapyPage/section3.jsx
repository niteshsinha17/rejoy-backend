import { Container, Section } from "@/components";
import LeftImageSection from "@/components/leftImageSection";
import RightImageSection from "@/components/rightImageSection";
import DataCollection from "../../../public/images/digital-tharapy/data-collection.png";
import MotionSensor from "../../../public/images/digital-tharapy/motion-sensor.png";
import RealtimeFeeback from "../../../public/images/digital-tharapy/realtime-feedback.png";
import AiTherapist from "../../../public/images/digital-tharapy/therapist.png";

const Section3 = () => {
  return (
    <Section>
      <Container>
        <h2 className="heading-2 text-center">
          The Power of
          <br />
          <span className="text-primary"> Rejoy&apos;s Digital Therapist</span>
        </h2>

        <p className="body-1 mt-4 text-center">
          Cutting-Edge Technology for Effective Rehabilitation
        </p>

        <div className="mt-4">
          <LeftImageSection
            heading="Advanced Motion Sensors"
            para="Our wearable motion sensors accurately detect your movements during each session, enabling precise tracking and analysis."
            img={MotionSensor}
            imgAlt="Advanced Motion Sensors"
          />
          <RightImageSection
            heading="AI Therapist"
            para="Powered by artificial intelligence, our Digital Therapist uses the data from motion sensors to provide real-time feedback, offering guidance and making adjustments as needed."
            img={AiTherapist}
            imgAlt="AI Therapist"
          />
          <LeftImageSection
            heading="Comprehensive Data Collection"
            para="Our state-of-the-art technology captures a wide range of measurements, ensuring precise monitoring and progress tracking."
            img={DataCollection}
            imgAlt="Comprehensive Data Collection"
          />
          <RightImageSection
            heading="Real-Time Precision Feedback"
            para=" Experience the benefits of instant insights and guidance, as our Digital Therapist provides real-time feedback on your exercises, helping you optimize your performance and avoid injuries."
            img={RealtimeFeeback}
            imgAlt="Real-Time Precision Feedback"
          />
        </div>
      </Container>
    </Section>
  );
};

export default Section3;
