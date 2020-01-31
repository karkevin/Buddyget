import React from "react";

const capitalize = string => {
  return string.substr(0, 1).toUpperCase() + string.substr(1);
};

const ModalItem = props => {
  return (
    <div className="mb-4">
      <label className="block my-3">{`${capitalize(props.name)}:`}</label>
      <input
        type={props.type}
        name={props.name}
        onChange={props.change}
        className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
        defaultValue={props.value}
      />
    </div>
  );
};

export default ModalItem;
