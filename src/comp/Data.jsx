import React from "react";
import NutritionCard from "./NutritionCard";

function Data(props) {
  if (!props.data.hasOwnProperty("items")) {
    return (
      <div className="m-2 p-3 bg-red-500">
        {" "}
        <p>Start Searching</p>
      </div>
    );
  }
  if (!props.data.items.hasOwnProperty("0")) {
    return (
      <div className="m-2 p-3 text-wrap bg-red-500">
        <div className="border-4 border-dotted border-purple-950 rounded-lg p-3 bg-red-300">
          <p>
            Could NOT FIND ANY RESULT CHECK YOUR SPELLING OR TRY MORE BREAKING
            IT DOWN IN SIMPLER ITEMS{" "}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="m-2 p-3 bg-red-500">
      {props.data.items.map((element, key) => {
        return <NutritionCard key={key} nutrients={element} />;
      })}
    </div>
  );
}

export default Data;
