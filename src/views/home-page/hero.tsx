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
        <div className="min-h-[1200px] flex justify-center items-center pt-6 text-black">
          <div>
            <h1 className="text-center">
              Your Trusted Health Companion
              <br />
              <span className="">available 24/7 to provide answers</span>
            </h1>
            <p className="text-center mx-auto mt-4 text-xl md:max-w-[60%]">
              Whether you have questions about symptoms, treatments, or general wellness, simply ask, and receive{" "}
              <strong>verified answers</strong> that you can <strong>trust</strong>.
            </p>
            <div className="mt-4">
              <SearchWidget />
            </div>
            <Image
              src={chatImg}
              alt="chat-image"
              className="mx-auto block"
              height={700}
              width={700}
            />
            <div className="bg-gray-800 flex justify-evenly gap-5 py-4 text-gray-100 absolute w-full left-[0px]">
              <div>AI Powered Services</div>
              <div>Verified & Trusted Answers</div>
              <div>24/7 Availability</div>
              <div>Secure & Confidential</div>
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
