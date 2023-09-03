import { Container, Section } from "@/components";

const Form = () => {
  return (
    <div className="bg-primary">
      <Section>
        <Container>
          <div className="flex justify-center items-center gap-2 flex-col">
            <h2 className="text-center heading-2 text-white">
              Join next live session
            </h2>
          </div>
          <iframe
            className="mx-auto"
            src="https://docs.google.com/forms/d/e/1FAIpQLSdhkECD0qcDuD9DlzulAHEvEW6L7EAz9YbuT_tenU5KGCaJMw/viewform?embedded=true"
            width="640"
            height="831"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </Container>
      </Section>
    </div>
  );
};

export default Form;
