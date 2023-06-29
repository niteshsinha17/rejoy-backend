import Hero from "./hero";
import OurSolutions from "./ourSolutions";
import SolutionForAll from "./solutionForAll";
import WalkAndEarn from "./walkAndEarn";
import WhyUs from "./whyUs";

export const HomePageView = () => {
  return (
    <div>
      <Hero />
      <WhyUs />
      <OurSolutions />
      <SolutionForAll />
      <WalkAndEarn />
      {/* <Section1 /> */}
    </div>
  );
};

export default HomePageView;
