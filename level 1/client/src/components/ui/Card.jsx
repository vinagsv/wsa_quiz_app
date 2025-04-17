import React from "react";
import clsx from "clsx";
export default function Card({ className, children }) {
  return (
    <article className={clsx("card-wrapper", className)}>{children}</article>
  );
}
