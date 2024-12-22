import { Container, Section } from "@/components";

const procedureCareHangouts = [
  {
    title: "Caring for an Incision After Surgery: How to Prevent Infection and Promote Healing",
    description:
      "This handout will offer step-by-step instructions for patients on how to care for surgical incisions, recognize signs of infection, and take steps to promote optimal healing, such as avoiding certain activities and keeping the site clean and dry.",
  },
  {
    title: "Aftercare for Dental Procedures: Managing Pain, Swelling, and Oral Hygiene",
    description:
      "Whether your patient has undergone tooth extraction, root canal therapy, or other dental procedures, we’ll guide them on managing swelling, pain, and maintaining oral hygiene while the site heals.",
  },
];

const ProcedureCare = () => {
  return (
    <div>
      <Section>
        <Container>
          <h2 className="text-black text-center">Post-Procedure Care and Preventing Complications</h2>
          <p className="body-1 mt-2 max-w-2xl text-center text-textSecondary mx-auto">
            After undergoing a medical procedure, patients often need extra guidance on how to care for themselves to prevent complications.
            Rejoy Health ensures that your patients receive all the information they need for a smooth recovery:
          </p>
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            {procedureCareHangouts.map((hangout, index) => (
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
    </div>
  );
};

export default ProcedureCare;
