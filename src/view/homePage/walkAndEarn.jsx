import { Container, Section } from "@/components";
import Link from "next/link";

const ButtonLink = (props) => {
  return (
    <Link
      className="bg-white text-primary px-6 py-3 rounded-full font-bold hover:bg-yellow hover:text-black"
      href={props.href}
    >
      {props.text}
    </Link>
  );
};

export const WalkAndEarn = () => {
  return (
    <Section>
      <Container>
        <div className="py-6 px-5 bg-primary rounded-xl text-white flex shadow-lg">
          <div className="md:w-7/12">
            <h2 className="heading-3">Download now and embark on a journey of empowered health decisions, tailored just for you !</h2>
            <p className="body-2 mt-4 text-white">
              Experience the precision of Rejoy Health: Your go-to source for accurate health insights at your fingertips
            </p>

            <div className="flex space-x-4 mt-6">
              <ButtonLink
                href="mailto:hello@rejoyhealth.com"
                text="Contact Us Now"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default WalkAndEarn;
