import { Container, Section } from "@/components";

const Section2 = () => {
  return (
    <Section>
      <Container>
        <h2 className="heading-2 text-center">
          What is
          <span className="text-primary"> Rejoy Digital Physical Therapy?</span>
        </h2>
        <p className="body-1 text-center mt-4 ">
          Rejoy Digital Physical Therapy (DPT) combines the expertise of our
          human Physical Therapists with our cutting-edge AI-powered Digital
          Therapist. This unique blend ensures you receive the highest-quality,
          individualized clinical physical rehabilitation, accessible at your
          convenience and location of choice.
        </p>
      </Container>
    </Section>
  );
};

export default Section2;
