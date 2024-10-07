import { Container, Section } from "@/components";

const Trust = () => {
  return (
    <Section noBottomPadding={true}>
      <Container>
        <div>
          <h2 className="heading-2 text-center">
            <span className="text-primary">Trusted by Healthcare Professionals of Top Heath Systems</span>
          </h2>
          <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-4  mt-6 mx-6">
            <Image source={"/images/home/JohnsHopkinsMedicine.jpg"} />
            <Image source={"/images/home/columbia.png"} />
            <Image source={"/images/home/Stanford.png"} />
            <Image source={"/images/home/NLU.png"} />
          </div>
        </div>
      </Container>
    </Section>
  );
};

function Image({ source }) {
  return (
    <div className="flex justify-center mt-4">
      <img
        src={source}
        width={180}
      ></img>
    </div>
  );
}

export default Trust;
