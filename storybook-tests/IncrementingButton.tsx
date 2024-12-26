import React, { CSSProperties } from "react";

import "./IncrementingButton.css";

/** Primary UI component for user interaction */
export const IncrementingButton = ({
  primary,
  backgroundColor,
  size,
  label,
  onClick,
  ...props
}: IncrementingButtonProps) => {
  const clickHandler = () => {
    onClick(label + 1);
  };
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";
  return (
    <button
      type="button"
      className={["storybook-button", `storybook-button--${size}`, mode].join(
        " "
      )}
      style={backgroundColor && { backgroundColor }}
      onClick={clickHandler}
      {...props}
    >
      {label}
    </button>
  );
};

export interface IncrementingButtonProps {
  /** Is this the principal call to action on the page? */
  primary: boolean;
  /** What background color to use */
  backgroundColor: CSSProperties["backgroundColor"];
  /** How large should the button be? */
  size: "small" | "medium" | "large";
  /** Button contents */
  label: number;
  /** Optional click handler */
  onClick: (label: number) => void;
}

IncrementingButton.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: "medium",
  onClick: undefined,
};
