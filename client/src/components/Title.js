import React from "react";

// assets
import logo from "../../public/logo.png";
import favicon from "../../public/favicon.png";

export default function Title() {
  return (
    <div className="flex items-center">
      <img src={logo} alt="Buddyget" className="h-16 xs:hidden" />
      <img
        src={favicon}
        alt="Buddyget"
        className="hidden xs:block h-16 sm:h-20 lg:h-24"
      />
      <p className="hidden xs:inline-block font-bold text-2xl ml-2 sm:text-3xl sm:ml-6 md:text-4xl">
        Buddyget
      </p>
    </div>
  );
}
