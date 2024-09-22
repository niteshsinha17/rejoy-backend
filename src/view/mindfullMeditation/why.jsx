import { Container, Section } from "@/components";
import LeftImageSection from "@/components/leftImageSection";
import RightImageSection from "@/components/rightImageSection";
import { ROUTES } from "@/enum";
import Link from "next/link";
import Expert from "../../../public/images/mindfull/expert.jpg";
import Levels from "../../../public/images/mindfull/levels.jpg";
import TotalWellness from "../../../public/images/mindfull/total-wellness.jpg";
import Video from "../../../public/images/mindfull/video-content.jpg";

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

const Why = () => {
  return (
    <Section>
      <Container>
        <h2 className="heading-2 text-center">
          Why Choose Rejoy Health <br />
          <span className="text-primary">for Mindful Meditation?</span>
        </h2>
        <p className="body-1 mt-4 text-center">
          At Rejoy Health, we understand that the journey to mindfulness and well-being is deeply personal. That's why we've crafted a
          mindful meditation experience that stands out. Here's why you should choose us:
        </p>
        <LeftImageSection
          heading="Expert Instructors"
          para="Our meditation instructors aren't just experts; they are seasoned practitioners who have dedicated their lives to the art of meditation. They have accumulated years of experience and are well-versed in a wide range of meditation techniques. When you join Rejoy Health, you can trust that you're receiving guidance from the best in the field. Our instructors will lead you on a transformative journey, sharing their wisdom and helping you unlock the full potential of meditation."
          img={Expert}
          imgAlt="Expert Instructors"
        />

        <RightImageSection
          heading="Convenient Online Sessions"
          para="We value your time and convenience. With Rejoy Health, there's no need to rush through traffic or adhere to rigid schedules. Our online meditation sessions are designed to fit seamlessly into your life. Whether you prefer to meditate in the early morning, during your lunch break, or in the quiet of the evening, you have the freedom to choose. Join our virtual sessions from the comfort of your own space, be it your living room, bedroom, or even your favorite park. We bring the meditation experience to you, ensuring that mindfulness is accessible and stress-free."
          img={Video}
          imgAlt="Convenient Online Sessions"
        />
        <LeftImageSection
          heading="Tailored to You"
          para="At Rejoy Health, we understand that everyone's meditation journey is unique. Our classes are designed to accommodate all levels, from beginners to experienced practitioners, ensuring that you receive personalized guidance and support."
          img={Levels}
          imgAlt="Tailored to You"
        />
        <RightImageSection
          heading="Total Wellness"
          para="We're not just about stress relief at Rejoy Health; we're committed to your overall well-being. Our Mindful Meditation program goes beyond stress reduction. It empowers you to achieve mental clarity, emotional harmony, and holistic health."
          img={TotalWellness}
          imgAlt="Total Wellness"
        />
      </Container>
    </Section>
  );
};

export default Why;
