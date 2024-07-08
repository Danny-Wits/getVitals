import React, { useEffect, useState } from "react";
import Nutrient from "./Nutrient";
import NutritionCard from "./NutritionCard";
import { DAILY_NUTRIENT_REQUIREMENTS as DSA } from "../const/dsaNutrient";
function Eaten(props) {
  const n = props.nutrients;
  return (
    <>
      <div className="border-4 rounded-lg p-3 shadow-lg shadow-black">
        <div className="flex p-2 justify-evenly items-end">
          <p className="mb-4 mr-auto text-2xl font-extrabold text-indigo-950">
            {n["name"]}
          </p>
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
            RESET🪥
          </button>
        </div>
        <div></div>

        <div className="nutrient-group">
          <p className="m-2 font-bold text-lg">ENERGY</p>
          <div className="mb-3 flex flex-wrap">
            <Nutrient
              nutrient="🔥CALORIES"
              value={n["calories"]}
              unit={"KC"}
              dsa={DSA.CALORIES}
            />
            <Nutrient
              nutrient="🧊SUGAR"
              value={n["sugar_g"]}
              unit={"g"}
              dsa={DSA.SUGAR}
            />
          </div>
        </div>

        <div className="nutrient-group">
          <p className="m-2 font-bold text-lg">MACRO NUTRIENTS</p>
          <div className="mb-3 flex flex-wrap">
            <Nutrient
              nutrient="🥖CARBS"
              value={n["carbohydrates_total_g"]}
              unit={"g"}
              dsa={DSA.CARBOHYDRATES}
            />
            <Nutrient
              nutrient="💪PROTEIN"
              value={n["protein_g"]}
              unit={"g"}
              dsa={DSA.PROTEIN}
            />
            <Nutrient
              nutrient="🧈FATS"
              value={n["fat_total_g"]}
              unit={"g"}
              dsa={DSA.FATS.total}
            />
            <Nutrient
              nutrient="🌾FIBER"
              value={n["fiber_g"]}
              unit={"g"}
              dsa={DSA.FIBER}
            />
          </div>
        </div>

        <div className="nutrient-group">
          <p className="m-2 font-bold text-lg">MINERALS</p>
          <div className="mb-3 flex flex-wrap">
            <Nutrient
              nutrient="🍌POTASSIUM"
              value={n["potassium_mg"]}
              unit={"mg"}
              dsa={DSA.POTASSIUM}
            />
            <Nutrient
              nutrient="🧂SODIUM"
              value={n["sodium_mg"]}
              unit={"mg"}
              dsa={DSA.SODIUM}
            />
          </div>
        </div>

        <div className="nutrient-group">
          <p className="m-2 font-bold text-lg">FATS</p>
          <div className="mb-3 flex flex-wrap">
            <Nutrient
              nutrient="💯TOTAL"
              value={n["fat_total_g"]}
              unit={"g"}
              dsa={DSA.FATS.total}
            />
            <Nutrient
              nutrient="🥩SATURATED"
              value={n["fat_saturated_g"]}
              unit={"g"}
              dsa={DSA.FATS.saturated}
            />
            <Nutrient
              nutrient="🫀Cholesterol"
              value={n["cholesterol_mg"]}
              unit={"mg"}
              dsa={DSA.FATS.cholesterol}
            />
          </div>
        </div>
      </div>
      {n.eaten.length != 0 && (
        <div className="border-4 rounded-lg p-2 mt-6 shadow-lg shadow-black">
          <p className="p-2 mx-2 mt-8 mb-1 text-2xl font-extrabold text-indigo-950">
            LIST OF THINGS YOU ATE
          </p>
          <div className="mt-2">
            {n.eaten.map((element, key) => {
              return (
                <NutritionCard
                  key={key}
                  small={true}
                  nutrients={element}
                  delete={props.delete}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Eaten;
