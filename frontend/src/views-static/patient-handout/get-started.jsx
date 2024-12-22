import { Container, Section } from "@/components";
import { AppRoutes } from "@/enum";
import { Button } from "@/ui";

export const GetStarted = () => {
  return (
    <Section>
      <Container>
        <div className="p-6 bg-primary rounded-3xl text-white flex">
          <div>
            <div className="text-xl sm:text-2xl md:text-4xl font-semibold">
              Get Started Today
              <br />
              <span className="border-b-2">Create Your Custom Patient Handout</span>
            </div>
            <p className="mt-2 max-w-screen-md">
              If you need a patient handout for a specific condition, medication, or treatment plan, Rejoy Health is here to help. Simply
              sign up now, and we will create a personalized, evidence-based patient handout for your practice or personal use.
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
