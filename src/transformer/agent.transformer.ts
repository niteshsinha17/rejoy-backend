import {
  IAgentDetail,
  IAgentDetailResponse,
  IAgentListItem,
  IAgentListItemResponse,
  IAgentPublicDetail,
  IAgentPublicDetailResponse,
  IScheduleAppointment,
  IScheduleAppointmentResponse,
} from "@/models/agent";
import {
  IAgentChatMessage,
  IAgentChatMessageResponse,
  IAgentConversationListItem,
  IAgentConversationListItemResponse,
} from "@/models/chat";

export const agentTransformer = {
  agentListItemResToJsFormat: (
    agentListItemRes: IAgentListItemResponse
  ): IAgentListItem => ({
    id: agentListItemRes.id,
    name: agentListItemRes.name,
    conversationCount: agentListItemRes.conversation_count,
    isActive: agentListItemRes.is_active,
    agentType: agentListItemRes.agent_type,
    createdAt: agentListItemRes.created_at,
  }),
  agentListResToJsFormat: (
    agentListRes: IAgentListItemResponse[]
  ): IAgentListItem[] => {
    return agentListRes.map((agentListItemRes) =>
      agentTransformer.agentListItemResToJsFormat(agentListItemRes)
    );
  },
  agentDetailResToJsFormat: (
    agentData: IAgentDetailResponse
  ): IAgentDetail => ({
    id: agentData.id,
    name: agentData.name,
    description: agentData.description || "",
    isActive: agentData.is_active,
    image: agentData.image || "",
    exampleChat: agentData.example_chat || "",
    createdBy: agentData.created_by,
    prompt: agentData.prompt || "",
    agentType: agentData.agent_type,
    disabledResponse: agentData.disabled_response,
  }),
  agentPublicDetailResToJsFormat: (
    agentData: IAgentPublicDetailResponse
  ): IAgentPublicDetail => ({
    id: agentData.id,
    agentType: agentData.agent_type,
    companyLogo: agentData.company_logo,
    image: agentData.image,
    name: agentData.name,
    disabledResponse: agentData.disabled_response,
  }),
  agentDetailJsToResFormat: (
    agentData: IAgentDetail
  ): IAgentDetailResponse => ({
    id: agentData.id,
    name: agentData.name,
    description: agentData.description,
    is_active: agentData.isActive,
    image: agentData.image,
    example_chat: agentData.exampleChat,
    created_by: agentData.createdBy,
    prompt: agentData.prompt,
    agent_type: agentData.agentType,
  }),
  agentMessagesResToJsFormat: (
    agentMessagesRes: IAgentChatMessageResponse
  ): IAgentChatMessage => ({
    id: agentMessagesRes.id,
    message: agentMessagesRes.text,
    isAgentResponse: agentMessagesRes.is_agent_response,
    source: agentMessagesRes.source,
    createdAt: agentMessagesRes.created_at,
  }),
  agentMessagesListResToJsFormat: (
    agentMessagesListRes: IAgentChatMessageResponse[]
  ): IAgentChatMessage[] => {
    return agentMessagesListRes.map((agentMessagesRes) =>
      agentTransformer.agentMessagesResToJsFormat(agentMessagesRes)
    );
  },
  agentConversationListItemResToJsFormat: (
    item: IAgentConversationListItemResponse
  ): IAgentConversationListItem => ({
    id: item.id,
    username: item.username,
    lastMessage: item.last_message,
    lastMessageTime: item.last_message_time,
    email: item.email,
    appointmentScheduleAt: item.appointment_schedule_at,
    phoneNumber: item.phone_number,
    existingUser: item.existing_user,
    autoReplayDisabled: item.auto_replay_disabled,
  }),
  agentConversationListResToJsFormat: (
    list: IAgentConversationListItemResponse[]
  ): IAgentConversationListItem[] => {
    return list.map((item) =>
      agentTransformer.agentConversationListItemResToJsFormat(item)
    );
  },
  scheduledAppointmentJsToResFormat: (
    appointment: IScheduleAppointmentResponse
  ): IScheduleAppointment => ({
    user: {
      name: appointment.user.name,
      email: appointment.user.email,
      phone: appointment.user.phone_number,
    },
    agent: {
      name: appointment.agent.name,
    },
    doctorName: appointment.doctor_name,
    scheduledAt: appointment.scheduled_at,
    cancelled: appointment.cancelled,
    timezone: appointment.timezone,
    intakePerson: appointment.intake_person,
    duration: appointment.duration,
  }),
  scheduledAppointmentListJsToResFormat: (
    list: IScheduleAppointmentResponse[]
  ): IScheduleAppointment[] => {
    return list.map((appointment) =>
      agentTransformer.scheduledAppointmentJsToResFormat(appointment)
    );
  },
};
