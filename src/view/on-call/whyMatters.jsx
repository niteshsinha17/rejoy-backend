import { Container, Section } from "@/components";
import Image from "next/image";
import Appointment from "../../../public/images/on-call/appointment.svg";
import CostSaving from "../../../public/images/on-call/cost-savings.svg";
import Waiting from "../../../public/images/on-call/waiting.svg";
import classes from "./whyMatters.module.css";

const CardItem = (props) => {
  return (
    <div
      className={`relative border mb-4 md:mb-[0px] mx-auto max-w-3xl border-[#ccc] py-6 px-4 rounded-lg ${classes.mainBody}`}
    >
      <div
        className={`absolute top-[0px] translate-y-[-50%] translate-x-[-50%] left-[50%] flex items-center justify-center bg-[#aceefe] rounded-full h-[70px] w-[70px] ${classes.iconWrapper}`}
      >
        <Image
          width={50}
          height={50}
          src={props.img}
          className="h-[50px] w-auto m-auto"
        />
      </div>
      <h5 className="heading-5 text-center">{props.heading}</h5>
      <p className="body-2 text-center mt-2 max-w-md mx-auto">{props.text}</p>
      <div
        className={`${classes.cardImg} absolute h-[100%] w-[100%] left-[0px] top-[0px] z-[-1]`}
      >
        <Image
          src={props.img}
          height={150}
          alt={props.heading}
          className="opacity-5"
        />
      </div>
    </div>
  );
};

const WhyMatters = () => {
  return (
    <Section>
      <Container>
        <h2 className="text-center heading-2">
          Why <span className="text-primary">Immediate Access Matters</span>
        </h2>

        <p className="text-center max-w-3xl mx-auto body-1 mt-4">
          No more waiting for specialists and enduring prolonged pain. With
          Rejoy, you get instant access to the best-in-class Clinical Pain
          Specialists without the hassle of unnecessary appointments or
          redundant x-rays and medications. Save your time, energy, and money
          with Rejoy's convenient and efficient on-call service.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[120px]">
          <CardItem
            heading="No More Waiting"
            img={Waiting}
            text="Say goodbye to the frustrations of waiting for specialists. With Rejoy, you have immediate access to Clinical Pain Specialists who are ready to provide you with prompt assistance and relief. Don't let pain hold you back; get the help you need without unnecessary delays."
          />
          <CardItem
            heading="Streamlined Appointments"
            img={Appointment}
            text="No more unnecessary appointments that eat up your valuable time. Rejoy eliminates the need for multiple visits by connecting you directly with Clinical Pain Specialists through our text-based communication platform. Experience a streamlined process that puts your pain relief at the forefront."
          />
          <CardItem
            heading="Cost Savings"
            img={CostSaving}
            text="Stop wasting money on unnecessary x-rays and medications. With Rejoy, you have access to immediate assistance that helps you avoid unnecessary expenses. Our Clinical Pain Specialists focus on finding the most efficient and cost-effective solutions, saving you from wasted dollars on ineffective treatments."
          />
        </div>
      </Container>
    </Section>
  );
};

export default WhyMatters;
