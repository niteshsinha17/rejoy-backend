"use client";

import { IChildrenProps } from "@/models/common/other";
import { store } from "@/store";
import { Provider } from "react-redux";

export const ReduxProvider = (props: IChildrenProps) => {
  return <Provider store={store}>{props.children}</Provider>;
};
