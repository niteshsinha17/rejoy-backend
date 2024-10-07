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
          zIndex: 0,
        }}
      ></div>
      <TopBanner>
        <Container>
          <h1 className="text-center heading-1 text-textPrimary">On-Demand Pain Relief and Movement Improvement</h1>
          <p className="text-center max-w-4xl mx-auto body-1 mt-4">
            Welcome to Rejoy, your 24/7 on-demand access to Clinical Pain Specialists. Say goodbye to suffering in silence, as immediate
            help for your pain is now just a click away. Through text-based communication, you can connect with our team of expert Clinical
            Pain Specialists who are ready to provide you with answers and immediate action.
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
