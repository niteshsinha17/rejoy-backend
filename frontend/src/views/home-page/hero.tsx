import chatImg from "@/../public/images/chat-image.png";
import { Container } from "@/components";
import Image from "next/image";
import Dots from "../../../public/images/home/dots.png";
import SearchWidget from "./search-widget";

export const Hero = () => {
  return (
    <div className="relative">
      <div
        className="absolute z-[-1]"
        style={{
          background: `url(${Dots.src}) no-repeat center center / cover`,
          width: "100%",
          height: "700px",
          top: 0,
          left: 0,
        }}
      ></div>
      <Container>
        <div className="max-sm:py-6 max-md:py-[100px] md:min-h-[1200px] flex justify-center items-center pt-">
          <div>
            <h1 className="text-center text-black max-w-screen-md mx-auto">
              Your Trusted Health Companion available 24/7 to provide answers
            </h1>
            <p className="text-center mx-auto mt-4 max-sm:text-base text-xl md:max-w-[60%]">
              Whether you have questions about symptoms, treatments, or general wellness, simply ask, and receive{" "}
              <strong>verified answers</strong> that you can <strong>trust</strong>.
            </p>
            <div className="mt-4">
              <SearchWidget />
            </div>
            <Image
              src={chatImg}
              alt="chat-image"
              className="mx-auto block max-w-full"
              height={700}
              width={700}
            />
            <div className="bg-gray-800 py-4 text-gray-100 absolute w-full left-[0px] overflow-hidden">
              <div className="flex justify-between items-center w-full max-w-screen-md max-md:animate-marquee text-base mx-auto">
                <div className="flex-shrink-0 w-[240px] text-center">AI Powered Services</div>
                <div className="flex-shrink-0 w-[240px] text-center">Verified & Trusted Answers</div>
                <div className="flex-shrink-0 w-[240px] text-center">24/7 Availability</div>
                <div className="flex-shrink-0 w-[240px] text-center">Secure & Confidential</div>
                <div className="flex-shrink-0 w-[240px] text-center md:hidden">AI Powered Services</div>
                <div className="flex-shrink-0 w-[240px] text-center md:hidden">Verified & Trusted Answers</div>
                <div className="flex-shrink-0 w-[240px] text-center md:hidden">24/7 Availability</div>
                <div className="flex-shrink-0 w-[240px] text-center md:hidden">Secure & Confidential</div>
              </div>
            </div>
            {/* <div className="mt-4">
              <DownloadButtons />
            </div> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
