import { getPageMetaData } from "@/utils";
import OnCallPage from "@/views/on-call";

export const metadata = getPageMetaData({ title: "On Call | Rejoy Health" });

const OnCall = () => {
  return <OnCallPage />;
};

export default OnCall;
