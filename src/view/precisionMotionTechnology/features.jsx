import { Container, Section } from "@/components";
import LeftImageSection from "@/components/leftImageSection";
import RightImageSection from "@/components/rightImageSection";
import ConfidenceBuilding from "../../../public/images/precision-motion-technology/confidence-building.png";
import Feedback from "../../../public/images/precision-motion-technology/feedback.png";
import MotionTracking from "../../../public/images/precision-motion-technology/motion-tracking.png";
import classes from "./features.module.css";

const Features = () => {
  return (
    <Section>
      <Container>
        <h2 className="text-center heading-2">
          Features of Precision Motion Technology
        </h2>
        <div className={classes.motionTracking}>
          <LeftImageSection
            heading="Motion Tracking"
            para="Our cutting-edge system utilizes computer vision and AI-powered sensors to track your movements in real-time during each exercise. With precise motion tracking, you can ensure proper form, engage more effectively, and achieve optimal results."
            img={MotionTracking.src}
            imgAlt="Motion Tracking"
          />
        </div>
        <RightImageSection
          heading="Real-time Feedback"
          para="Our innovative technology provides immediate guidance and analysis for every exercise you perform. With instant feedback on your form, technique, and engagement, you can make adjustments on the spot and maximize your workout's effectiveness."
          img={Feedback.src}
          imgAlt="Real-time Feedback"
        />
        <LeftImageSection
          heading="Confidence Building Technology"
          para="Immerse yourself in real-time audio and visual feedback that ensures precise execution of each exercise. With our confidence-building technology, you'll elevate your joint and muscle care to unprecedented levels."
          img={ConfidenceBuilding.src}
          imgAlt="Confidence Building Technology"
        />
      </Container>
    </Section>
  );
};

export default Features;
