import GirlImage from "@/../public/images/prepare-for-moc-exam/girl.png";
import { Container, Section } from "@/components";
import Image from "next/image";

const reasons = [
  {
    title: "Clear, Easy-to-Follow Instructions",
    description:
      "Our home care instructions are designed to be simple and easy for patients to follow. We avoid medical jargon and use a straightforward approach to ensure that all patients, regardless of literacy level, can understand their aftercare needs.",
  },
  {
    title: "Tailored to Your Patient’s Needs",
    description:
      "We customize each handout based on the patient’s specific condition or procedure. Whether it’s a sprain, surgery, asthma exacerbation, or chronic illness, we ensure the instructions are relevant and specific to the recovery process.",
  },
  {
    title: "Evidence-Based Guidance",
    description:
      "All of our home care instructions are based on trusted, evidence-based sources, ensuring that patients receive the most up-to-date, scientifically sound information.",
  },
  {
    title: "Promotes Better Patient Outcomes",
    description:
      "Clear, comprehensive aftercare instructions are linked to improved patient outcomes. By helping patients understand their recovery process, we enhance their adherence to treatment plans, reduce the likelihood of complications, and increase overall satisfaction with their care.",
  },
  {
    title: "Time-Saving",
    description:
      "Let us take care of writing the home care instructions so you can focus on delivering high-quality care. Our service helps you save time and ensure your patients get the information they need to recover well.",
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
                Why Choose Rejoy Health <br /> for Your Home Care Instructions?
              </h2>
              <div className="mt-4 grid sm:grid-cols-2">
                {reasons.map((reason, index) => (
                  <div
                    key={index}
                    className="p-4 pl-0"
                  >
                    <h3 className="text-black text-lg">{reason.title}</h3>
                    <p className="">{reason.description}</p>
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
