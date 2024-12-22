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
        <div className="max-sm:py-6 max-md:py-[100px] md:min-h-[600px] flex justify-center items-center">
          <div>
            <h1 className="text-center text-black max-w-screen-md mx-auto"> Your Trusted Partner for Home Care Instructions</h1>
            <p className="text-center mx-auto mt-4 max-sm:text-base text-xl md:max-w-[70%]">
              At Rejoy Health, we understand that providing clear, actionable, and easy-to-understand aftercare instructions is essential
              for patients' recovery and well-being. Whether you're a healthcare provider, a caregiver, or a patient looking for guidance on
              managing your recovery at home, Rejoy Health helps you craft the perfect home care instructions. We ensure that every step of
              the recovery process is as smooth and stress-free as possible by offering trusted, evidence-based advice for a variety of
              medical situations.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
