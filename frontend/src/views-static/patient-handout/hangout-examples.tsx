import { Container, Section } from "@/components";

const hangouts = [
  {
    title: "Managing Type 2 Diabetes with Lifestyle Changes and Medications",
    description:
      "Our handout will help patients understand how lifestyle changes—such as improving diet, increasing physical activity, and monitoring blood glucose—can significantly impact their condition. We'll also explain the role of medications in managing blood sugar levels, including common types of oral medications and injectable treatments.",
  },
  {
    title: "Coping with Hypertension: Tips for Lowering Your Blood Pressure",
    description:
      "If your patient has high blood pressure, we can create a comprehensive handout that covers lifestyle modifications (such as reducing salt intake and stress management), along with medication options (like ACE inhibitors, calcium channel blockers, and diuretics).",
  },
  {
    title: "Understanding Asthma: Triggers, Medications, and Emergency Care",
    description:
      "For patients with asthma, we will help you create a handout that explains how to avoid asthma triggers, use inhalers correctly, and manage flare-ups with medications like bronchodilators and corticosteroids.",
  },
];

const HangoutExamples = () => {
  return (
    <Section noBottomPadding>
      <Container>
        <div className="text-center">
          <h2 className="text-black">Managing Chronic Conditions</h2>
          <p className="body-1 mt-2 max-w-2xl text-textSecondary mx-auto">
            Living with chronic conditions can be overwhelming, and patients often need clear guidance on how to manage their health. Here
            are some of the most common patient handouts we can help you create:
          </p>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-3">
          {hangouts.map((hangout, index) => (
            <div
              key={index}
              className="p-4 border rounded-2xl"
            >
              <div>
                <h3 className="text-sm font-semibold text-primary">{hangout.title}</h3>
                <p className="text-sm mt-2">{hangout.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default HangoutExamples;
