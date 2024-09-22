import { ILoggedInUser, ILoggedInUserResponse } from "@/models";

export const userTransformer = {
  selfUserResToJsFormat: (userData: ILoggedInUserResponse): ILoggedInUser => ({
    email: userData.email,
    emailVerified: userData.email_verified,
    firstName: userData.first_name,
    id: userData.id,
    lastName: userData.last_name,
    username: userData.username,
    phoneNumber: userData.phone_number,
    companyLogo: userData.company_logo,
  }),
};
