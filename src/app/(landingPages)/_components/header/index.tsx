"use client";
import { Container } from "@/components";
import { ROUTES } from "@/enum";
import useScrollPosition from "@/hooks/scrollPosition";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  CloseIcon,
  MenuIcon,
  academyIcon,
  houseCallIcon,
  motionIcon,
  moveIcon,
  musculoskeletalIcon,
  onCallIcon,
  therapyIcon,
} from "../../../../../public/icons";
import BrandLogo from "../brandLogo";
import NavDropdown from "../navDropdown";
import NavLink from "../navLink";
import { INavItem } from "./interface";
import classes from "./style.module.css";

const navLinks: INavItem[] = [
  {
    name: "Home",
    path: ROUTES.HOME,
    type: "link",
  },
  {
    name: "Solutions",
    type: "dropdown",
    children: [
      {
        name: "Precision Motion Technology",
        description:
          "Discover a groundbreaking approach to joint and muscle care with our state-of-the-art TrueMotion™ technology.",
        path: ROUTES.PRECISION_MOTION_TECHNOLOGY,
        icon: motionIcon,
      },
      {
        name: "Digital Physical Therapy",
        description:
          "AI-powered physical therapy from the comfort of your home.",
        path: ROUTES.DIGITAL_PHYSICAL_THERAPY,
        icon: therapyIcon,
      },
      {
        name: "On Call",
        description: "Your 24/7 on-demand access to Clinical Pain Specialists",
        path: ROUTES.ON_CALL,
        icon: onCallIcon,
      },
      {
        name: "In-Center Visits",
        description:
          "Experience exceptional care that combines the convenience of digital accessibility with the personalized touch of in-person visits.",
        path: ROUTES.IN_CENTER_VISITS,
        icon: houseCallIcon,
      },
      {
        name: "Move and Earn",
        description:
          "Rejoy empowers you to embrace the value of daily movement by rewarding your every step. ",
        path: ROUTES.MOVE_AND_EARN,
        icon: moveIcon,
      },
      {
        name: "Academy",
        description:
          "Your comprehensive resource for achieving a pain-free life.",
        path: ROUTES.ACADEMY,
        icon: academyIcon,
      },
      {
        name: "Musculoskeletal",
        description:
          "Physical therapists with advanced computer vision and AI to provide customized treatment plans that can be accessed from the comfort of your own home.",
        path: ROUTES.MUSCULOSKELETAL,
        icon: musculoskeletalIcon,
      },
    ],
  },
];

export default function LandingPageHeader() {
  const pathName = usePathname();
  const scrollPosition = useScrollPosition();

  const [openMenu, setOpenMenu] = useState(false);
  let headerClasses = `${classes.header} flex justify-center items-center fixed bg-white h-[100px] md:h-[auto]`;

  if (openMenu) {
    headerClasses += ` bg-white `;
  }
  if (scrollPosition > 50) {
    headerClasses += ` ${classes.headerShadow}`;
  }
  return (
    <header className={headerClasses}>
      <div className="grow">
        <Container>
          <div className="flex justify-between items-center">
            <div className="">
              <BrandLogo />
            </div>
            <div
              className={`fixed md:relative top-[100px] md:top-[0px] bg-white md:bg-[transparent] flex-1 
              md:h-[auto] w-[100%] md:w-[auto] left-[0px] ${classes.nav}
              `}
            >
              <div className="h-[100%] md:h-[auto] flex flex-col md:flex-row md:items-center justify-end md:space-x-6 font-manrope">
                <ul className="md:flex md:space-x-5">
                  {navLinks.map((navLink, index) => {
                    if (navLink.path && navLink.type === "link")
                      return (
                        <NavLink
                          active={pathName === navLink.path}
                          name={navLink.name}
                          path={navLink.path}
                          key={index}
                        />
                      );
                    if (navLink.type === "dropdown") {
                      return <NavDropdown item={navLink} key={index} />;
                    }
                  })}
                </ul>
                <span
                  className={`${classes.downloadButton} text-base font-poppins`}
                >
                  Download the app
                </span>
              </div>
            </div>

            <div className="md:hidden">
              <button onClick={() => setOpenMenu(!openMenu)}>
                <Image
                  className="h-3 w-3"
                  src={openMenu ? CloseIcon : MenuIcon}
                  alt="toggle"
                />
              </button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
