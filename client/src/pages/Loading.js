import React from "react";

import Title from "../components/landing/Title";

export default function Loading() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Title />
      <p className="mt-12 font-bold text-3xl">Loading...</p>
    </div>
  );
}
