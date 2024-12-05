import { useAuth } from "@/hooks";
import { LogoutOutlineIcon } from "@/icons";
import { userApi } from "@/services/user.service";
import Avatar from "@/ui/avatar";
import ToolTip from "@/ui/tool-tip";

const UserInfo = () => {
  const { data: userDetail, ...userDetailQuery } = userApi.useLoggedInUserQuery();
  const auth = useAuth();

  return (
    <div className="py-3 px-2 border-t flex gap-2 items-center">
      <Avatar
        isLoading={userDetailQuery.isLoading}
        name={userDetail?.fullName}
        image={userDetail?.image}
      />
      <div className="flex-1 overflow-hidden">
        <div className="truncate font-semibold">{userDetail?.fullName}</div>
      </div>
      <ToolTip
        title="Sign Out"
        placement="right"
      >
        <span
          onClick={auth.logout}
          className="cursor-pointer"
        >
          <LogoutOutlineIcon />
        </span>
      </ToolTip>
    </div>
  );
};

export default UserInfo;
