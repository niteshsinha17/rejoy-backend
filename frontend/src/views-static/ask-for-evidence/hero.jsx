import { Container } from "@/components";
import Dots from "../../../public/images/home/dots.png";

export const Hero = () => {
  return (
    <div className="relative">
      <div
        className="absolute z-[-1]"
        style={{
          background: `url(${Dots.src}) no-repeat center center / cover`,
          width: "100%",
          height: "700px",
          top: 0,
          left: 0,
        }}
      ></div>
      <Container>
        <div className="max-sm:py-6 max-md:py-[100px] md:min-h-[600px] flex justify-center items-center pt-">
          <div>
            <h1 className="text-center text-black max-w-screen-md mx-auto">Your Trusted Source for Evidence-Based Answers</h1>
            <p className="text-center mx-auto mt-4 max-sm:text-base text-xl md:max-w-[70%]">
              The world of healthcare is constantly evolving, and navigating it can be challenging. That's where Rejoy Health comes in: we
              provide you with accurate, evidence-backed information that you can trust. From drug efficacy and safety to dietary
              supplements and treatment guidelines, we offer a robust collection of evidence to help you make informed healthcare decisions.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
