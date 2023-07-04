import { Container } from "@/components";
import { ROUTES } from "@/enum";
import Link from "next/link";
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

const Footer = () => {
  return (
    <div className="py-[120px]">
      <Container>
        <BrandLogo />
        <div className="mt-[30px] flex gap-[100px]">
          <div className="w-3/12">
            <Heading>Company</Heading>
            <Para>
              Rejoy Health offers next-gen digital health solutions that helped
              10,000+ people improve their lives.
            </Para>
          </div>
          <div className="w-9/12">
            <div className="grid grid-cols-4 md:grid-cols-3">
              <div>
                <Heading>Contact</Heading>
                <Para>600 California St,</Para>
                <Para>San Francisco, CA 94108</Para>
                <FooterLink path="mailto:hello@rejoyhealth.com">
                  hello@rejoyhealth.com
                </FooterLink>
              </div>
              <div>
                <Heading>Solutions</Heading>
                <FooterLink path={ROUTES.DIGITAL_PHYSICAL_THERAPY}>
                  Digital Physical Therapy
                </FooterLink>
                <FooterLink path={ROUTES.ON_CALL}>On Call</FooterLink>
                <FooterLink path={ROUTES.PRECISION_MOTION_TECHNOLOGY}>
                  Precision Motion Technology
                </FooterLink>
                <FooterLink path={ROUTES.MOVE}>Move</FooterLink>
                <FooterLink path={ROUTES.IN_CENTER_VISITS}>
                  House Calls
                </FooterLink>
              </div>
              <div>
                <Heading>Term and Conditions</Heading>
                <FooterLink path={ROUTES.DIGITAL_PHYSICAL_THERAPY}>
                  Privacy policy
                </FooterLink>
                <FooterLink path={ROUTES.ON_CALL}>Terms of Service</FooterLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
