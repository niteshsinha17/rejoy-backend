import { WeekDay } from "@/enum";
import {
  AvailabilityMap,
  AvailabilityMapResponse,
  IAgentAvailabilitySetting,
  IAgentAvailabilitySettingResponse,
} from "@/models/agent-availability";

export const agentAvailabilityTransformer = {
  settingsResToJsFormat: (
    data: IAgentAvailabilitySettingResponse
  ): IAgentAvailabilitySetting => ({
    timezone: data.timezone,
    isActive: data.is_active,
    availabilitySlotsMap:
      agentAvailabilityTransformer.availabilitySlotMapResToJsFormat(
        data.availability_slots
      ),
  }),
  availabilitySlotMapResToJsFormat: (
    response: AvailabilityMapResponse
  ): AvailabilityMap => {
    const availabilityMap: AvailabilityMap = {
      [WeekDay.MONDAY]: [],
      [WeekDay.TUESDAY]: [],
      [WeekDay.WEDNESDAY]: [],
      [WeekDay.THURSDAY]: [],
      [WeekDay.FRIDAY]: [],
      [WeekDay.SATURDAY]: [],
      [WeekDay.SUNDAY]: [],
    };
    Object.keys(response).forEach((day) => {
      availabilityMap[day as keyof AvailabilityMap] = response[
        day as keyof AvailabilityMap
      ].map((slot) => ({
        start: slot.start_time,
        end: slot.end_time,
      }));
    });
    return availabilityMap;
  },
  availabilitySlotMapJsToResFormat: (
    map: AvailabilityMap
  ): AvailabilityMapResponse => {
    const availabilityMap: AvailabilityMapResponse = {
      [WeekDay.MONDAY]: [],
      [WeekDay.TUESDAY]: [],
      [WeekDay.WEDNESDAY]: [],
      [WeekDay.THURSDAY]: [],
      [WeekDay.FRIDAY]: [],
      [WeekDay.SATURDAY]: [],
      [WeekDay.SUNDAY]: [],
    };
    Object.keys(map).forEach((day) => {
      availabilityMap[day as keyof AvailabilityMapResponse] = map[
        day as keyof AvailabilityMapResponse
      ].map((slot) => ({
        start_time: slot.start,
        end_time: slot.end,
      }));
    });
    return availabilityMap;
  },
};
