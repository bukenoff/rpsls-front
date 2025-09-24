import { type MouseEventHandler, type FC } from "react";
import clsx from "clsx";

import classes from "./OptionItem.module.css";

type OptionItemProps = {
  disabled: boolean;
  icon: string;
  label: string;
  value: string;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const OptionItem: FC<OptionItemProps> = ({
  disabled,
  icon,
  label,
  value,
  isSelected,
  onClick,
}) => {
  return (
    <button
      aria-label={label}
      disabled={disabled}
      className={clsx(classes["root"], {
        [classes["selected"]]: isSelected,
      })}
      type="button"
      value={value}
      onClick={onClick}
      tabIndex={0}
    >
      {icon}
    </button>
  );
};
