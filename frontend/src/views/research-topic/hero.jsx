import { Container } from "@/components";
import AppleStoreButton from "@/components/appleStoreButton";
import GooglePlayButton from "@/components/googlePlayButton";

const ButtonLink = (props) => {
  return <div>{props.children}</div>;
};

export const Hero = () => {
  return (
    <div className="relative">
      <Container>
        <div className="max-sm:py-6 max-md:py-[100px] md:min-h-[600px] flex justify-center items-center pt-">
          <div>
            <h1 className="text-center text-black max-w-screen-md mx-auto">
              Explore, Learn, and <br />
              Stay Informed
            </h1>
            <p className="text-center mx-auto mt-4 max-sm:text-base text-xl md:max-w-[60%]">
              Whether you're curious about a medical condition, a breakthrough treatment, or the latest healthcare trends, Rejoy Health
              helps you find trusted answers quickly and easily.
            </p>

            <div className="flex justify-center mt-4 space-x-4">
              <ButtonLink>
                <GooglePlayButton />
              </ButtonLink>
              <ButtonLink>
                <AppleStoreButton />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
