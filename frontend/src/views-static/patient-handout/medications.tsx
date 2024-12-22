import { Container, Section } from "@/components";

const hangouts = [
  {
    title: "Understanding Blood Thinners: Use and Side Effects of Warfarin",
    description:
      "If your patient is prescribed warfarin (Coumadin) or another blood thinner, we can help you craft an easy-to-understand handout that explains how these medications help prevent blood clots, why monitoring is necessary, and what side effects to watch for—such as unusual bruising or bleeding.",
  },
  {
    title: "Managing Antibiotic Therapy: When and How to Take Your Medications",
    description:
      "This handout will provide clear guidance on taking antibiotics correctly, the importance of completing the full course of therapy, and potential side effects like nausea or allergic reactions.",
  },
  {
    title: "Medications for Depression: Understanding SSRIs and SNRIs",
    description:
      "For patients starting antidepressant therapy, we can create a patient handout that explains how medications like selective serotonin reuptake inhibitors (SSRIs) or serotonin-norepinephrine reuptake inhibitors (SNRIs) work, common side effects (such as dizziness or weight changes), and when to contact a doctor.",
  },
];

const MedicationsExamples = () => {
  return (
    <Section>
      <Container>
        <div className="text-center">
          <h2 className="text-black">How They Work and What to Expect</h2>
          <p className="body-1 mt-2 max-w-2xl text-textSecondary mx-auto">
            Understanding how medications work and the potential side effects is critical for patient safety and compliance. Rejoy Health
            can help create patient-friendly handouts for a variety of medications:
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

export default MedicationsExamples;
