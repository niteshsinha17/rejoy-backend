import { nconf } from "@/conf";
import type { Routes } from "@/enum";
import clsx, { type ClassValue } from "clsx";
import type { Metadata } from "next";
import type { SyntheticEvent } from "react";
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

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
  for (const key of Object.keys(pathParams)) {
    path = path.replace(`:${key}`, pathParams[key]);
  }

  return path;
};

export const baseMatchRoute = (route: string, pathname: string, exact: boolean) => {
  if (exact) {
    return route === pathname;
  }
  return pathname?.startsWith(route);
};

export const stopPropagation = (e: SyntheticEvent) => {
  e.stopPropagation();
};
