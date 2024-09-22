import Hero from "./hero";
import ModelMetric from "./modelMetric";
import QNA from "./qna";
import Testimonials from "./testimonials";
import Trust from "./trust";
import Video from "./video";
import WalkAndEarn from "./walkAndEarn";

export const HomePageView = () => {
  return (
    <div>
      <Hero />
      <ModelMetric />
      <Trust />
      <QNA />
      <Testimonials />
      <Video />
      <WalkAndEarn />
    </div>
  );
};

export default HomePageView;
