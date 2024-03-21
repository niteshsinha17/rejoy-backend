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
          Your Trusted Health Companion
            <br />
            <span className="text-primary">Available 24x7 to provide answers</span>
          </h1>
          <p className="text-center max-w-xl mx-auto body-1 mt-4">
          Whether you have questions about symptoms, treatments, or general wellness, simply ask, and receive verified answers you can trust
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
