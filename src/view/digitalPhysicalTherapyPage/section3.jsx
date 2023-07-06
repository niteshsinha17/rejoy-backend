import { Container, Section } from "@/components";
import LeftImageSection from "@/components/leftImageSection";
import RightImageSection from "@/components/rightImageSection";
import DataCollection from "../../../public/images/digital-tharapy/data-collection.png";
import MotionSensor from "../../../public/images/digital-tharapy/motion-sensor.png";
import RealtimeFeeback from "../../../public/images/digital-tharapy/realtime-feedback.png";
import AiTherapist from "../../../public/images/digital-tharapy/therapist.png";

const Section3 = () => {
  return (
    <Section noBottomPadding>
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
            heading="Computer Vision"
            para="This cutting-edge technology ensures real-time monitoring of your actions, granting invaluable insights into your performance. By capturing even the subtlest nuances of your motion, our AI-powered detector maximizes the accuracy of its assessments. With its unparalleled precision, our motion detector AI revolutionizes the way you measure and enhance your physical capabilities."
            img={MotionSensor}
            imgAlt="Computer Vision"
          />
          <RightImageSection
            heading="AI Therapist"
            para="Powered by artificial intelligence, our Digital Therapist uses the data from motion sensors to provide real-time feedback, offering guidance and making adjustments as needed."
            img={AiTherapist}
            imgAlt="AI Therapist"
          />
          <LeftImageSection
            heading="Comprehensive Data Collection"
            para="Our state-of-the-art technology captures a wide range of measurements, ensuring precise monitoring and progress tracking. From velocity and acceleration to joint angles and body positioning, our AI system meticulously records every aspect of your movement. With this comprehensive data, you can gain deeper insights into your performance and make informed adjustments to achieve optimal results."
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
