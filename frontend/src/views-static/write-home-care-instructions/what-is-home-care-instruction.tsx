import Instructions from "@/../public/images/home-care/instructions.png";
import { Container, Section } from "@/components";
import LeftImageSection from "@/components/leftImageSection";

const WhatIsHomeCareInstruction = () => {
  return (
    <Section>
      <Container>
        <LeftImageSection
          heading="What Are Home Care Instructions?"
          img={Instructions.src}
          imgAlt="Home care instructions"
          para={[
            "Home care instructions are detailed guidelines provided by healthcare professionals to patients who are recovering at home after a procedure, injury, or illness. These instructions cover everything from medication management to lifestyle modifications, wound care, physical therapy, and when to seek further medical attention. The goal is to empower patients with the knowledge they need to safely manage their recovery and achieve optimal healing.",
            "At Rejoy Health, we specialize in writing clear, concise, and comprehensive home care instructions, tailored to meet the specific needs of each patient. With our expert-driven, reliable resources, patients can feel confident and informed about their recovery process.",
          ]}
        />
      </Container>
    </Section>
  );
};

export default WhatIsHomeCareInstruction;
