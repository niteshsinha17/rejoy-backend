import { Accordion, Container, Section } from "@/components";

const Faq = () => {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="heading-2">
              Frequently Asked <br />{" "}
              <span className="text-primary">Questions</span>
            </h2>
          </div>
          <div>
            <Accordion
              heading="In which state you guys live?"
              content="We live only in california"
            />
            <Accordion
              heading="What insurance companies do you work with?"
              content="We work with leading insurance companies such as athena."
            />
            <Accordion
              heading="How much does a user gets paid?"
              content="For every 10,000 steps, you earn total $1.00. 50% goes to your account and 50% to the daily sweepstake. The more you walk, the chances of winning the sweepstake are higher."
            />
            <Accordion
              heading="What is the gauranteedof payment?"
              content="50 cents per 10,000 steps"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Faq;
