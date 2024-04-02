import { Container } from "@/components";
import { ROUTES } from "@/enum";
import Image from "next/image";
import Link from "next/link";
import {
  facebookIcon,
  instagramIcon,
  linkedInIcon,
  tiktokIcon,
  twitterIcon,
  youTubeIcon,
} from "../../../../../public/icons";
import BrandLogo from "../brandLogo";

const Heading = (props: { children: string }) => {
  return (
    <h5 className="font-poppins font-semibold text-lg">{props.children}</h5>
  );
};

const Para = (props: { children: string }) => {
  return (
    <p className="font-manrope font-normal text-base mt-2 leading-loose text-textSecondary">
      {props.children}
    </p>
  );
};

const FooterLink = (props: { children: string; path: ROUTES | string }) => {
  return (
    <Link
      href={props.path}
      className="font-poppins block font-normal  text-base mt-3 decoration-solid hover:underline text-textSecondary"
    >
      {props.children}
    </Link>
  );
};

const soicalLinks = [
  {
    name: "Facebook",
    icon: facebookIcon,
    url: "https://www.facebook.com/RejoyHealthUSA",
  },
  {
    name: "Twitter",
    icon: twitterIcon,
    url: "https://twitter.com/rejoyhealth",
  },
  {
    name: "Linkedin",
    icon: linkedInIcon,
    url: "https://www.linkedin.com/company/rejoyhealth",
  },
  {
    name: "Instagram",
    icon: instagramIcon,
    url: "https://www.instagram.com/rejoyhealthusa/",
  },
  {
    name: "Youtube",
    icon: youTubeIcon,
    url: "https://www.youtube.com/@rejoyhealthusa",
  },
  {
    name: "Tiktok",
    icon: tiktokIcon,
    url: "https://www.tiktok.com/@rejoyhealth",
  },
];

const Footer = () => {
  return (
    <div className="py-[60px] md:py-[120px]">
      <Container>
        <BrandLogo />
        <div className="mt-[30px] flex flex-col gap-5 lg:flex-row md:gap-[100px]">
          <div className="w-12/12 md:w-3/12">
            <div className="max-w-md">
              <Heading>Company</Heading>
              <Para>
                Your trusted health companion, delivering personalized and
                precise answers in real-time, ensuring informed decisions for a
                healthier you
              </Para>
            </div>

            <div className="flex gap-3 mt-4">
              {soicalLinks.map((link, index) => {
                return (
                  <Link
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      minHeight: "30px",
                      minWidth: "30px",
                      maxHeight: "30px",
                      maxWidth: "30px",
                    }}
                    className="group bg-[#e4e4e4] hover:bg-yellow flex items-center justify-center rounded-full"
                  >
                    <Image
                      src={link.icon}
                      alt={link.name}
                      width={20}
                      height={20}
                      className="h-[16px] w-[16px]"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="w-12/12 md:w-9/12">
            <div className="grid md:grid-cols-3 gap-5 md:gap-[0px]">
              <div>
                <Heading>Contact</Heading>
                <Para>600 California St,</Para>
                <Para>San Francisco, CA 94108</Para>
                <FooterLink path="mailto:hello@rejoyhealth.com">
                  hello@rejoyhealth.com
                </FooterLink>
              </div>
              {/* <div>
                <Heading>Our Technology</Heading>
                <FooterLink path={ROUTES.PRECISION_MOTION_TECHNOLOGY}>
                  Precision Motion Technology
                </FooterLink>
              </div> */}
              {/* <div>
                <Heading>Solutions</Heading>
                <FooterLink path={ROUTES.DIGITAL_PHYSICAL_THERAPY}>
                  Digital Physical Therapy
                </FooterLink>
                <FooterLink path={ROUTES.MUSCULOSKELETAL}>
                  Musculoskeletal Care
                </FooterLink>
                <FooterLink path={ROUTES.ON_CALL}>On Call</FooterLink>
                <FooterLink path={ROUTES.IN_CENTER_VISITS}>
                  In-Center Visits
                </FooterLink>
              </div> */}
              <div>
                <Heading>Resources</Heading>
                {/* <FooterLink path={ROUTES.ACADEMY}>Academy</FooterLink>*/}
                <FooterLink path={ROUTES.MOVE_AND_EARN}>
                  Move and Earn
                </FooterLink>
              </div>
              <div>
                <Heading>Term and Conditions</Heading>
                <FooterLink path={ROUTES.PRIVACY_POLICY}>
                  Privacy policy
                </FooterLink>
                <FooterLink path={ROUTES.TERMS_OF_SERVIVE}>
                  Terms of Service
                </FooterLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
