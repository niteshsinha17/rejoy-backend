import { DownloadButtons } from "@/app/(landingPages)/_components";
import { Container, Section } from "@/components";
import Image from "next/image";
import Earn from "../../../public/images/walk-and-earn/earn.png";
import Install from "../../../public/images/walk-and-earn/install.png";
import Walk from "../../../public/images/walk-and-earn/walk.png";

export const Steps = () => {
  return (
    <div className="bg-[#eaf4f7]">
      <Section>
        <Container>
          <h2 className="heading-2 text-center">
            3 Simple Steps to <br />
            <span className="text-primary">Get Started</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            <div className="flex flex-col items-center">
              <Image src={Install.src} alt="install" height={80} width={80} />
              <h3 className="heading-4 text-center mt-4">Install the App</h3>
              <p className="body-2 text-center mt-2">
                Download the Rejoy Health app from the App Store or Google Play
                Store.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image src={Walk.src} alt="install" height={80} width={80} />
              <h3 className="heading-4 text-center mt-4">Start Moving</h3>
              <p className="body-2 text-center mt-2">
                Walk and earn points for every step you take. The more you walk,
                the more you earn.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image src={Earn.src} alt="install" height={80} width={80} />
              <h3 className="heading-4 text-center mt-4">
                Get Realtime Reward
              </h3>
              <p className="body-2 text-center mt-2">
                Redeem your points for real rewards in realtime for every step
                you take.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <DownloadButtons />
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Steps;
