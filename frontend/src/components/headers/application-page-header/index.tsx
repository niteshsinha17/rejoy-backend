"use client";
import { useEffect, useRef } from "react";
import Header from "../base";
import HeaderLeft from "./header-left";
import PublicLinks from "./public-links";
import UserProfile from "./user-profile";

const AppPageHeader = () => {
  const header = useRef<HTMLDivElement>(null);

  const handleScrolled = () => {
    header.current?.classList.add("border-b");
  };

  const handleEnscrolled = () => {
    header.current?.classList.remove("border-b");
  };

  useEffect(() => {
    const container = document.getElementById("app-scrollable-view");
    if (!container) return;

    container?.addEventListener("scroll", () => {
      if (container.scrollTop > 0) {
        handleScrolled();
      } else {
        handleEnscrolled();
      }
    });

    if (container?.scrollTop > 0) {
      handleScrolled();
    } else {
      handleEnscrolled();
    }
  }, []);

  return (
    <div
      ref={header}
      className="sticky top-[0px] bg-white"
    >
      <div className="max-w-screen-lg mx-auto">
        <Header>
          <Header.Left>
            <HeaderLeft />
          </Header.Left>
          <Header.Right>
            <div className="flex gap-3 items-center">
              <PublicLinks />
              <UserProfile />
            </div>
          </Header.Right>
        </Header>
      </div>
    </div>
  );
};

export default AppPageHeader;
