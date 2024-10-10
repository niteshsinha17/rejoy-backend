import { FacebookIcon, InstagramIcon, LinkedInIcon, TiktokIcon, TwitterIcon, YouTubeIcon } from "@/../public/icons";
import { Container } from "@/components";
import { Routes } from "@/enum";
import Link from "next/link";
import BrandLogo from "../../app/(landingPages)/_components/brandLogo";

const Heading = (props: { children: string }) => {
  return <h5 className="font-medium text-lg text-black">{props.children}</h5>;
};

const Para = (props: { children: string }) => {
  return <p className="text-sm mt-2">{props.children}</p>;
};

const FooterLink = (props: { children: string; path: Routes | string }) => {
  return (
    <Link
      href={props.path}
      className="text-sm block mt-3 decoration-solid hover:underline"
    >
      {props.children}
    </Link>
  );
};

const soicalLinks = [
  {
    name: "Facebook",
    icon: <FacebookIcon className="icon-xs" />,
    url: "https://www.facebook.com/RejoyHealthUSA",
  },
  {
    name: "Twitter",
    icon: <TwitterIcon className="icon-xs" />,
    url: "https://twitter.com/rejoyhealth",
  },
  {
    name: "Linkedin",
    icon: <LinkedInIcon className="icon-xs" />,
    url: "https://www.linkedin.com/company/rejoyhealth",
  },
  {
    name: "Instagram",
    icon: <InstagramIcon className="icon-xs" />,
    url: "https://www.instagram.com/rejoyhealthusa/",
  },
  {
    name: "Youtube",
    icon: <YouTubeIcon className="icon-xs" />,
    url: "https://www.youtube.com/@rejoyhealthusa",
  },
  {
    name: "Tiktok",
    icon: <TiktokIcon className="icon-xs" />,
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
                Your trusted health companion, delivering personalized and precise answers in real-time, ensuring informed decisions for a
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
                      minHeight: "40px",
                      minWidth: "40px",
                      maxHeight: "40px",
                      maxWidth: "40px",
                    }}
                    className="group bg-[#e4e4e4] hover:bg-yellow flex items-center justify-center rounded-full"
                  >
                    {link.icon}
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
                <FooterLink path="mailto:hello@rejoyhealth.com">hello@rejoyhealth.com</FooterLink>
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
                {/* <FooterLink path={Routes.MOVE_AND_EARN}>Move and Earn</FooterLink> */}
                <FooterLink path={Routes.BLOG}>Blogs</FooterLink>
              </div>
              <div>
                <Heading>Term and Conditions</Heading>
                <FooterLink path={Routes.PRIVACY_POLICY}>Privacy policy</FooterLink>
                <FooterLink path={Routes.TERMS_OF_SERVIVE}>Terms of Service</FooterLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
