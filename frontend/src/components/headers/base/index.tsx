import { AppRoutes } from "@/enum";
import { Button } from "@/ui";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Logo } from "../../../../public/images";

interface IBaseHeaderProps {
  children?: ReactNode;
}

const Header = (props: IBaseHeaderProps) => {
  return <div className="header flex justify-between items-center h-[80px] px-2 md:px-6 gap-2 sm:gap-6">{props.children}</div>;
};

const HeaderLeft = (props: IBaseHeaderProps) => {
  return <div className="flex items-center">{props.children}</div>;
};

const HeaderRight = (props: IBaseHeaderProps) => {
  return <div className="flex items-center gap-2">{props.children}</div>;
};

const HeaderMiddle = (props: IBaseHeaderProps) => {
  return <div className="flex-1 overflow-hidden">{props.children}</div>;
};

const AuthButtons = () => {
  return (
    <div className="flex gap-2">
      <Button href={AppRoutes.LOGIN}>Sign In</Button>
      <Button
        variant="outline"
        color="black"
        href={AppRoutes.REGISTER}
      >
        Sign up free
      </Button>
    </div>
  );
};

const HeaderLogo = () => {
  return (
    <Link href="/">
      <Image
        className="h-[50px] w-auto"
        src={Logo}
        alt="rejoy-heath-logo"
        height={50}
        width={100}
      />
    </Link>
  );
};

Header.Left = HeaderLeft;
Header.Right = HeaderRight;
Header.Middle = HeaderMiddle;
Header.Logo = HeaderLogo;
Header.AuthButtons = AuthButtons;

export default Header;
