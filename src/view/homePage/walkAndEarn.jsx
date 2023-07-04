import { Container, Section } from "@/components";
import Link from "next/link";

const ButtonLink = (props) => {
  return (
    <Link
      className="text-lg py-2 px-4 text-white font-poppins font-normal rounded-xl hover:bg-white border-white hover:text-textPrimary"
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
          <div className="w-7/12">
            <h2 className="heading-2">
              Empower your members and employees
              <span className="text-secondary"> Today!</span>
            </h2>
            <p className="body-2 mt-6 text-white">
              We incentivizes users to make better movements by rewarding them
              for their efforts. By tracking physical, Rejoy motivates users to
              adopt healthier habits and improve their overall well-being.
            </p>

            <div className="flex space-x-4 mt-6">
              <ButtonLink href="mailto:hello@rejoyhealth.com" text="Contact Us Now" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default WalkAndEarn;
