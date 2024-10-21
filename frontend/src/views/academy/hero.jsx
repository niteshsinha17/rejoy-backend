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
          <h1 className="text-center">
            <span>The Academy</span>
          </h1>
          <p className="text-center max-w-xl mx-auto body-1 mt-4">
            Welcome to Rejoy, your comprehensive resource for achieving a pain-free life. We believe that everyone deserves to live without
            the burden of pain, and we're here to help you on your journey towards optimal physical health and well-being.
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
