import { Container, Section } from "@/components";

const GetStarted = () => {
  return (
    <div className="bg-primary text-center">
      <Section>
        <Container>
          <h2 className="text-center heading-2 text-white">
            Get started with Rejoy today
          </h2>

          <p className="text-center max-w-3xl mx-auto body-1 mt-4 text-white">
            Take the first step towards a life free of pain and movement
            limitations. Join Rejoy today and experience the difference our
            on-demand access to Clinical Pain Specialists can make in your life.
          </p>

          <div className="flex justify-center items-center flex-col sm:flex-row mt-4 space-y-4 sm:space-y-[0px] sm:space-x-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.rejoy.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white max-w-sm text-primary px-6 py-3 rounded-full font-bold hover:bg-yellow hover:text-black"
            >
              Google Play
            </a>
            <a
              href="https://apps.apple.com/us/app/rejoy/id1546446309"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white max-w-sm text-primary px-6 py-3 rounded-full font-bold  hover:bg-yellow hover:text-black"
            >
              App Store
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default GetStarted;
