import DocAndPatient from "@/../public/images/write-patient-handout/doc-with-patient.jpg";
import { Container, Section } from "@/components";
import LeftImageSection from "@/components/leftImageSection";

const WhatIsHandout = () => {
  return (
    <Section>
      <Container>
        <LeftImageSection
          heading="What is a Patient Handout?"
          img={DocAndPatient.src}
          imgAlt="Doctor with patient"
          para={[
            "A patient handout is an informational document provided by healthcare professionals to patients to help them understand their diagnosis, treatment options, medications, and other important health-related information. The goal is to present this information in a simple, approachable format that can improve patient understanding and compliance with treatment plans.",
            "At Rejoy Health, we create custom, evidence-based patient handouts that are clear, informative, and tailored to specific medical conditions or treatments. Our patient handouts cover everything from managing chronic diseases like diabetes to understanding the use of complex medications such as blood thinners.",
          ]}
        />
      </Container>
    </Section>
  );
};

export default WhatIsHandout;
