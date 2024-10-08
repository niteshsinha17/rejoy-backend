"use client";
import { userApi } from "@/services/user.service";
import Avatar from "@/ui/avatar";

const UserProfile = () => {
  const { data: userDetail, ...userDetailQuery } = userApi.useLoggedInUserQuery();

  return (
    <div>
      <Avatar
        isLoading={userDetailQuery.isLoading}
        name={userDetail?.fullName}
        image={userDetail?.image}
      />
    </div>
  );
};

export default UserProfile;
