import React from "react";

export default function ProgressBar() {
  return (
    <progress value={3} max={10} className="progress-bar">
      30%
    </progress>
  );
}
