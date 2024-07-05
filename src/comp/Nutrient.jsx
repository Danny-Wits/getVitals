import React from "react";

function Nutrient(props) {
  let remaining = props.dsa - props.value;
  if (remaining < 0) remaining = 0;
  let currentP = (props.value * 100) / props.dsa;
  let color = "✅";
  if (currentP <= 1) color = "🟥";
  else if (currentP <= 25) color = "🟧";
  else if (currentP <= 70) color = "🟨";
  else if (currentP >= 100 && currentP <= 150) color = "🟦";
  else if (currentP > 150) color = "💀";
  return (
    <span className="my-2 sm:m-2 rounded-s-lg  rounded-e-lg flex flex-row flex-wrap">
      <span className="py-2 pl-1 pr-2 rounded-s-lg  border-2 border-black bg-black text-white">
        {props.nutrient}
      </span>

      <span className="py-2  pl-1 pr-2 font-bold border-2 border-black text-black">
        {props.value.toFixed(2)}
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
