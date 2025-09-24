import { PropsWithChildren, type FC } from "react";

import classes from "./OptionList.module.css";

export const OptionList: FC<PropsWithChildren> = ({ children }) => {
  return <ul className={classes.root}>{children}</ul>;
};
