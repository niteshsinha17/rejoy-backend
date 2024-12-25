import { Container, Section } from "@/components";
import { AppRoutes } from "@/enum";
import { Button } from "@/ui";

export const GetStarted = () => {
  return (
    <Section>
      <Container>
        <div className="p-6 bg-primary rounded-3xl text-white flex">
          <div>
            <div className="text-xl sm:text-2xl md:text-4xl font-semibold">Get Accurate, Evidence-Based Lab Test Recommendations</div>
            <p className="mt-2 max-w-screen-md">
              Need help determining the right labs to order for a specific condition? Rejoy Health is here to guide you. Our AI-driven
              platform provides detailed, evidence-based recommendations for lab workups across a wide range of medical situations, ensuring
              you get the most accurate and reliable guidance.
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
