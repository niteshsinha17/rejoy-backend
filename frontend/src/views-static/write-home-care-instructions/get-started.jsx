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
              <span className="border-b-2">Create Your Custom Home Care Instructions</span>
            </div>
            <p className="mt-2">
              Need help writing home care instructions for your patients? Rejoy Health is here to help. Simply provide the details of your
              patient's condition, and we will craft clear, effective home care instructions tailored to their recovery process.
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
