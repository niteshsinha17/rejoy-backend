import { nconf } from "@/conf";
import { ROUTES } from "@/enum";
import { Metadata } from "next";

export const getPageMetaData = (data?: Metadata, route?: ROUTES): Metadata => {
  return {
    ...data,
    openGraph: {
      title:
        data?.title ||
        "Access expert healthcare information 24x7 at your fingertips | Rejoy Health",
      description:
        data?.description ||
        "Access expert healthcare information 24x7 at your fingertips",
      type: "website",
      // images: data?.openGraph?.images || "/images/og-default.png",
      siteName: "Rejoy Health",
      url: `${nconf.get("BASE_URL")}${route || ""}`,
    },
  };
};
