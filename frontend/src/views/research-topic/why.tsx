import { Container, Section } from "@/components";
import { CircleCheckOutlineIcon } from "@/icons";

const Why = () => {
  return (
    <Section>
      <Container>
        <h2 className="text-black text-center">Why Research with Rejoy Health?</h2>

        <div className="mt-4 grid md:grid-cols-3 gap-5">
          {[
            "Accurate Information: Answers from verified sources like medical journals, trusted research databases, and expert reviews.",
            "Simple and Clear: Complex medical topics explained in an easy-to-understand format.",
            "Fast Results: Skip the search. Get reliable answers in seconds.",
          ].map((feature, index) => (
            <div key={index}>
              <CircleCheckOutlineIcon className="text-green-500 mr-4 flex-shrink-0 mt-1" />
              <p className="mt-2">{feature}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Why;
