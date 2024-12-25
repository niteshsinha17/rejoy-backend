import { Container, Section } from "@/components";
import { AppRoutes } from "@/enum";
import { Button } from "@/ui";

export const GetStarted = () => {
  return (
    <Section>
      <Container>
        <div className="p-6 bg-primary rounded-3xl text-white flex">
          <div>
            <div className="text-xl sm:text-2xl md:text-4xl font-semibold">Get Evidence-Based Answers Today</div>
            <p className="mt-2 max-w-screen-md">
              Do you have a healthcare question that requires evidence-based insight? Whether it's about the effectiveness of a drug, the
              risks of a medical procedure, or the benefits of a nutritional supplement, Rejoy Health is here to help. Our AI is ready to
              provide you with the most reliable, research-backed answers to help guide your healthcare decisions.
            </p>
            <div className="mt-4">
              <Button
                href={AppRoutes.REGISTER}
                color="white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default GetStarted;
