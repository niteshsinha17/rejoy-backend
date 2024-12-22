import { Container, Section } from "@/components";

const NeedHelp = () => {
  return (
    <div className="bg-slate-100 text-center">
      <Section>
        <Container>
          <h2 className="text-black max-md:text-center">
            Need Help Writing a Patient Handout?
            <br />
            Here’s How We Can Assist You!
          </h2>

          <p className="body-1 mt-2 max-w-2xl text-textSecondary mx-auto">
            Creating an effective patient handout can be time-consuming, but Rejoy Health makes it easy. Below are a few examples of the
            types of patient handouts we can help you create. Whether you're explaining lifestyle changes, medication use, or post-operative
            care, we've got you covered.
          </p>
        </Container>
      </Section>
    </div>
  );
};

export default NeedHelp;
