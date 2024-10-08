import { WeekDay } from "@/enums";

export interface IAgentAvailabilitySetting {
  timezone: string;
  isActive: boolean;
  availabilitySlotsMap: AvailabilityMap;
}

export interface Time {
  start: string;
  end: string;
}

export type AvailabilityMap = Record<WeekDay, Time[]>;
