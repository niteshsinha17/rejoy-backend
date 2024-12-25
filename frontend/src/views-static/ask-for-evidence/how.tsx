import { Container, Section } from "@/components";

const reasons = [
  {
    title: "For Healthcare Providers",
    description:
      "Access evidence-based guidelines and research to guide your clinical decision-making, enhance patient care, and stay current with medical advancements.",
  },
  {
    title: "For Patients",
    description:
      "If you’re trying to understand the benefits and risks of a treatment, therapy, or supplement, we provide clear, evidence-backed information to help you make informed decisions about your health.",
  },
  {
    title: "For Researchers and Students",
    description:
      "Rejoy Health can be an invaluable tool for compiling research, reviewing clinical trials, and staying updated on the latest studies in your field of interest.",
  },
];

const How = () => {
  return (
    <Section>
      <Container>
        <h2 className="text-black text-center">
          How Rejoy Health Helps You <br /> Make Evidence-Based Decisions
        </h2>

        <div className="mt-4 grid md:grid-cols-3 gap-5">
          {reasons.map((reason, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-primary">{reason.title}</h3>
              <p className="mt-2">{reason.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default How;
