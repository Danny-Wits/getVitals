import React, { useContext, useState } from "react";
import { RDAcontext } from "../const/RDAcontext";
import RDAchanger from "./RDAchanger";

function RDA(props) {
  const [RDA, setRDA] = useContext(RDAcontext);
  const change = (name, e) => {
    setRDA((prev) => {
      let x = prev;
      x[name] = e.target.value;
      return {
        ...x,
      };
    });
  };
  return (
    <div className="border-4 rounded-lg p-3 shadow-lg shadow-black flex flex-col">
      <div className="flex p-2 justify-end items-end">
        <p className="mb-4 mr-auto text-2xl font-extrabold text-indigo-950">
          RDA VALUES
        </p>
      </div>
      <div>
        <button
          className="m-2 p-2 font-bold rounded-xl min-w-20 border-gray-500 border-2 hover:scale-105 focus:scale-105"
          onClick={props.save}
        >
          SAVE🍪
        </button>
        <button
          className="m-2 p-2 font-bold rounded-xl min-w-20 border-gray-500 border-2 hover:scale-105 focus:scale-105 "
          onClick={props.reset}
        >
          RESET⟳
        </button>
      </div>
      <div className="nutrient-group mb-3 flex flex-wrap">
        <RDAchanger name={"CALORIES"} value={RDA.CALORIES} change={change} />
        <RDAchanger name={"SUGAR"} value={RDA.SUGAR} change={change} />
        <RDAchanger
          name={"CARBOHYDRATES"}
          value={RDA.CARBOHYDRATES}
          change={change}
        />
        <RDAchanger name={"PROTEIN"} value={RDA.PROTEIN} change={change} />
        <RDAchanger
          name={"FATS_TOTAL"}
          value={RDA.FATS_TOTAL}
          change={change}
        />
        <RDAchanger name={"FIBER"} value={RDA.FIBER} change={change} />
        <RDAchanger name={"POTASSIUM"} value={RDA.POTASSIUM} change={change} />
        <RDAchanger name={"SODIUM"} value={RDA.SODIUM} change={change} />
        <RDAchanger
          name={"FATS_SATURATED"}
          value={RDA.FATS_SATURATED}
          change={change}
        />
        <RDAchanger
          name={"FATS_CHOLESTEROL"}
          value={RDA.FATS_CHOLESTEROL}
          change={change}
        />
      </div>
    </div>
  );
}

export default RDA;
