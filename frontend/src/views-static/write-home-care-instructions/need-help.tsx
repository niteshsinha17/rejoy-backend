import { Container, Section } from "@/components";

const NeedHelp = () => {
  return (
    <div className="bg-slate-100 text-center">
      <Section>
        <Container>
          <h2 className="text-black max-md:text-center">
            Need Help Writing Home Care Instructions? <br /> Here’s How We Can Assist You!
          </h2>

          <p className="body-1 mt-2 max-w-2xl text-textSecondary mx-auto">
            Home care instructions are crucial for ensuring that patients heal properly and avoid complications. Below are examples of
            situations where we can help you craft detailed, patient-friendly instructions. From managing minor injuries to post-operative
            care, we cover a broad range of recovery scenarios.
          </p>
        </Container>
      </Section>
    </div>
  );
};

export default NeedHelp;
