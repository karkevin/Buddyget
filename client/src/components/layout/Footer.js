import React from "react";

export default function Footer() {
  return (
    <footer className="bottom-0 w-1/4 text-left py-4 pl-5 text-md ">
      <p className="w-20 mb-1 sm:w-full font-medium opacity-70">
        Made by Kevin Xu
      </p>
      <a
        href="https://github.com/karkevin"
        className="text-lg font-medium opacity-70 hover:font-bold transition-all transition-100"
      >
        Github
        <span className="pl-1">&#x1F4A1;</span>
      </a>
    </footer>
  );
}
