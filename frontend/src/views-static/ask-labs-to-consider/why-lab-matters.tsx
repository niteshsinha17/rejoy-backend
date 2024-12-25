import { Container, Section } from "@/components";

const reasons = [
  "Diagnosing conditions that may not be immediately apparent through physical examination alone.",
  "Monitoring disease progression, ensuring treatment effectiveness, and adjusting therapies as necessary.",
  "Screening for underlying health issues, especially in patients with risk factors or vague symptoms.",
];

const WhyLabMatters = () => {
  return (
    <Section>
      <Container>
        <h2 className="text-black text-center">Why Ask for Evidence at Rejoy Health?</h2>
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="p-4 bg-blue-100 rounded-lg"
            >
              <p className="">{reason}</p>
            </div>
          ))}
        </div>

        <p className="text-center body-1 mt-2 max-w-2xl text-textSecondary mx-auto">
          At Rejoy Health, we provide expert guidance on the most relevant and reliable lab tests for a wide array of conditions, ensuring
          that you have the tools to make informed, evidence-based decisions.
        </p>
      </Container>
    </Section>
  );
};

export default WhyLabMatters;
