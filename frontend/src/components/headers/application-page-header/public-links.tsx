import { userApi } from "@/services/user.service";

const PublicLinks = () => {
  const { data: userDetail } = userApi.useLoggedInUserQuery();

  if (!userDetail) return null;

  return (
    <>
      {/* <Button
        variant="text"
        target="_blank"
        href={getFilledRoutes(AppRoutes.DOCTOR_PROFILE, {
          username: userDetail.username,
        })}
        startIcon={<OpenInNewTabOutlineIcon />}
      >
        Profile
      </Button> */}

      {/* <Button
        variant="text"
        target="_blank"
        href={getFilledRoutes(AppRoutes.DOCTOR_AGENT, {
          username: userDetail.username,
        })}
        startIcon={<OpenInNewTabOutlineIcon />}
      >
        Agent
      </Button> */}
    </>
  );
};

export default PublicLinks;
