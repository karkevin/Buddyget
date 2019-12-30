import React from "react";

export default function FormInput(props) {
  return (
    <div className="mb-4">
      <label className="block mt-6 mb-1 lg:text-xl">{`${props.name
        .charAt(0)
        .toUpperCase() + props.name.substring(1)}:`}</label>
      <input
        type={props.name}
        name={props.name.toLowerCase()}
        onChange={props.onChange}
        className="appearance-none flex-1 w-full py-1 px-2 lg:py-2 focus:outline-none rounded-sm border border-gray-600 border-solid"
      />
    </div>
  );
}
