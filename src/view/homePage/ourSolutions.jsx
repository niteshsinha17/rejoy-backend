import { Container, Section } from "@/components";
import LeftImageSection from "@/components/leftImageSection";
import RightImageSection from "@/components/rightImageSection";
import Link from "next/link";
import AiChat from "../../../public/images/home/ai-chatbot.png";
import Personalized from "../../../public/images/home/personalized.png";
import Providers from "../../../public/images/home/providers.png";
import SayNo from "../../../public/images/home/say-no.png";
import Trusted from "../../../public/images/home/trusted.png";

const ButtonLink = (props) => {
  return (
    <Link
      className="text-base md:text-lg bg-green py-3 px-6 text-white font-poppins font-semibold rounded-3xl hover:bg-yellow hover:text-textPrimary inline-block"
      href={props.href}
    >
      {props.text}
    </Link>
  );
};

const OurSolutions = () => {
  return (
    <Section>
      <Container>
        <h2 className="heading-2 text-center">
          <span className="text-primary">Comprehensive Health Information Hub</span>
        </h2>
        <p className="body-1 mt-4 text-center">
          We offer trusted, accurate, and personalized health information with direct answers, unbiased perspectives, real-time updates, and
          seamless connections to healthcare resources
        </p>
        <LeftImageSection
          heading="Trusted and Accurate Answers"
          para="We directly answer your question in a conversational format,  citing sources for its information. This allows you to verify the facts and assess the credibility of the answer yourself."
          img={Trusted}
          imgAlt="Trusted"
        />
        <RightImageSection
          heading="Focus on Unbiased Information"
          para="There is no bias in our answer. We present a wider range of perspectives, unlike to search engines and websites that serve SEO-optimized pages, potentially compromising the quality and relevance of health information."
          img={SayNo}
          imgAlt="Say No"
        />
        <LeftImageSection
          heading="Personalized Answers"
          para="Wave goodbye to sifting through countless webpages and in the end getting generic answers! Experience personalized solutions tailored precisely to your individual health requirements. Input your condition, symptoms, and questions, and receive expert guidance customized to your needs. Trust in accurate, reliable answers that are crafted just for you."
          img={Personalized}
          imgAlt="Real-Time answers"
        />
        <RightImageSection
          heading="Real-Time answers"
          para="Whether it's breakthrough medical discoveries, ongoing health events, or emerging treatments, stay ahead of the curve with prompt and reliable information at your fingertips."
          img={AiChat}
          imgAlt="Real-Time answers"
        />

        <LeftImageSection
          heading="Seamless Care Connections"
          para="Inquire further, discover, and learn more about a diverse array of healthcare providers, pharmaceutical products, wellness solutions, and even health-conscious food options."
          img={Providers}
          imgAlt="Seamless Care Connections"
        />
      </Container>
    </Section>
  );
};

export default OurSolutions;
