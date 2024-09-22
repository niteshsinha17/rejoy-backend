"use client";
import { Container } from "@/components";
import { ROUTES } from "@/enum";
import useScrollPosition from "@/hooks/scrollPosition";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "../../../../../public/icons";
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
];

export default function LandingPageHeader() {
  const pathName = usePathname();
  const scrollPosition = useScrollPosition();

  const [openMenu, setOpenMenu] = useState(false);
  let headerClasses = `${classes.header} flex justify-center items-center fixed bg-white h-[100px] md:h-[auto]`;

  if (openMenu) {
    headerClasses += ` ${classes.headerOpen}`;
  }
  if (scrollPosition > 50) {
    headerClasses += ` ${classes.headerShadow}`;
  }

  const close = () => {
    setOpenMenu(false);
  };
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
                <ul className={`md:flex md:space-x-5 ${classes.navList}`}>
                  {navLinks.map((navLink, index) => {
                    if (navLink.path && navLink.type === "link")
                      return (
                        <NavLink
                          onClick={close}
                          active={pathName === navLink.path}
                          name={navLink.name}
                          path={navLink.path}
                          key={index}
                        />
                      );
                    if (navLink.type === "dropdown") {
                      return (
                        <NavDropdown
                          close={close}
                          item={navLink}
                          key={index}
                        />
                      );
                    }
                  })}
                </ul>
                <Link
                  onClick={close}
                  href={ROUTES.DOWNLOAD}
                  className={`${classes.downloadButton} py-5 text-center text-lg  md:text-base font-poppins`}
                >
                  Download the app
                </Link>
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

/*
 {
    name: "Solutions",
    type: "dropdown",
    children: [
      {
        name: "Precision Motion Technology",
        description:
          "Discover a groundbreaking approach to joint and muscle care with our state-of-the-art RejoyMotion™ technology",
        path: ROUTES.PRECISION_MOTION_TECHNOLOGY,
        icon: motionIcon,
      },
      {
        name: "Digital Physical Therapy",
        description:
          "Computer Vision powered physical therapy from the comfort of your home",
        path: ROUTES.DIGITAL_PHYSICAL_THERAPY,
        icon: therapyIcon,
      },
      {
        name: "Musculoskeletal Care",
        description:
          "Physical therapists with advanced computer vision and AI to provide customized treatment plans that can be accessed from the comfort of your own home",
        path: ROUTES.MUSCULOSKELETAL,
        icon: musculoskeletalIcon,
      },
      {
        name: "On Call",
        description: "Your 24/7 on-demand access to Specialists",
        path: ROUTES.ON_CALL,
        icon: onCallIcon,
      },
      {
        name: "In-Center Visits",
        description:
          "Experience exceptional care that complements the convenience of digital accessibility with the personalized touch of in-person visits",
        path: ROUTES.IN_CENTER_VISITS,
        icon: houseCallIcon,
      },
      {
        name: "Move and Earn",
        description:
          "Rejoy empowers you to embrace the value of daily movement by rewarding your every step",
        path: ROUTES.MOVE_AND_EARN,
        icon: moveIcon,
      },
      {
        name: "Academy",
        description:
          "Your ultimate pain relief companion, offering comprehensive resources and ChatGPT-powered guidance for a pain-free life",
        path: ROUTES.ACADEMY,
        icon: academyIcon,
      },
      {
        name: "Mindful Meditation",
        description:
          "Guided meditations help you reduce stress-related pain, stress & anxiety associated with the rehabilitation process",
        path: ROUTES.MINDFULL_MEDITATION,
        icon: meditationIcon,
      },
    ],
  },
  */
