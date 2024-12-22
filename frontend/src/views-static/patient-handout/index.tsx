import GetStarted from "./get-started";
import HangoutExamples from "./hangout-examples";
import Hero from "./hero";
import MedicationsExamples from "./medications";
import NeedHelp from "./need-help";
import OperativeCare from "./operative-care";
import PreventiveCare from "./preventive-care";
import WhatIsHandout from "./what-is-handout";
import Why from "./why";

const PatientHandout = () => {
  return (
    <>
      <Hero />
      <WhatIsHandout />
      <NeedHelp />
      <HangoutExamples />
      <MedicationsExamples />
      <OperativeCare />
      <PreventiveCare />
      <Why />
      <GetStarted />
    </>
  );
};

export default PatientHandout;
