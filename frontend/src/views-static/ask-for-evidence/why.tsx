import GirlImage from "@/../public/images/prepare-for-moc-exam/girl.png";
import { Container, Section } from "@/components";
import Image from "next/image";

const reasons = [
  {
    title: "Reliable, Up-to-Date Research",
    description:
      "We leverage a vast network of peer-reviewed journals, clinical trials, and authoritative medical guidelines to provide the most current and accurate evidence available. You can count on us for answers that reflect the latest advancements in healthcare.",
  },
  {
    title: "Clear and Concise Information",
    description:
      "Medical literature can be dense and difficult to interpret. At Rejoy Health, we break down complex research into easy-to-understand summaries, helping you quickly grasp the key findings without feeling overwhelmed.",
  },
  {
    title: "Comprehensive Answers to Your Healthcare Questions",
    description:
      "Whether you’re seeking data on a specific medication, treatment protocol, or preventive measure, we offer detailed, evidence-backed answers to all your healthcare queries. Our answers come with references to peer-reviewed sources, ensuring transparency and reliability.",
  },
  {
    title: "Expert-Led Insights",
    description:
      "Our AI stays on top of the latest studies, clinical trials, and treatment guidelines, ensuring that you receive the most up-to-date and well-supported information.",
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
                Why Trust Rejoy Health for <br /> Evidence-Based Answers?
              </h2>
              <p className="mt-2">
                Creating clear, informative, and accurate patient handouts is crucial to improving patient outcomes and satisfaction. Here’s
                why healthcare providers trust Rejoy Health for their patient education needs:
              </p>
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
