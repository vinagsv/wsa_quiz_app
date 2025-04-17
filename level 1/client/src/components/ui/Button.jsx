import React, { useMemo } from "react";
import clsx from "clsx";

export default function Button({
  size,
  loading,
  loadingText = "Loading...",
  children,
  onClick,
  disabled,
  icon,
  iconPosition,
}) {
  const buttonClass = useMemo(
    () => clsx("btn", size, { loading, disabled }),
    [size, loading, disabled]
  );

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? loadingText : children}
      {!loading && icon && iconPosition === "right" && icon}
    </button>
  );
}
