import GirlImage from "@/../public/images/prepare-for-moc-exam/girl.png";
import { Container, Section } from "@/components";
import Image from "next/image";

const reasons = [
  {
    title: "Instant, Conversational Answers",
    description: "Clear, precise responses to complex clinical questions in a user-friendly format.",
  },
  {
    title: "Trusted Medical Content",
    description: "Evidence-based information sourced from reliable guidelines and medical literature.",
  },
  {
    title: "Focused Preparation",
    description: "Strengthen your critical thinking and decision-making with real-world case-based questions.",
  },
  {
    title: "Efficiency Made Easy",
    description: "Save time with direct, actionable insights to sharpen your clinical knowledge.",
  },
];

const Why = () => {
  return (
    <div className="bg-slate-100">
      <Section>
        <Container>
          <div className="flex">
            <div className="max-md:hidden">
              <Image
                src={GirlImage}
                alt="girl"
                width={400}
                height={400}
                className="h-auto"
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <h2 className="text-black max-md:text-center">
                Why Choose Rejoy Health <br /> for Your Exam Prep?
              </h2>
              <div className="mt-4 grid sm:grid-cols-2">
                {reasons.map((reasons, index) => (
                  <div
                    key={index}
                    className="p-4 pl-0"
                  >
                    <h3 className="text-black text-lg">{reasons.title}</h3>
                    <p className="">{reasons.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Why;
