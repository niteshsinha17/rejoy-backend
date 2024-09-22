import { TopBanner } from "@/app/(landingPages)/_components";
import AppleStoreButton from "@/app/(landingPages)/_components/appleStoreButton";
import GooglePlayButton from "@/app/(landingPages)/_components/googlePlayButton";
import { Container } from "@/components";
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
            <span>Overcome Pain Anytime,</span>
            <br /> Anywhere
          </h1>
          <p className="text-center max-w-lg mx-auto body-1 mt-4">
            Our innovative approach combines the expertise of physical therapists with advanced computer vision and AI to provide customized
            treatment plans that can be accessed from the comfort of your own home.
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
