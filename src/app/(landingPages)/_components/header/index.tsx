"use client";
import { Container } from "@/components";
import { ROUTES } from "@/enum";
import useScrollPosition from "@/hooks/scrollPosition";
import { usePathname } from "next/navigation";
import {
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
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam.",
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
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam.",
        path: ROUTES.ON_CALL,
        icon: onCallIcon,
      },
      {
        name: "In-Center Visits",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam.",
        path: ROUTES.IN_CENTER_VISITS,
        icon: houseCallIcon,
      },
      {
        name: "Move and Earn",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam.",
        path: ROUTES.MOVE_AND_EARN,
        icon: moveIcon,
      },
      {
        name: "Academy",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam.",
        path: ROUTES.ACADEMY,
        icon: academyIcon,
      },
      {
        name: "Musculoskeletal",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam.",
        path: ROUTES.MUSCULOSKELETAL,
        icon: musculoskeletalIcon,
      },
    ],
  },
];

export default function LandingPageHeader() {
  const pathName = usePathname();
  const scrollPosition = useScrollPosition();

  let headerClasses = `${classes.header} flex justify-center items-center fixed bg-white`;

  if (scrollPosition > 50) {
    headerClasses += ` ${classes.headerShadow}`;
  }
  return (
    <header className={headerClasses}>
      <div className="grow">
        <Container>
          <div className="flex items-center">
            <div className="">
              <BrandLogo />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-end space-x-6 font-manrope">
                <ul className="flex space-x-5">
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
          </div>
        </Container>
      </div>
    </header>
  );
}
