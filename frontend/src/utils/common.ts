import { nconf } from "@/conf";
import { Routes } from "@/enum";
import clsx from "clsx";
import { ClassValue } from "cva/dist/types";
import { Metadata } from "next";
import { SyntheticEvent } from "react";
import { twMerge } from "tailwind-merge";

export const getPageMetaData = (data?: Metadata, route?: Routes): Metadata => {
  return {
    ...data,
    openGraph: {
      title: data?.title || "Access expert healthcare information 24x7 at your fingertips | Rejoy Health",
      description: data?.description || "Access expert healthcare information 24x7 at your fingertips",
      type: "website",
      // images: data?.openGraph?.images || "/images/og-default.png",
      siteName: "Rejoy Health",
      url: `${nconf.get("BASE_URL")}${route || ""}`,
    },
  };
};

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formikFieldConfig = (formik: any) => {
  return (fieldName: string) => {
    const fieldProps = formik.getFieldProps(fieldName);
    const helpersProps = formik.getFieldMeta(fieldName);
    return {
      ...fieldProps,
      name: fieldName,
      setValue: formik.setFieldValue,
      error: helpersProps.touched ? helpersProps.error : undefined,
    };
  };
};

export const getFilledRoutes = (route: string, pathParams: Record<string, string>) => {
  let path: string = route;
  Object.keys(pathParams).forEach((key) => {
    path = path.replace(":" + key, pathParams[key]);
  });

  return path;
};

export const baseMatchRoute = (route: string, pathname: string, exact: boolean) => {
  if (exact) {
    return route === pathname;
  } else {
    return pathname?.startsWith(route);
  }
};

export const stopPropagation = (e: SyntheticEvent) => {
  e.stopPropagation();
};
