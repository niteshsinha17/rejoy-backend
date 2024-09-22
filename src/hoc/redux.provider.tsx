"use client";

import { IChildrenProps } from "@/models";
import { store } from "@/store";
import { Provider } from "react-redux";

export const ReduxProvider = (props: IChildrenProps) => {
  return <Provider store={store}>{props.children}</Provider>;
};
