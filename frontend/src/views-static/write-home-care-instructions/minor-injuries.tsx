import { Container, Section } from "@/components";

const hangouts = [
  {
    title: "Aftercare for a Minor Ankle Sprain: Rest, Ice, Compression, and Elevation (RICE)",
    description:
      "This handout will walk your patients through the RICE method, emphasizing the importance of rest, using ice packs, compression wraps, and elevating the ankle to reduce swelling. We'll also guide them on avoiding strenuous activities and when to seek further medical attention if symptoms don't improve.",
  },
  {
    title: "Post-Injury Care for a Mild Wrist Sprain: How to Manage Pain and Prevent Complications",
    description:
      "Whether your patient is dealing with a sprained wrist or another minor joint injury, we’ll help you write instructions on managing swelling, pain, and when to use supportive braces, along with advice on returning to normal activities.",
  },
];

const MinorInjuries = () => {
  return (
    <Section>
      <Container>
        <div className="text-center">
          <h2 className="text-black">Recovering from Minor Injuries</h2>
          <p className="body-1 mt-2 max-w-2xl text-textSecondary mx-auto">
            Injuries like sprains or strains are common, but proper aftercare is essential to ensure full recovery. We can help you create
            easy-to-follow instructions that guide your patients through the healing process:
          </p>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-3">
          {hangouts.map((hangout, index) => (
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
  );
};

export default MinorInjuries;
