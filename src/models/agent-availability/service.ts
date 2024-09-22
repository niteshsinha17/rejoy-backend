import { WeekDay } from "@/enums";

export interface IAgentAvailabilitySettingResponse {
  timezone: string;
  is_active: boolean;
  availability_slots: AvailabilityMapResponse;
}
export interface TimeResponse {
  start_time: string;
  end_time: string;
}
export type AvailabilityMapResponse = Record<WeekDay, TimeResponse[]>;

export interface IUpdateAgentAvailabilitySettingServicePayload extends Omit<IAgentAvailabilitySettingResponse, "is_active"> {
  agent_id: string;
}
