import React from "react";

function RDAchanger(props) {
  return (
    <span className="my-2 sm:m-2 rounded-s-lg  rounded-e-lg flex">
      <span className="p-3 min-w-36 rounded-s-lg text-white bg-black ">
        {props.name
          .replace("FATS_SATURATED", "SATURATED FATS")
          .replace("FATS_CHOLESTEROL", "CHOLESTEROL")
          .replace("FATS_TOTAL", "FATS")}
      </span>
      <input
        className="w-1/2 p-2 rounded-e-lg border-2 border-gray-400"
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
