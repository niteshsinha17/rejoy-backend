import ChronicCare from "./chronic-care";
import Examples from "./examples";
import GetStarted from "./get-started";
import Hero from "./hero";
import MinorInjuries from "./minor-injuries";
import NeedHelp from "./need-help";
import ProcedureCare from "./post-procedure-care";
import PostSurgeryCare from "./post-surgery-care";
import WhatIsHomeCareInstruction from "./what-is-home-care-instruction";
import Why from "./why";

const WriteHomeCareInstructions = () => {
  return (
    <>
      <Hero />
      <WhatIsHomeCareInstruction />
      <NeedHelp />
      <MinorInjuries />
      <PostSurgeryCare />
      <Examples />
      <ChronicCare />
      <ProcedureCare />
      <Why />
      <GetStarted />
    </>
  );
};

export default WriteHomeCareInstructions;
