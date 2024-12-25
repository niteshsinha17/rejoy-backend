import GirlImage from "@/../public/images/prepare-for-moc-exam/girl.png";
import { Container, Section } from "@/components";
import Image from "next/image";

const reasons = [
  {
    title: "Access to the Latest Research",
    description:
      "We bring you the latest evidence from reputable clinical studies, systematic reviews, and guidelines. Our answers are always based on the most current data available, so you can stay informed with confidence.",
  },
  {
    title: "Evidence Simplified",
    description:
      "We take complex studies and distill the key findings, providing you with concise, actionable insights that are easy to understand. Whether you're a clinician or a patient, our evidence summaries are designed to be practical and helpful.",
  },
  {
    title: "Trustworthy Sources",
    description:
      "All the evidence we provide comes from peer-reviewed journals, government health organizations, and trusted medical databases, ensuring the information is not only accurate but also credible.",
  },
  {
    title: "A Holistic Approach to Health",
    description:
      "From drug safety to lifestyle changes, nutrition, and chronic disease management, we cover all aspects of healthcare. No matter your question, we provide answers based on solid evidence and best practices.",
  },
];

const WhyAsk = () => {
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
              <h2 className="text-black max-md:text-center">Why Ask for Evidence at Rejoy Health?</h2>
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

export default WhyAsk;
