import React, { useEffect, useState } from "react";
import Nutrient from "./Nutrient";
import { DAILY_NUTRIENT_REQUIREMENTS as DSA } from "../const/dsaNutrient";
function NutritionCard(props) {
  const n = props.nutrients;
  const mealPerDay = 1;
  const [img, setImg] = useState("🍽️");

  useEffect(() => {
    let url = `https://emoji-api.com/emojis?search=${n["name"]}&access_key=${
      import.meta.env.VITE_EMOJI
    }`;
    fetch(url, { method: "get" })
      .then((response) => {
        console.log("fetched");
        return response.json();
      })
      .then((data) => {
        if (data.hasOwnProperty("0")) {
          setImg(data["0"].character);
        } else setImg("🍽️");
      })
      .catch((error) => console.log(error));
  }, [props]);

  return (
    <div className="m-1 mb-2 border-4 border-dotted border-purple-950 rounded-lg p-3 bg-red-300">
      <p className="p-2 mb-2 mr-auto text-2xl font-semibold text-indigo-950">
        {n["name"] + img}
      </p>
      <div className="flex justify-left mb-2 items-centre">
        {props.hasOwnProperty("add") && (
          <button
            className="focus:bg-lime-400 m-2 p-2 rounded-full bg-yellow-400 border-red-400 border-2"
            onClick={() => {
              props.add(n);
            }}
          >
            EAT🍴
          </button>
        )}
        {props.hasOwnProperty("delete") && (
          <button
            className="focus:bg-orange-400 m-2 p-2 rounded-full bg-yellow-400 border-red-400 border-2"
            onClick={() => {
              props.delete(n);
            }}
          >
            UN-EAT❌
          </button>
        )}
        {props.hasOwnProperty("remove") && (
          <button
            className="m-2 p-2   rounded-full bg-yellow-400 border-red-400 border-2"
            onClick={() => {
              props.remove(n);
            }}
          >
            DELETE🗑️
          </button>
        )}
      </div>

      <div className=" mb-3 bg-green-500 p-2 rounded-lg">
        <p>ENERGY</p>
        <div className="mb-3 flex flex-wrap">
          <Nutrient
            nutrient="🔥CALORIES"
            value={n["calories"]}
            unit={"KC"}
            dsa={DSA.CALORIES / mealPerDay}
          />
          <Nutrient
            nutrient="🧊SUGAR"
            value={n["sugar_g"]}
            unit={"g"}
            dsa={DSA.SUGAR / mealPerDay}
          />
        </div>
      </div>
      <div className=" mb-3 bg-orange-300 p-2 rounded-lg">
        <p>MACRO NUTRIENTS</p>
        <div className="mb-3 flex flex-wrap">
          <Nutrient
            nutrient="🥖CARBS"
            value={n["carbohydrates_total_g"]}
            unit={"g"}
            dsa={DSA.CARBOHYDRATES / mealPerDay}
          />
          <Nutrient
            nutrient="💪PROTEIN"
            value={n["protein_g"]}
            unit={"g"}
            dsa={DSA.PROTEIN / mealPerDay}
          />
          <Nutrient
            nutrient="🧈FATS"
            value={n["fat_total_g"]}
            unit={"g"}
            dsa={DSA.FATS.total / mealPerDay}
          />
          <Nutrient
            nutrient="🌾FIBER"
            value={n["fiber_g"]}
            unit={"g"}
            dsa={DSA.FIBER / mealPerDay}
          />
        </div>
      </div>
      <div className="mb-3 bg-slate-400 p-2 rounded-lg">
        <p>MINERALS</p>
        <div className="mb-3 flex flex-wrap">
          <Nutrient
            nutrient="🍌POTASSIUM"
            value={n["potassium_mg"]}
            unit={"mg"}
            dsa={DSA.POTASSIUM / mealPerDay}
          />
          <Nutrient
            nutrient="🧂SODIUM"
            value={n["sodium_mg"]}
            unit={"mg"}
            dsa={DSA.SODIUM / mealPerDay}
          />
        </div>
      </div>
      <div className=" mb-3 bg-amber-600 p-2 rounded-lg">
        <p>FATS</p>
        <div className="mb-3 flex flex-wrap">
          <Nutrient
            nutrient="💯TOTAL"
            value={n["fat_total_g"]}
            unit={"g"}
            dsa={DSA.FATS.total / mealPerDay}
          />
          <Nutrient
            nutrient="🥩SATURATED"
            value={n["fat_saturated_g"]}
            unit={"g"}
            dsa={DSA.FATS.saturated / mealPerDay}
          />
          <Nutrient
            nutrient="🫀Cholesterol"
            value={n["cholesterol_mg"]}
            unit={"mg"}
            dsa={DSA.FATS.cholesterol / mealPerDay}
          />
        </div>
      </div>
    </div>
  );
}

export default NutritionCard;
