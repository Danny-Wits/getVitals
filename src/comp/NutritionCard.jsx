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
    if (img != "🍽️") return;
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
  }, [props.nutrients.map]);

  return (
    <div className="m-1 mb-2 border-4 border-dotted border-purple-950 rounded-lg p-3 bg-red-300">
      <div className="flex p-2 justify-evenly items-end">
        <p className="mb-4 mr-auto text-2xl font-extrabold text-indigo-950">
          {n["name"] + img}
        </p>
        <button
          className="focus:bg-lime-400 m-2 p-3 justify-items-end rounded-full bg-yellow-400 border-red-400 border-2"
          onClick={() => {
            props.add(n);
          }}
        >
          EAT🍴
        </button>
        <button
          className="focus:bg-red-400 m-2 p-3 justify-items-end rounded-full bg-yellow-400 border-red-400 border-2"
          onClick={() => {
            props.delete(n);
          }}
        >
          DELETE❌
        </button>
      </div>
      <div className=" mb-3 bg-green-500 p-2 rounded-lg">
        <p>ENERGY</p>
        <div className="mb-3 flex flex-wrap">
          <Nutrient
            nutrient="🔥CALORIES"
            value={n["calories"]}
            unit={"KCAL"}
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

      <div className=" mb-3 bg-slate-mealPerDay00 p-2 rounded-lg">
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
