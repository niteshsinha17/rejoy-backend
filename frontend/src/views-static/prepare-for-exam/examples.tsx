import { Container, Section } from "@/components";

const questions = [
  "What is the first-line treatment for a 7-year-old boy presenting with abdominal pain, diarrhea, and a positive stool test for Giardia lamblia?",
  "What is the most appropriate next step for a 60-year-old male with chest pain, elevated blood pressure, and ECG findings showing ST depression in the lateral leads?",
  "Which pathogen is the most likely cause of meningitis in a 32-year-old woman presenting with fever, headache, and cerebrospinal fluid (CSF) analysis showing elevated protein, low glucose, and neutrophilic predominance?",
  "How would you manage a 45-year-old woman with sudden-onset right upper quadrant pain, fever, and a positive Murphy's sign on physical examination?",
  "What is the recommended diagnostic test for a 25-year-old male with persistent cough, night sweats, and a chest X-ray showing cavitary lesions in the upper lobe?",
  "What is the appropriate treatment for a 10-year-old child with acute otitis media and a history of penicillin allergy?",
];

const Examples = () => {
  return (
    <Section>
      <Container>
        <div className="text-center">
          <h2 className="text-black">Tackle Real-World Clinical Scenarios</h2>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-3">
          {questions.map((question, index) => (
            <div
              key={index}
              className="p-4 border rounded-2xl"
            >
              <div>
                <h3 className="text-sm font-semibold">{question}</h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Examples;
