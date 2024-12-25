import { Container, Section } from "@/components";

const examples = [
  {
    category: "Drug Safety and Efficacy",
    description:
      "Understanding the risks and benefits of medications is crucial for making informed decisions. We help you find evidence on the safety, effectiveness, and risks associated with a wide range of drugs.",
    questions: [
      {
        title: "What’s the evidence on bleeding risk with Acalbrutinib?",
        description:
          "Acalbrutinib is a Bruton's tyrosine kinase inhibitor used in the treatment of hematologic malignancies. We provide a detailed analysis of randomized controlled trials (RCTs) and observational studies examining its bleeding risk, along with comparisons to other treatments in the same class.",
      },
      {
        title: "What is the data supporting the use of low-dose aspirin for primary prevention of cardiovascular events?",
        description:
          "We provide evidence from pivotal randomized controlled trials (RCTs) like the ASPIRIN trial and the ARRIVE study to evaluate the benefits and risks of low-dose aspirin for preventing cardiovascular events in healthy individuals, helping you weigh its effectiveness versus potential adverse effects.",
      },
      {
        title: "What evidence exists for the use of metformin as a first-line treatment for Type 2 Diabetes?",
        description:
          "Metformin remains the cornerstone of Type 2 diabetes management. We review the primary evidence supporting its use, including large-scale clinical trials, guidelines from organizations like the American Diabetes Association, and long-term outcomes that demonstrate its effectiveness in controlling blood sugar levels.",
      },
    ],
  },
  {
    category: "Nutritional Supplements and Pregnancy",
    description:
      "Certain lifestyle interventions, including supplementation, can have significant implications for maternal and fetal health. We review the evidence behind popular supplements to help you make informed decisions.",
    questions: [
      {
        title: "What evidence supports choline supplementation during pregnancy?",
        description:
          "Choline is an essential nutrient important for fetal brain development. We summarize the available research on the role of choline in pregnancy, including studies on maternal and infant outcomes, as well as recommendations from health organizations regarding the recommended daily intake and supplementation guidelines.",
      },
      {
        title: "Does omega-3 fatty acid supplementation reduce the risk of preterm birth?",
        description:
          "Omega-3 fatty acids are widely recommended during pregnancy. We delve into the evidence surrounding omega-3 supplementation and its effects on reducing the risk of preterm birth, exploring key clinical trials and meta-analyses to provide a comprehensive view.",
      },
    ],
  },
  {
    category: "Preventive Medicine and Public Health",
    description:
      "Preventive treatments, such as vaccines and screenings, play a crucial role in reducing the burden of disease. We analyze the evidence supporting key preventive measures in healthcare.",
    questions: [
      {
        title: "What is the evidence for the efficacy of the HPV vaccine in preventing cervical cancer?",
        description:
          "The HPV vaccine has been shown to significantly reduce the incidence of cervical cancer. We provide detailed evidence from studies like the Gardasil 9 trial, population-based data, and the long-term outcomes of HPV vaccination in reducing cancer rates and preventing HPV infections.",
      },
      {
        title: "What randomized controlled trials support the use of statins for primary prevention of heart disease?",
        description:
          "Statins are commonly prescribed for primary prevention of cardiovascular events. We summarize the major RCTs, including the JUPITER trial and the HOPE-3 trial, to provide an evidence-based review of statin therapy in individuals without a prior history of cardiovascular disease.",
      },
    ],
  },
  {
    category: "Managing Chronic Diseases",
    description:
      "Chronic diseases require long-term management strategies, and understanding the best treatments is key to improving outcomes. We review the evidence that informs chronic disease management.",
    questions: [
      {
        title: "What is the evidence for the use of biologics in rheumatoid arthritis treatment?",
        description:
          "We explore the evidence supporting the use of biologics like adalimumab, etanercept, and tocilizumab in treating rheumatoid arthritis, highlighting key clinical trials, including long-term data on efficacy and safety.",
      },
      {
        title: "How effective are lifestyle changes in managing hypertension?",
        description:
          "Managing high blood pressure often involves both medication and lifestyle changes. We review the evidence supporting lifestyle modifications like diet (DASH), exercise, and weight loss in reducing blood pressure, referencing landmark studies and clinical guidelines.",
      },
    ],
  },
];

const Examples = () => {
  return (
    <Section noBottomPadding>
      <Container>
        <div className="text-center">
          <h2 className="text-black">Ask for Evidence on Any Healthcare Topic</h2>
          <p className="body-1 mt-2 max-w-2xl text-textSecondary mx-auto">
            At Rejoy Health, we empower you to ask for evidence on a wide variety of healthcare topics. Here are just a few examples of the
            types of questions we help answer with robust, evidence-backed data:
          </p>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-3">
          {examples.map((example, index) => (
            <div
              key={index}
              className="p-4 border rounded-2xl"
            >
              <div>
                <h3 className="text-lg font-semibold text-primary">{example.category}</h3>
                <p className="text-sm mt-2">{example.description}</p>
                <div className="mt-4">
                  {example.questions.map((question, qIndex) => (
                    <div
                      key={qIndex}
                      className="mt-4"
                    >
                      <h4 className="text-md font-semibold">{question.title}</h4>
                      <p className="text-sm mt-1">{question.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Examples;
