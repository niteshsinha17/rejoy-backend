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
            Elevate Your Well-being with <br />
            <span>Mindful Meditation</span>
          </h1>
          <p className="text-center max-w-xl mx-auto body-1 mt-4">
            At Rejoy Health, we are dedicated to guiding you on a path to
            holistic health. True well-being encompasses not just physical
            fitness but also a serene mind and emotional equilibrium. Our
            revolutionary feature, Mindful Meditation, is designed to help you
            achieve this balance effortlessly.
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
