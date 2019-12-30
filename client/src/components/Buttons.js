import React from "react";
import { Link } from "react-router-dom";

export default function Buttons() {
  return (
    <div>
      <Link to="/sign-up">
        <button className="px-3 py-1 lg:px-6 lg:py-2 lg:text-xl rounded-sm shadow-card border-2 bg-violet border-violet text-white font-roboto font-bold focus:outline-none hover:bg-violet-dark hover:border-violet-dark transition-all">
          SIGN UP
        </button>
      </Link>
      <Link to="/login">
        <button className="ml-2 md:ml-5 px-3 py-1 lg:px-6 lg:py-2 lg:text-xl rounded-sm shadow-card border-2 bg-white border-violet text-violet font-roboto font-bold focus:outline-none hover:bg-violet hover:text-white transition-all">
          LOGIN
        </button>
      </Link>
    </div>
  );
}
