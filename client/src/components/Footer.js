import React from "react";

export default function Footer() {
  return (
    <footer
      className="bottom-0 text-left py-2 pl-5 text-md rounded-sm shadow-card"
      style={{ backgroundColor: "#BEC8FF" }}
    >
      <p className="w-20 mb-1 sm:w-full font-medium">Made by Kevin Xu</p>
      <a
        href="https://github.com/karkevin"
        className="text-lgfont-medium hover:font-bold transition-all"
      >
        Github
        <span className="pl-1">&#x1F4A1;</span>
      </a>
    </footer>
  );
}
