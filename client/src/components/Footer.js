import React from "react";

export default function Footer() {
  return (
    <footer
      className="bottom-0 text-left py-4 pl-5 text-md rounded-sm shadow-card"
      style={{ backgroundColor: "#B5C0FF" }}
    >
      <p className="w-20 mb-1 sm:w-full font-medium opacity-70">
        Made by Kevin Xu
      </p>
      <a
        href="https://github.com/karkevin"
        className="text-lg font-medium opacity-70 hover:font-bold transition-all"
      >
        Github
        <span className="pl-1">&#x1F4A1;</span>
      </a>
    </footer>
  );
}
