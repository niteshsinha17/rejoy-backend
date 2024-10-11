import { Container, Section } from "@/components";
import LeftImageSection from "@/components/leftImageSection";
import RightImageSection from "@/components/rightImageSection";
import Link from "next/link";
import Engaging from "../../../public/images/academy/engaging.png";
import Expert from "../../../public/images/academy/expert.png";
import Recommendations from "../../../public/images/academy/recommendations.png";
import VideoContent from "../../../public/images/academy/video-content.png";

const ButtonLink = (props) => {
  return (
    <Link
      className="text-lg bg-green py-3 px-6 text-white font-poppins font-semibold rounded-3xl hover:bg-yellow hover:text-textPrimary"
      href={props.href}
    >
      {props.text}
    </Link>
  );
};

const Features = () => {
  return (
    <Section>
      <Container>
        <h2 className="heading-2 text-center">
          Rejoy Free <span className="text-primary">Resources</span>
        </h2>
        <p className="body-1 mt-4 text-center max-w-4xl mx-auto">
          The Academy at Rejoy provides the highest quality physical health education and resources. Our goal is to empower you with
          knowledge, enabling you to prevent injuries, understand the root causes of pain, reduce your risks, and build healthy habits.
        </p>

        <LeftImageSection
          heading="Premium Video Content"
          para="Our platform offers an extensive collection of premium video content, designed to cater to your specific needs. You can explore a vast range of topics related to pain management, injury prevention, exercises for pain relief, and much more. With 10 new episodes added each month, you'll always have fresh and engaging content at your fingertips."
          img={VideoContent}
          imgAlt="Premium Video Content"
        />
        <RightImageSection
          heading="Engaging and Interactive Experience"
          para="At Rejoy, we understand that learning is most effective when it's engaging and actionable. Our platform provides an interactive experience, allowing you to learn and apply your knowledge in practical ways. Through interactive exercises, quizzes, and personalized recommendations, you'll be motivated and empowered to take control of your pain and improve your overall well-being."
          img={Engaging}
          imgAlt="Engaging and Interactive Experience"
        />
        <LeftImageSection
          heading="Expert Guidance"
          para="Rejoy is proud to collaborate with world-renowned experts in the field of physical health and pain management. Our team of experts delivers the most up-to-date and evidence-based information and inspiration to our community. You can trust that the content you receive is backed by the best in the business."
          img={Expert}
          imgAlt="Expert Guidance"
        />
        <RightImageSection
          heading="Personalized Recommendations"
          para="Our intelligent recommendation system takes into account your unique needs, preferences, and goals. Whether you're looking for targeted exercises, pain management techniques, or lifestyle adjustments, our personalized recommendations will guide you on your path to a pain-free life."
          img={Recommendations}
          imgAlt="Personalized Recommendations"
        />
      </Container>
    </Section>
  );
};

export default Features;
