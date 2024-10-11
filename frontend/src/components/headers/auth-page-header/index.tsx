import Header from "../base";

const AuthLayoutHeader = () => {
  return (
    <Header>
      <Header.Left>
        <Header.Logo />
      </Header.Left>
      <Header.Right>
        <Header.AuthButtons />
      </Header.Right>
    </Header>
  );
};

export default AuthLayoutHeader;
