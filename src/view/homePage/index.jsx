import Hero from "./hero";
import OurSolutions from "./ourSolutions";
import SolutionForAll from "./solutionForAll";
import Video from "./video";
import WalkAndEarn from "./walkAndEarn";
import WhyUs from "./whyUs";

export const HomePageView = () => {
  return (
    <div>
      <Hero />
      <OurSolutions />
      <WhyUs />
      <SolutionForAll />
      <Video />
      <WalkAndEarn />
    </div>
  );
};

export default HomePageView;
