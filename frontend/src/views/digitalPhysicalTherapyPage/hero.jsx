import { Container } from "@/components";
import AppleStoreButton from "@/components/appleStoreButton";
import GooglePlayButton from "@/components/googlePlayButton";
import TopBanner from "@/components/topBanner";
import Dots from "../../../public/images/home/dots.png";

const ButtonLink = (props) => {
  return <div>{props.children}</div>;
};

export const Hero = () => {
  return (
    <div className="relative bg-[#eaf4f7] pb-[210px]">
      <div
        className="absolute"
        style={{
          background: `url(${Dots.src}) no-repeat center center / cover`,
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      ></div>
      <TopBanner>
        <Container>
          <h1 className="text-center heading-1 text-textPrimary">
            <span>Your Personal Health Companion For</span>
            <br /> Optimal Physical Well-being
          </h1>
          <p className="text-center max-w-lg mx-auto body-1 mt-4">
            Rejoy Health offers next-gen digital health solutions that helped 10,000+ people improve their lives.
          </p>

          <div className="flex justify-center mt-4 space-x-4">
            <ButtonLink>
              <GooglePlayButton />
            </ButtonLink>
            <ButtonLink>
              <AppleStoreButton />
            </ButtonLink>
          </div>
        </Container>
      </TopBanner>
    </div>
  );
};

export default Hero;
