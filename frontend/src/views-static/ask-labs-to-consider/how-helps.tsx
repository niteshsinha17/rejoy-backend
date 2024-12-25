"use client";

import HeartImg from "@/../public/images/ask-labs-to-consider/heart.jpg";
import HypertensionImg from "@/../public/images/ask-labs-to-consider/hypertension.jpg";
import WeaknessImg from "@/../public/images/ask-labs-to-consider/weakness.jpg";
import { Container, Section } from "@/components";
import LeftImageSection from "@/components/leftImageSection";
import RightImageSection from "@/components/rightImageSection";

const AcuteHeartFailure = () => (
  <LeftImageSection
    img={HeartImg.src}
    imgAlt="Heart failure"
    heading="Labs for Acute Heart Failure Exacerbation"
    custom={
      <div>
        <p className="mt-2">
          Heart failure is a serious condition that often requires careful monitoring during periods of acute exacerbation. Specific labs
          help to assess cardiac function, fluid balance, and organ function.
        </p>
        <ul className="list-disc mt-2 space-y-2 pl-5">
          <li>BNP or proBNP (B-type natriuretic peptide): To assess the severity of heart failure.</li>
          <li>Complete Blood Count (CBC): To evaluate for anemia or infection.</li>
          <li>Renal function tests (creatinine, BUN): To monitor kidney function.</li>
          <li>Liver function tests (ALT, AST, bilirubin): To check for hepatic congestion.</li>
          <li>Electrolytes (Na, K, Cl, CO2): To monitor imbalances, particularly due to diuretic use.</li>
        </ul>
        <p className="mt-2">
          With these tests, healthcare providers can monitor for complications such as electrolyte imbalances, liver dysfunction, or kidney
          impairment, ensuring safe and effective treatment.
        </p>
      </div>
    }
  />
);

const GeneralizedWeakness = () => (
  <RightImageSection
    img={WeaknessImg.src}
    imgAlt="Generalized weakness"
    heading="Labs for Generalized Weakness"
    custom={
      <div>
        <p className="mt-2">
          Generalized weakness can result from a variety of underlying causes. A well-organized lab workup is essential to identify the root
          cause of the symptoms.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>Complete Blood Count (CBC): To detect anemia or infections.</li>
          <li>Electrolytes (Na, K, Ca, Mg): To identify imbalances.</li>
          <li>Thyroid function tests (TSH, Free T4): To diagnose hypothyroidism or hyperthyroidism.</li>
          <li>Liver and kidney function tests (ALT, AST, BUN, creatinine).</li>
          <li>Serum glucose: For hypoglycemia or uncontrolled diabetes.</li>
        </ul>
        <p className="mt-2">
          With these tests, healthcare providers can monitor for complications such as electrolyte imbalances, liver dysfunction, or kidney
          impairment, ensuring safe and effective treatment.
        </p>
      </div>
    }
  />
);

const AmlodipineMonitoring = () => (
  <LeftImageSection
    img={HypertensionImg.src}
    imgAlt="Hypertension"
    custom={
      <div>
        <p className="mt-2">
          Amlodipine is a commonly used calcium channel blocker. Certain lab tests are important to monitor for potential side effects.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>Liver function tests (ALT, AST, bilirubin).</li>
          <li>Kidney function tests (BUN, creatinine).</li>
          <li>Electrolytes (K+, Na+): To monitor potential imbalances.</li>
          <li>Complete Blood Count (CBC).</li>
          <li>ECG: For pre-existing arrhythmias or prolonged QT interval.</li>
        </ul>
        <p className="mt-2">
          With these tests, healthcare providers can monitor for complications such as electrolyte imbalances, liver dysfunction, or kidney
          impairment, ensuring safe and effective treatment with amlodipine.
        </p>
      </div>
    }
  />
);

const HowHelps = () => {
  return (
    <Section>
      <Container>
        <div className="text-center">
          <h2 className="text-black">
            How Rejoy Health <br />
            Helps You Choose the Right Labs
          </h2>
          <p className="body-1 mt-2 max-w-2xl text-textSecondary mx-auto">
            We are here to assist you with lab workups for various clinical situations. Whether you are working through a complex diagnostic
            puzzle or need quick advice on routine tests, our service provides the information you need to ensure accuracy and efficacy.
            Below are just a few examples of how we can help:
          </p>
        </div>
        <AcuteHeartFailure />
        <GeneralizedWeakness />
        <AmlodipineMonitoring />
      </Container>
    </Section>
  );
};

export default HowHelps;
