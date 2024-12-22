import { Container, Section } from "@/components";
import { AppRoutes } from "@/enum";
import { Button } from "@/ui";

export const GetStarted = () => {
  return (
    <Section>
      <Container>
        <div className="p-6 bg-primary rounded-3xl text-white flex">
          <div>
            <div className="text-xl sm:text-2xl md:text-4xl font-semibold">Start Your Journey to Success</div>
            <p className="mt-2">Practice smarter, build confidence, and ace your MOC exams with Rejoy Health</p>
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
