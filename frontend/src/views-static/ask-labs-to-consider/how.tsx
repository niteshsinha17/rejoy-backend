"use client";

import { Container, Section } from "@/components";

const content = [
  {
    title: "For Healthcare Providers",
    description:
      "Whether you're a primary care physician, specialist, or nurse practitioner, Rejoy Health helps you determine the most appropriate lab tests to order for your patients, based on their symptoms, medical history, and current health status.",
  },
  {
    title: "For Patients",
    description:
      "If you're a patient looking to understand why certain tests are being ordered, we provide clear explanations of what each test is meant to assess and how it helps guide your treatment.",
  },
  {
    title: "For Researchers and Students",
    description:
      "Rejoy Health is also a valuable resource for those looking to deepen their understanding of medical diagnostics. We provide evidence-based insights into lab testing protocols and their clinical significance.",
  },
];

const How = () => {
  return (
    <Section>
      <Container>
        <div className="text-center">
          <h2 className="text-black">
            How Rejoy Health Can <br /> Help You with Lab Workups
          </h2>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-3">
          {content.map((example, index) => (
            <div
              key={index}
              className="p-4 border rounded-2xl hover:border-primary"
            >
              <div>
                <h3 className="text-lg font-semibold">{example.title}</h3>
                <p className="text-sm mt-2">{example.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default How;
