import GirlImage from "@/../public/images/prepare-for-moc-exam/girl.png";
import { Container, Section } from "@/components";
import Image from "next/image";

const reasons = [
  {
    title: "Expert-Driven Guidance",
    description:
      "Our platform provides expert-backed insights into the most relevant lab tests for a wide variety of medical conditions, ensuring that you get the right information every time.",
  },
  {
    title: "Comprehensive and Evidence-Based Answers",
    description:
      "We use the latest clinical guidelines, peer-reviewed studies, and best practices to inform our answers, ensuring that you have access to the most reliable evidence when choosing lab tests.",
  },
  {
    title: "Save Time and Improve Accuracy",
    description:
      "With our easy-to-understand guidance, you can quickly determine which lab tests are most appropriate for your patient’s condition, improving your diagnostic accuracy and patient outcomes.",
  },
  {
    title: "Stay Up-to-Date with Current Practices",
    description:
      "The medical field is constantly evolving, and so are lab testing protocols. Rejoy Health helps you stay current with the latest recommendations, practices, and technologies in laboratory diagnostics.",
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
              <h2 className="text-black max-md:text-center">Why Ask About Labs at Rejoy Health?</h2>
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
