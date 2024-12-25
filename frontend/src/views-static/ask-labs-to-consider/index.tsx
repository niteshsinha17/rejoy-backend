import GetStarted from "./get-started";
import Hero from "./hero";
import How from "./how";
import HowHelps from "./how-helps";
import Why from "./why";
import WhyLabMatters from "./why-lab-matters";

const AskLabsToConsider = () => {
  return (
    <>
      <Hero />
      <WhyLabMatters />
      <HowHelps />
      <Why />
      <How />
      <GetStarted />
    </>
  );
};

export default AskLabsToConsider;
