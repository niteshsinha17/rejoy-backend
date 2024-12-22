import { Container, Section } from "@/components";

const examples = [
  {
    question: "What are the latest advancements in gene therapy for treating muscular dystrophy?",
    answer: "Learn about cutting-edge developments in rare disease treatments.",
  },
  {
    question: "How does Kawasaki disease affect children, and what treatments are available?",
    answer: "Understand the symptoms, causes, and treatment options for pediatric conditions.",
  },
  {
    question: "What role does gut health play in autoimmune diseases like rheumatoid arthritis?",
    answer: "Explore how current research connects gut microbiota to immune system disorders.",
  },
  {
    question: "How effective are new immunotherapies for treating advanced lung cancer?",
    answer: "Stay informed about innovative therapies and their impact on patient outcomes.",
  },
  {
    question: "What recent studies explain the link between stress and cardiovascular health?",
    answer: "Discover how lifestyle factors influence chronic health conditions.",
  },
];

const Examples = () => {
  return (
    <Section noBottomPadding>
      <Container>
        <div className="text-center">
          <h2 className="text-black">What Do You Want to Research?</h2>
          <p className="mt-4 text-sm md:text-base">Here are examples of topics you can explore with Rejoy Health</p>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-3">
          {examples.map((example, index) => (
            <div
              key={index}
              className="p-4 border rounded-2xl hover:border-primary"
            >
              <div>
                <h3 className="text-lg font-semibold">{example.question}</h3>
                <p className="text-sm mt-2">{example.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Examples;
