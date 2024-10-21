export interface IAvailableNumberListItemResponse {
  phone_number: string;
  country: string;
  price: string;
}

export interface IBuyNumberServicePayload {
  phone_number: string;
}
