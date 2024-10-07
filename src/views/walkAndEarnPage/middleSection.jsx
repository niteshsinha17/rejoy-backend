import { Container, Section } from "@/components";
import LeftImageSection from "@/components/leftImageSection";
import RightImageSection from "@/components/rightImageSection";
import Link from "next/link";
import HowMuch from "../../../public/images/walk-and-earn/how-much.png";
import Why from "../../../public/images/walk-and-earn/why.png";

const ButtonLink = (props) => {
  return (
    <Link
      className="text-lg bg-green py-3 px-6 text-white font-poppins font-semibold rounded-3xl hover:bg-yellow hover:text-textPrimary"
      href={props.href}
    >
      {props.text}
    </Link>
  );
};

const MiddleSection = () => {
  return (
    <Section>
      <Container>
        <LeftImageSection
          heading="Why Cash Rewards?"
          para="Taking care of your health has many benefits, not just for yourself but also for society.By being healthy, you are more productive and contribute to saving billions of dollars in healthcare costs."
          custom={
            <div className="mt-4">
              <ButtonLink
                href="#"
                text="Get Started"
              />
            </div>
          }
          img={Why}
          imgAlt="Why Cash Rewards?"
        />
        <RightImageSection
          heading="How Much Do You Get Paid?"
          para="At Rejoy Health, we believe in rewarding your efforts and helping you stay motivated on your fitness journey. That's why we offer a unique earning system based on the number of steps you take. For every 10,000 steps you track, you will earn a total of 100 cents. But that's not all – we have even more ways for you to increase your earnings and maximize your rewards."
          custom={
            <div className="mt-4">
              <ButtonLink
                href="#"
                text="Start Earning now"
              />
            </div>
          }
          img={HowMuch}
          imgAlt="How Much Do You Get Paid?"
        />
      </Container>
    </Section>
  );
};

export default MiddleSection;
