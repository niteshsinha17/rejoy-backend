import GirlImage from "@/../public/images/prepare-for-moc-exam/girl.png";
import { Container, Section } from "@/components";
import Image from "next/image";

const reasons = [
  {
    title: "Expertly Written Content",
    description:
      "Our world class AI ensures that every patient handout is based on reliable, evidence-based sources and is written in an easy-to-understand language suitable for patients of all literacy levels.",
  },
  {
    title: "Custom Tailored to Your Needs",
    description:
      "Each handout is customized to address the specific needs of your patients, whether it’s related to a chronic condition, surgery, medication, or healthy lifestyle change.",
  },
  {
    title: "Time-Saving",
    description:
      "We save you time by handling the creation of patient handouts, allowing you to focus more on patient care and less on administrative tasks.",
  },
  {
    title: "Comprehensive Topics",
    description:
      "We cover a broad range of topics from medication management to lifestyle changes, preventive care, post-operative recovery, and more, ensuring your patients are fully informed.",
  },
  {
    title: "Promotes Better Patient Engagement",
    description:
      "Well-informed patients are more likely to follow treatment plans, attend follow-up appointments, and achieve better health outcomes. Our handouts help foster patient engagement and improve overall care.",
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
                Why Choose Rejoy Health for <br />
                Your Patient Handouts?
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
