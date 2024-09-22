import {
  IAvailableNumberListItem,
  IAvailableNumberListItemResponse,
} from "@/models/core";

export const coreTransformer = {
  convertAvailableNumberResponseToJsFormat: (
    item: IAvailableNumberListItemResponse
  ): IAvailableNumberListItem => ({
    phoneNumber: item.phone_number,
    country: item.country,
    price: item.price,
  }),
  convertAvailableNumberListResponseToJsFormat: (
    item: IAvailableNumberListItemResponse[]
  ): IAvailableNumberListItem[] =>
    item.map(coreTransformer.convertAvailableNumberResponseToJsFormat),
};
