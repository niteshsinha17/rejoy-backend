import { AgentType } from "@/enum";
import { IGoogleAccountDetails } from "./store";

export interface IAgentListItemResponse {
  id: string;
  name: string;
  conversation_count: number;
  is_active: boolean;
  agent_type: AgentType;
  created_at: string;
}

export interface IAgentDetailResponse {
  id: string;
  name: string;
  description: string | null;
  prompt: string | null;
  is_active: boolean;
  image: string | null;
  example_chat: string | null;
  created_by: string;
  agent_type: AgentType;
  disabled_response?: boolean;
}

export interface IAgentPublicDetailResponse {
  id: string;
  name: string;
  image: string;
  agent_type: AgentType;
  company_logo: string;
  disabled_response: boolean;
}

export interface IAgentAddMemoryServicePayload {
  type: "document" | "website";
  url: string;
  agentId: string;
}

export interface IAgentDeleteMemoryServicePayload {
  agentId: string;
  memoryId: string;
}

export interface IAgentMemoryListItemResponse {
  id: string;
  file_url: string;
  type: "document" | "website";
  created_at: string;
}

export interface IAgentCreateServicePayload {
  agent_type: AgentType;
  agent_name: string;
  agent_description: string;
}

export interface IScheduleAppointmentResponse {
  duration: string;
  user: {
    name: string;
    email: string;
    phone_number: string;
  };
  agent: {
    name: string;
  };
  doctor_name: string;
  scheduled_at: string;
  cancelled: boolean;
  timezone: string;
  intake_person?: {
    name: string;
    email: string;
  };
}

export interface IAgentUpdateGoogleLoginServicePayload {
  code: string;
  agentId: string;
}

export interface IAgentPersonInviteServicePayload {
  email: string;
  agentId: string;
}

export interface IGetAccountDetailsResponse {
  details: IGoogleAccountDetails | null;
  is_google_account_linked: boolean;
}

export interface IAgentPersonInviteDetailResponse {
  expired: boolean;
  agent_name: string;
  linked_account: boolean;
}

export interface IAgentInviteListItemResponse {
  id: string;
  person_email: string;
}

export interface IAgentIntakePersonListItemResponse {
  name: string;
  email: string;
  image: string;
  id: string;
}
export interface IAcceptInviteServicePayload {
  code: string;
  token: string;
}

export interface IRemoveInvitePersonServicePayload {
  inviteId: string;
  agentId: string;
}

export interface IRemoveIntakePersonServicePayload {
  intakePersonId: string;
  agentId: string;
}

export interface IAgentDisableResponseServicePayload {
  agentId: string;
  data: {
    disabled_response: boolean;
  };
}
