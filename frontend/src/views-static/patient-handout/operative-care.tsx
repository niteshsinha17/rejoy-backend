import { Container, Section } from "@/components";

const hangouts = [
  {
    title: "Recovering from Knee Replacement Surgery: Exercises and Precautions",
    description:
      "Knee replacement surgery requires specific rehabilitation to regain strength and mobility. Our handout will cover essential exercises, like leg raises and knee bends, to improve flexibility and strength, along with important precautions to avoid complications like infections or falls.",
  },
  {
    title: "Post-Heart Surgery Care: What You Need to Know",
    description:
      "After heart surgery, patients need to know how to manage pain, monitor for signs of complications, and gradually return to normal activities. We’ll provide clear instructions on lifestyle changes, medications, and exercise for optimal heart health.",
  },
  {
    title: "Caring for Your Incision After Surgery: Tips for Proper Wound Care",
    description:
      "Whether it’s from a minor procedure or major surgery, keeping a surgical incision clean and free from infection is crucial. This handout will explain the best practices for wound care, signs of infection to watch out for, and when to seek medical attention.",
  },
];

const OperativeCare = () => {
  return (
    <div className="bg-slate-100">
      <Section>
        <Container>
          <h2 className="text-black text-center">Post-Operative Care and Recovery</h2>

          <p className="text-center body-1 mt-2 max-w-2xl text-textSecondary mx-auto">
            After surgery, patients need to understand how to properly care for themselves during recovery to ensure the best outcomes.
            Rejoy Health can help you write detailed handouts that guide patients through their postoperative journey:
          </p>
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            {hangouts.map((hangout, index) => (
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

export default OperativeCare;
