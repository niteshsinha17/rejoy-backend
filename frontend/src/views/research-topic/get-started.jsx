import { Container, Section } from "@/components";

export const GetStarted = () => {
  return (
    <Section>
      <Container>
        <div className="p-6 bg-primary rounded-3xl text-white flex">
          <div>
            <div className="text-xl sm:text-2xl md:text-4xl font-semibold">Start Your Healthcare Research Today</div>
            <p className="mt-5">
              From rare diseases to the latest treatment breakthroughs, Rejoy Health makes it simple to find the trusted information you
              need.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default GetStarted;
