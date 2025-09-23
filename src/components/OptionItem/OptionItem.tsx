import { type MouseEventHandler, type FC } from "react";
import clsx from "clsx";

import classes from "./OptionItem.module.css";

type OptionItemProps = {
  disabled: boolean;
  label: string;
  value: string;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const OptionItem: FC<OptionItemProps> = ({
  disabled,
  label,
  value,
  isSelected,
  onClick,
}) => {
  return (
    <button
      key={value}
      disabled={disabled}
      className={clsx(classes["root"], {
        [classes["selected"]]: isSelected,
      })}
      type="button"
      value={value}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
