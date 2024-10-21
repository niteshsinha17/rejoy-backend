import { Container, Section } from "@/components";
import { Button } from "@/ui";
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
        <div className="p-6 bg-primary rounded-3xl text-white flex">
          <div>
            <div className="text-xl sm:text-2xl md:text-4xl font-semibold">
              Download now and embark on a journey of empowered <br /> health decisions, tailored just for you !
            </div>
            <p className="mt-5 text-sm">
              Experience the precision of Rejoy Health: Your go-to source for accurate health insights at your fingertips
            </p>

            <div className="flex space-x-4 mt-6">
              <Button
                href="mailto:hello@rejoyhealth.com"
                color="white"
              >
                Contact Us Now
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default WalkAndEarn;
