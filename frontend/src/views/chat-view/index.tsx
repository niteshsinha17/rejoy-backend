"use client";
import { IDoctorProfile } from "@/models/doctor";
import Messages from "./messages";

interface IChatViewProps {
  doctorProfile: IDoctorProfile;
}

const ChatView = (props: IChatViewProps) => {
  return <Messages doctorProfile={props.doctorProfile} />;
};

export default ChatView;
