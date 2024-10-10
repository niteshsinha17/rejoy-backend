import { apiObject, baseQuery } from "@/middlewares";
import { IDoctorProfileResponse } from "@/models/doctor/service";
import { userTransformer } from "@/transformer/user";
import { getPageMetaData } from "@/utils";
import ChatView from "@/views/chat-view";

export const metadata = getPageMetaData();

const Page = async (props: {
  params: {
    username: string;
  };
}) => {
  const username = props.params.username;
  const result = await baseQuery<IDoctorProfileResponse>(apiObject(`user/${username}/doctor-profile/`));

  if ("error" in result) {
    return { notFound: true };
  }

  return <ChatView doctorProfile={userTransformer.convertDoctorProfileResponseToJSFormat(result.data)} />;
};

export default Page;
