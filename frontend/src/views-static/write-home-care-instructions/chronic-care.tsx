import { Container, Section } from "@/components";

const chronicCareHangouts = [
  {
    title: "Aftercare for a Mild Asthma Exacerbation: Using Your Inhaler Correctly and Recognizing Red Flags",
    description:
      "After an asthma flare-up, it's crucial that patients understand how to properly use their inhalers, when to take their prescribed medications, and how long to continue their treatment. We'll provide instructions on recognizing red flags (like increased shortness of breath or difficulty speaking) and when it’s time to seek emergency care.",
  },
  {
    title: "Managing COPD Flare-Ups at Home: Breathing Exercises, Medications, and Emergency Signs",
    description:
      "This handout will help patients with chronic obstructive pulmonary disease (COPD) manage flare-ups, highlighting the importance of medication adherence, performing breathing exercises, and knowing when to go to the hospital for emergency care.",
  },
  {
    title: "Aftercare for Hypertension: Tips for Monitoring and Managing Blood Pressure at Home",
    description:
      "For patients recovering from a hypertensive crisis or newly diagnosed with high blood pressure, we'll create clear instructions on how to monitor their blood pressure, follow their prescribed treatment regimen, and make necessary lifestyle changes.",
  },
];

const ChronicCare = () => {
  return (
    <div className="bg-slate-100">
      <Section>
        <Container>
          <h2 className="text-black text-center">
            Managing Chronic Conditions <br />
            and Exacerbations
          </h2>
          <p className="body-1 mt-2 max-w-2xl text-center text-textSecondary mx-auto">
            For patients with chronic conditions, flare-ups or exacerbations can be frightening, but with the right home care instructions,
            they can often be managed effectively. Rejoy Health can help you create thorough aftercare guidelines for managing chronic
            diseases at home:
          </p>
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            {chronicCareHangouts.map((hangout, index) => (
              <div
                key={index}
                className="p-4 border border-slate-300 rounded-2xl"
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
    </div>
  );
};

export default ChronicCare;
