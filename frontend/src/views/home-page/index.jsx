import Examples from "./examples";
import GetStarted from "./get-started";
import Hero from "./hero";
import ModelMetric from "./modelMetric";
import QNA from "./qna";
import Trust from "./trust";
import Video from "./video";

export const HomePageView = () => {
  return (
    <div>
      <Hero />
      <ModelMetric />
      <Examples />
      <Trust />
      <QNA />
      {/* <Testimonials /> */}
      <Video />
      <GetStarted />
    </div>
  );
};

export default HomePageView;
