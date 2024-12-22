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
            <h1 className="text-center text-black max-w-screen-md mx-auto">Master MOC Exams with Confidence</h1>
            <p className="text-center mx-auto mt-4 max-sm:text-base text-xl md:max-w-[60%]">
              Rejoy Health empowers you to excel in your Maintenance of Certification (MOC) exams by providing instant, accurate, and
              conversational answers to clinical questions. Get reliable information from trusted medical sources—right when you need it.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
