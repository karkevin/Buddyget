import React from "react";

export default function Card(props) {
  return (
    <div className="h-72 w-64 shadow-card rounded bg-white text-center p-4 mb-10 mx-2 sm:h-80 sm:w-72 md:w-56 lg:w-72">
      <p className="font-bold text-2xl mt-2 mb-8 sm:text-3xl md:text-2xl lg:text-3xl">
        {props.title}
      </p>
      <p className="opacity-70 sm:text-lg md:text-md lg:text-lg">
        {props.content}
      </p>
    </div>
  );
}
