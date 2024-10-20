import { getPageMetaData } from "@/utils";
import AcademyPage from "@/views/academy";

export const metadata = getPageMetaData({ title: "Academy | Rejoy Health" });

export default function Academy() {
  return <AcademyPage />;
}
