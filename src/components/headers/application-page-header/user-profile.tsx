"use client";
import { userApi } from "@/services/user.service";
import Avatar from "@/ui/avatar";

interface IUserProfileProps {
  onClick?: () => void;
}

const UserProfile = (props: IUserProfileProps) => {
  const { data: userDetail, ...userDetailQuery } = userApi.useLoggedInUserQuery();

  return (
    <div>
      <Avatar
        onClick={props.onClick}
        isLoading={userDetailQuery.isLoading}
        name={userDetail?.fullName}
        image={userDetail?.image}
      />
    </div>
  );
};

export default UserProfile;
