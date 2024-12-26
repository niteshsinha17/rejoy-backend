"use client";
import { Container, Section } from "@/components";
import { Button } from "@/ui";
import { CircleHelp } from "lucide-react";
import { useState } from "react";

const questionAndAnswers = [
  {
    question:
      "Is there an association between testosterone levels and the risk of cardiovascular events like heart attacks, strokes, or cardiovascular mortality?",
    answer:
      "Some studies suggest that low testosterone levels may be associated with an increased risk of cardiovascular events, while others indicate that high testosterone levels could also contribute to cardiovascular risk. The relationship is complex and not fully understood. More research is needed to definitively determine how testosterone influences the risk for myocardial infarction, stroke, and other cardiovascular outcomes. Clinicians should evaluate individual patient factors when considering testosterone therapy.",
  },
  {
    question: "What are the potential health risks of using GLP-1 receptor agonists, such as Ozempic or Mounjaro?",
    answer:
      "GLP-1 receptor agonists, while effective in managing type 2 diabetes and promoting weight loss, can carry potential risks such as gastrointestinal side effects (nausea, vomiting, diarrhea), pancreatitis, and a possible increased risk of thyroid cancer in animal studies (though human studies have not consistently shown this). These drugs should be prescribed cautiously in patients with a history of pancreatitis, thyroid disorders, or gastrointestinal diseases.",
  },
  {
    question: "How does maternal obesity impact pregnancy outcomes and fetal development?",
    answer:
      "Maternal obesity significantly increases the risk of complications during pregnancy, including gestational diabetes, hypertension, preeclampsia, and preterm birth. It can also impact fetal development, potentially leading to macrosomia (large baby size), birth defects, and long-term health risks for the child, such as obesity and type 2 diabetes. Weight management before and during pregnancy can help reduce these risks.",
  },
  {
    question: "How does antibiotic resistance affect the treatment of community-acquired pneumonia?",
    answer:
      "Antibiotic resistance poses a major challenge in treating community-acquired pneumonia (CAP), as resistant bacteria may not respond to first-line antibiotics. The prevalence of resistant strains (e.g., penicillin-resistant Streptococcus pneumoniae) requires careful selection of empiric therapy, often involving broader-spectrum antibiotics or combination therapies, while also considering local resistance patterns. Susceptibility testing is important for guiding treatment.",
  },
  {
    question: "What factors should be considered when choosing an antibiotic for a suspected bacterial infection?",
    answer:
      "When selecting an antibiotic, factors such as the likely pathogen, the patient’s allergy history, the severity of the infection, the patient’s renal and hepatic function, and local antibiotic resistance patterns must all be considered. Additionally, the pharmacokinetics and pharmacodynamics of the antibiotic, including tissue penetration and half-life, should be evaluated for effectiveness in treating the specific infection.",
  },
  {
    question: "What biomarkers are useful for distinguishing between heart failure exacerbation and other causes of shortness of breath?",
    answer:
      "Key biomarkers for differentiating heart failure exacerbation from other causes of dyspnea include BNP (B-type natriuretic peptide) and proBNP, which are elevated in heart failure. Other tests, such as D-dimer, troponins, and arterial blood gases (ABG), can help rule out pulmonary embolism, acute coronary syndrome, or respiratory infections as causes of dyspnea.",
  },
  {
    question: "What are the critical considerations when prescribing antibiotics for patients with multiple chronic conditions?",
    answer:
      "For patients with multiple comorbidities, antibiotic therapy should account for drug interactions, renal or hepatic function, the risk of adverse effects, and the presence of resistant organisms. The antibiotic’s spectrum of activity should be carefully selected, considering both the infection and the patient's comorbid conditions. Monitoring for side effects, dose adjustments, and choosing agents that are less likely to exacerbate existing conditions (e.g., avoiding nephrotoxic antibiotics in renal disease) is essential.",
  },
  {
    question: "How do comorbid conditions, such as chronic kidney disease (CKD) or diabetes, affect the treatment of heart failure?",
    answer:
      "The presence of comorbid conditions like CKD and diabetes complicates the management of heart failure. Renal impairment may require dose adjustments for heart failure medications (e.g., ACE inhibitors, diuretics), and certain drugs may need to be avoided or used cautiously (e.g., potassium-sparing diuretics). Diabetes management should also be tailored to avoid exacerbating heart failure, and careful monitoring is needed for drug interactions or worsening kidney function. Comprehensive care requires a multi-disciplinary approach to optimize treatment.",
  },
  {
    question: "How does diabetes influence the choice of antihypertensive medication in patients with high blood pressure?",
    answer:
      "In patients with both diabetes and hypertension, first-line treatment often involves ACE inhibitors or angiotensin II receptor blockers (ARBs), as these drugs offer kidney protection and help reduce the risk of diabetic nephropathy. Calcium channel blockers and diuretics may also be used depending on the patient's overall cardiovascular and renal health. The goal is to control both blood pressure and blood glucose levels while minimizing side effects.",
  },
  {
    question: "What factors are important when considering testosterone therapy in men with low testosterone levels?",
    answer:
      "When considering testosterone therapy, factors such as the patient’s age, underlying cardiovascular risk, presence of comorbid conditions (e.g., prostate cancer, sleep apnea, or metabolic syndrome), and baseline testosterone levels are essential. The potential benefits, such as improved energy, muscle mass, and libido, should be weighed against risks like exacerbating cardiovascular disease or increasing the risk of prostate cancer. Long-term monitoring is recommended to assess for any adverse effects.",
  },
];

const QNA = () => {
  const [visibleQuestions, setVisibleQuestions] = useState(3);

  const showMoreQuestions = () => {
    setVisibleQuestions((prev) => prev + 5);
  };

  return (
    <div className="bg-secondary">
      <Section>
        <Container>
          <h2 className="text-black text-center">Recently Asked Questions</h2>
          <div className="space-y-4 mt-6">
            {questionAndAnswers.slice(0, visibleQuestions).map((qa, index) => (
              <Question
                key={index}
                question={qa.question}
                answer={qa.answer}
              />
            ))}
          </div>
          {visibleQuestions < questionAndAnswers.length && (
            <div className="text-center mt-4">
              <Button onClick={showMoreQuestions}>Show More</Button>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
};

function Question({ question, answer }) {
  return (
    <div>
      <div className="text-sm md:text-base text-black font-medium">
        <div className="flex items-start gap-1">
          <CircleHelp />
          {question}
        </div>
      </div>
      <p className="mt-4 text-sm">{answer}</p>
    </div>
  );
}

export default QNA;
