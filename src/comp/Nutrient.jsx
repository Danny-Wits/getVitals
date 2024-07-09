import React from "react";

function Nutrient(props) {
  if (props.small) {
    return (
      <div className="flex">
        <span className="flex-grow p-1">{props.nutrient}</span>
        <span className="flex-grow py-1 px-3 text-right">
          {props.value.toFixed(0)}
          {props.unit}
        </span>
      </div>
    );
  }
  let remaining = props.dsa - props.value;
  if (remaining < 0) remaining = 0;
  let currentP = (props.value * 100) / props.dsa;
  let color = "🟢";
  if (currentP <= 1) color = "🔴";
  else if (currentP <= 25) color = "🟠";
  else if (currentP <= 70) color = "🟡";
  else if (currentP >= 100 && currentP <= 150) color = "🔵";
  else if (currentP > 150) color = "💀";
  return (
    <span className="my-2 sm:m-2 rounded-s-lg  rounded-e-lg flex flex-row flex-wrap">
      <span className="py-2 pl-1 pr-2 rounded-s-lg  border-2 border-black bg-black text-white">
        {props.nutrient}
      </span>

      <span className="py-2  pl-1 pr-2 font-bold border-2 border-black">
        {props.value.toFixed(1)}
        {props.unit}
      </span>
      <span className="py-2 pl-1 pr-2 rounded-e-lg font-bold border-r-2 border-black border-y-2">
        {color}
        {currentP.toFixed(0)}% ➕{remaining.toFixed(0)}
      </span>
    </span>
  );
}

export default Nutrient;
