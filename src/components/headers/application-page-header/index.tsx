import Header from "../base";
import HeaderLeft from "./header-left";
import UserProfile from "./user-profile";

const AppPageHeader = () => {
  return (
    <div className="sticky top-0">
      <div className="max-w-screen-lg mx-auto">
        <Header>
          <Header.Left>
            <HeaderLeft />
          </Header.Left>
          <Header.Right>
            <div className="flex gap-3 items-center">
              <UserProfile />
            </div>
          </Header.Right>
        </Header>
      </div>
    </div>
  );
};

export default AppPageHeader;
