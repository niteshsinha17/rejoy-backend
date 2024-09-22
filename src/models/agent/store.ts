import { AgentType } from "@/enum";

export interface IAgentListItem {
  id: string;
  name: string;
  conversationCount: number;
  isActive: boolean;
  agentType: AgentType;
  createdAt: string;
}

export interface IAgentDetail {
  id: string;
  name: string;
  description: string;
  prompt: string;
  isActive: boolean;
  image: string;
  exampleChat: string;
  createdBy: string;
  agentType: AgentType;
  disabledResponse?: boolean;
}

export interface IAgentPublicDetail {
  id: string;
  name: string;
  image: string;
  agentType: AgentType;
  companyLogo: string;
  disabledResponse: boolean;
}

export interface IScheduleAppointment {
  user: {
    name: string;
    email: string;
    phone: string;
  };
  agent: {
    name: string;
  };
  doctorName: string;
  scheduledAt: string;
  cancelled: boolean;
  timezone: string;
  intakePerson?: {
    name: string;
    email: string;
  };
  duration: string;
}

export interface IGoogleAccountDetails {
  email: string;
  name: string;
  picture: string;
}

export interface IAgentPersonInviteDetail {
  expired: boolean;
  agentName: string;
  linkedAccount: boolean;
}

export interface IAgentInviteListItem {
  id: string;
  personEmail: string;
}
