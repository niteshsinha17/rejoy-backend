import { IUser, IUserResponse } from "@/models/user";

export const userTransformer = {
  convertUserResponseToJSFormat: (userData: IUserResponse): IUser => ({
    email: userData.email,
    firstName: userData.first_name,
    lastName: userData.last_name,
    id: userData.id,
    image: userData.image,
    fullName: userData.full_name,
  }),
};
