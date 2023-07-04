import { Container, Section } from "@/components";
import LeftImageSection from "@/components/leftImageSection";
import RightImageSection from "@/components/rightImageSection";

const Features = () => {
  return (
    <Section>
      <Container>
        <h2 className="text-center heading-2">
          Immediate help,{" "}
          <span className="text-primary">at your fingertips.</span>
        </h2>

        <LeftImageSection
          heading="Text-based communication"
          para="Rejoy provides a convenient text-based communication platform for you to connect with our team of experts. Through this intuitive interface, you can easily convey your pain concerns and receive prompt responses, ensuring a seamless and efficient communication experience."
        />
        <RightImageSection
          heading="Clinical Pain Specialists"
          para="At Rejoy, we have a dedicated team of highly skilled Clinical Pain Specialists who are trained to assess and address a wide range of pain conditions. With their expertise and specialized knowledge, they can offer personalized insights and treatment recommendations tailored to your specific needs."
        />
        <LeftImageSection
          heading="Answers and immediate action"
          para="When you reach out to Rejoy, you can expect more than just answers. Our Clinical Pain Specialists are committed to providing you with immediate action to alleviate your pain. Whether it's offering guidance, recommending exercises, or suggesting pain management techniques, they are ready to take swift steps to help you find relief."
        />
      </Container>
    </Section>
  );
};

export default Features;
