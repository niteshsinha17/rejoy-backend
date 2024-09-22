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
            <span>
              Your Dedicated Center for
              <br />
              Comprehensive Care
            </span>
          </h1>
          <p className="text-center max-w-2xl mx-auto body-1 mt-4">
            We understand that your health and well-being are of utmost importance, and we are here to provide you with the highest quality
            care, combining the best of digital convenience and the personal touch of in-center visits.
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
