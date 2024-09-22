import { Size } from "@/enum";
export interface ILayoutProps {
  children: React.ReactNode;
}

export interface IChildrenProps {
  children: React.ReactNode;
}

export interface IMap<D> {
  [key: string]: D;
}

export type ISizeMap<T = string> = {
  [key in Size]: T;
};
