import { Container, Section } from "@/components";
import { Routes } from "@/enum";
import { ArrowRightIcon } from "@/icons";
import { BookCheck, CircleHelp, ClipboardCheck, FlaskConical, NotebookPen, SearchCheck } from "lucide-react";
import Link from "next/link";

export const aiBotUseCases = [
  {
    title: "Research a Topic",
    description: "Explore complex medical topics with AI-powered summaries, saving time and ensuring accuracy.",
    icon: <SearchCheck />,
    route: Routes.RESEARCH_TOPIC,
  },
  {
    title: "Prepare for MOC Exams",
    description: "Receive customized exam prep materials, mock questions, and quick explanations tailored to your needs.",
    icon: <BookCheck />,
    route: Routes.PREPARE_FOR_MOC_EXAM,
  },
  {
    title: "Write a Patient Handout",
    description: "Draft clear, concise, and patient-friendly health information to improve understanding and engagement.",
    icon: <ClipboardCheck />,
    route: Routes.WRITE_PATIENT_HANDOUT,
  },
  {
    title: "Write Home Care Instructions",
    description: "Generate specific, actionable post-care guidelines to support patient recovery and safety.",
    icon: <NotebookPen />,
    route: Routes.WRITE_HOME_CARE_INSTRUCTIONS,
  },
  {
    title: "Ask for Evidence",
    description: "Instantly access credible, evidence-based studies and resources to support medical decisions.",
    icon: <CircleHelp />,
    route: Routes.ASK_FOR_EVIDENCE,
  },
  {
    title: "Ask About Labs to Consider",
    description: "Get expert recommendations for diagnostic tests relevant to symptoms and conditions.",
    icon: <FlaskConical />,
    route: Routes.ASK_LABS_TO_CONSIDER,
  },
];

const Examples = () => {
  return (
    <Section noBottomPadding>
      <Container>
        <h2 className="text-center text-black">Endless Use Cases</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {aiBotUseCases.map((feature, index) => (
            <div
              key={index}
              className="p-4 border rounded-2xl"
            >
              <div>
                <div className="h-[80px] w-[80px] rounded-2xl bg-blue-100 flex justify-center items-center">
                  <div className="h-[50px] w-[50px] flex justify-center items-center text-white bg-primary rounded-2xl">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
                <p className="text-sm mt-2">{feature.description}</p>

                <Link
                  className="flex items-center mt-4 text-sm text-primary"
                  href={feature.route}
                >
                  Learn more
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Examples;
