import { DownloadButtons } from "@/app/(landingPages)/_components";
import { Container, Section } from "@/components";

const Download = () => {
  return (
    <Section>
      <Container>
        <h2 className="text-center heading-2">
          Transforming Pain into Growth and Success
        </h2>
        <p className="text-center max-w-3xl mx-auto body-1 mt-4">
          Empower you, your members or your employees with Rejoy's advanced joint
          and muscle care solutions. By addressing pain and promoting healthier
          movement, you can foster a happier, more engaged, and motivated
          environment.
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          <DownloadButtons />
        </div>
      </Container>
    </Section>
  );
};

export default Download;
