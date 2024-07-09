import React from "react";

function RDAchanger(props) {
  return (
    <span className="my-2 sm:m-2 rounded-s-lg  rounded-e-lg ">
      <span className="p-3 rounded-s-lg text-white bg-black ">
        {props.name.replace("_", " ")}
      </span>
      <input
        className="p-2 rounded-e-lg border-2 border-gray-400 flex-shrink"
        type="number"
        value={props.value}
        onChange={(e) => {
          props.change(props.name.toUpperCase(), e);
        }}
      />
    </span>
  );
}

export default RDAchanger;
