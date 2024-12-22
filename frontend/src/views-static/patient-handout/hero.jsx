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
            <h1 className="text-center text-black max-w-screen-md mx-auto">Your Trusted Resource for Writing Patient Handouts</h1>
            <p className="text-center mx-auto mt-4 max-sm:text-base text-xl md:max-w-[70%]">
              At Rejoy Health, we understand the importance of clear, concise, and easy-to-understand health information. Our patient
              handouts are designed to empower patients with the knowledge they need to manage their health, adhere to treatment plans, and
              navigate complex medical conditions. Rejoy Health helps you communicate vital health information in an accessible and
              effective way.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
