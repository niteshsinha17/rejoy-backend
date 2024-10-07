import { Container, Section } from "@/components";
import Link from "next/link";

const ButtonLink = (props) => {
  return (
    <Link
      className="text-lg py-2 px-4 text-textPrimary bg-white font-poppins font-normal rounded-xl hover:bg-white border-white hover:text-textPrimary"
      href={props.href}
    >
      {props.text}
    </Link>
  );
};

const SpotLight = (props) => {
  return (
    <Section>
      <Container>
        <div className="py-6 px-5 bg-primary rounded-xl text-white flex shadow-lg">
          <div className="md:w-7/12">
            <h2 className="heading-2">
              ReJoy Spotlight:
              <span className="text-secondary"> Building an ROI-Positive MSK Strategy</span>
            </h2>
            <p className="body-2 mt-6 text-white">
              Unlock the power of ReJoy's comprehensive care and improve member outcomes with our hybrid care model. Join us to learn how
              our digital Musculoskeletal (MSK) solution has produced a remarkable 2.4x ROI for employers. Our new hybrid model bridges the
              care divide by bringing clinically complete digital convenience and personalized in-center visits to your members. Discover
              the impact ReJoy can have on your organization's MSK strategy.
            </p>

            <div className="text-center flex flex-col sm:flex-row mt-4  sm:space-x-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.rejoy.app"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary px-6 py-3 rounded-full font-bold hover:bg-yellow hover:text-black mb-2 sm:mb-[0px]"
              >
                Google Play
              </a>
              <a
                href="https://apps.apple.com/us/app/rejoy/id1546446309"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary px-6 py-3 rounded-full font-bold  hover:bg-yellow hover:text-black"
              >
                App Store
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default SpotLight;
