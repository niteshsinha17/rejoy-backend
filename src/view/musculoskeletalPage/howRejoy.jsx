import { Accordion, Container, Section } from "@/components";

export const HowRejoy = () => {
  return (
    <Section>
      <Container>
        <h2 className="heading-2 text-center">
          Empowering{" "}
          <span className="text-primary">Musculoskeletal Health</span>
        </h2>

        <p className="body-1 mt-4 text-center">
          Rejoy is a groundbreaking solution designed to address the challenges
          faced by individuals with musculoskeletal conditions. By providing
          personalized exercise programs tailored to the specific areas of
          discomfort, Rejoy aims to alleviate pain, enhance mobility, and
          improve overall musculoskeletal health.
        </p>

        <div className="mt-4">
          <Accordion
            heading="Personalized Approach"
            content="Rejoy understands that every individual's experience with musculoskeletal conditions is unique. That's why our platform takes into account the specific areas of pain and discomfort you're facing. By targeting these areas with personalized exercise programs, we ensure that you receive targeted care that addresses your individual needs."
          />
          <Accordion
            heading="Pain Management"
            content="One of the primary goals of Rejoy is to help you manage and reduce pain. Through a carefully designed exercise regimen, our platform focuses on strengthening the muscles surrounding the affected joints, improving flexibility, and enhancing overall body mechanics. By doing so, Rejoy aims to alleviate pain and provide relief, enabling you to perform daily activities with greater comfort."
          />
          <Accordion
            heading="Enhanced Mobility"
            content="Musculoskeletal conditions can significantly impact mobility, limiting your ability to move freely. Rejoy emphasizes exercises that improve joint range of motion, enhance flexibility, and promote functional movements. By incorporating these exercises into your personalized program, Rejoy aims to enhance your mobility and restore your ability to engage in activities that bring you joy."
          />
          <Accordion
            heading="Rehabilitation and Recovery"
            content="Rejoy recognizes the importance of rehabilitation and recovery in musculoskeletal conditions. Whether you're recovering from an injury or managing a chronic condition, our platform provides guided exercises that support your rehabilitation journey. By gradually increasing intensity and difficulty, Rejoy helps you regain strength, stability, and confidence in your body's abilities."
          />
          <Accordion
            heading="Tracking Progress and Adaptation"
            content="With Rejoy, monitoring your progress becomes effortless. The platform allows you to track your exercise performance, set goals, and measure improvements over time. Based on your feedback and progress, Rejoy adapts your exercise program to ensure continued challenge and growth, optimizing the effectiveness of your workouts."
          />
          <Accordion
            heading="Expert Guidance and Support"
            content="Rejoy provides access to a network of experienced healthcare professionals who specialize in musculoskeletal health. They are available to answer your questions, provide guidance, and offer support throughout your journey. With their expertise, you can have confidence in the exercises and recommendations tailored specifically to your needs."
          />
        </div>
      </Container>
    </Section>
  );
};

export default HowRejoy;
