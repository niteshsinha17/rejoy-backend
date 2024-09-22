// state

export interface ILoggedInUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  companyLogo: string;
}

export interface ILoggedInUserProfile {
  profileTitle: string;
  dob: string;
  phoneNumber: string;
  email: string;
  phoneVerified: boolean;
  emailVerified: boolean;
  bio: string;
  gender: string;
  avatar: string;
}

export interface IUserState {
  isUserDataLoading: boolean;
  userData?: ILoggedInUser;
  isProfileDataLoading: boolean;
  profileData?: ILoggedInUserProfile;
  guestUsername: string;
}

export interface IUserPublic {
  id: string;
  username: string;
}

export interface IUserPublicProfile {
  profileTitle: string;
  dob: string;
  bio: string;
  gender: string;
  avatar: string;
}

export interface IUserCharacterInformation {
  characterName: string;
  characterAge: string;
  characterDescription: string;
  characterImage: string;
  facebookProfileLink: string;
  twitterProfileLink: string;
  linkedinProfileLink: string;
  wikipediaLink: string;
  websiteLink: string;
  portfolioLink: string;
  exampleChat: string;
  updating: boolean;
}
