"use client";
import { Routes } from "@/enum";
import { Button } from "@/ui";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Header from "../base";
import { INavItem } from "./interface";
import NavDropdown from "./navDropdown";
import NavLink from "./navLink";
import classes from "./style.module.css";

const navLinks: INavItem[] = [
  {
    name: "Home",
    path: Routes.HOME,
    type: "link",
  },
  {
    name: "Move & Earn",
    path: Routes.MOVE_AND_EARN,
    type: "link",
  },
  {
    name: "Blogs",
    path: Routes.BLOG,
    type: "link",
  },
];

const HeaderMain = () => {
  const pathName = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  // let headerClasses = `${classes.header} flex justify-center items-center fixed bg-white h-[100px] md:h-[auto]`;

  // if (openMenu) {
  //   headerClasses += ` ${classes.headerOpen}`;
  // }
  // if (scrollPosition > 50) {
  //   headerClasses += ` ${classes.headerShadow}`;
  // }

  const close = () => {
    setOpenMenu(false);
  };

  return (
    <div className="border-b transition-all duration-300 ease">
      <div className="max-w-screen-lg mx-auto">
        <Header>
          <Header.Left>
            <Header.Logo />
          </Header.Left>
          <Header.Middle>
            <div
              className={`fixed md:relative top-[100px] md:top-[0px] bg-white md:bg-[transparent] flex-1
              md:h-[auto] w-[100%] md:w-[auto] left-[0px] ${classes.nav}
              `}
            >
              <div className="h-[100%] md:h-[auto] flex flex-col md:flex-row md:items-center md:space-x-6 font-manrope">
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
              </div>
            </div>
          </Header.Middle>
          <Header.Right>
            {/* <Button href={Routes.DOWNLOAD}>Download App</Button> */}
            <Button
              variant="outline"
              color="black"
              href={Routes.DOWNLOAD}
            >
              Provider Login
            </Button>
          </Header.Right>
        </Header>
      </div>
    </div>
  );
};

const StickyHeader = () => {
  const header = useRef<HTMLDivElement>(null);
  const lastScrolledPosition = useRef(0);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.currentTarget as Document;
      const headerEl = header.current;
      if (headerEl && target) {
        const scrollTop = target.documentElement.scrollTop;
        if (scrollTop > lastScrolledPosition.current) {
          if (scrollTop > 50) {
            headerEl.style.top = "0px";
            headerEl.style.opacity = "1";
          } else {
            headerEl.style.top = "-100px";
            headerEl.style.opacity = "0";
          }
        } else if (scrollTop < lastScrolledPosition.current) {
          headerEl.style.top = "-100px";
          headerEl.style.opacity = "0";
        }
        lastScrolledPosition.current = scrollTop;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={header}
      className="fixed top-[100px] w-full transition-all duration-300 ease-in z-[1300] shadow-md bg-white opacity-0"
    >
      <HeaderMain />
    </div>
  );
};

export default function LandingPageHeader() {
  return (
    <>
      <HeaderMain />
      <StickyHeader />
    </>
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
