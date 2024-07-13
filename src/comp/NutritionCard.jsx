import React, { useContext, useEffect, useState } from "react";
import Nutrient from "./Nutrient";
import { RDAcontext } from "../const/RDAcontext";

function NutritionCard(props) {
  const n = props.nutrients;
  const mealPerDay = 1;
  const [loaded, setIconLoaded] = useState(false);
  const [small, setSmall] = useState(props.small);
  const [RDA, _] = useContext(RDAcontext);
  useEffect(() => {
    let url = `https://emoji-api.com/emojis?search=${n["name"]}&access_key=${
      import.meta.env.VITE_EMOJI
    }`;
    if (n.icon == "🍽️" && !loaded) {
      fetch(url, { method: "get" })
        .then((response) => {
          console.log("fetched");
          return response.json();
        })
        .then((data) => {
          if (data.hasOwnProperty("0")) {
            n.icon = data["0"].character;
            setIconLoaded(true);
          } else {
            n.icon = "";
            setIconLoaded(true);
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);
  if (small) {
    return (
      <div className="mx-1 my-4 border-4 rounded-lg p-3 shadow-lg shadow-black">
        <div className="p-1 flex items-center">
          <p
            onClick={() => setSmall((prev) => !prev)}
            className="p-2 mr-auto text-2xl font-semibold text-indigo-950"
          >
            {n.name}
            {n.icon}
          </p>
          <p className="p-2 text-xl font-bold text-indigo-950">
            {n.serving_size_g}G
          </p>
          {props.hasOwnProperty("delete") && (
            <button
              className="p-2"
              onClick={() => {
                props.delete(n);
              }}
            >
              ❌
            </button>
          )}
        </div>
        <div className="flex justify-left mb-2 items-centre">
          {props.hasOwnProperty("add") && (
            <button
              className="mx-2 p-2 font-bold rounded-xl bg-black min-w-20 text-white hover:bg-gray-700 focus:scale-105 shadow-md shadow-black"
              onClick={() => {
                props.add(n);
              }}
            >
              EAT🍴
            </button>
          )}

          {props.hasOwnProperty("remove") && (
            <button
              className="mx-2 p-2 font-bold rounded-xl bg-black min-w-20 text-white hover:bg-gray-700 focus:scale-105 shadow-md shadow-black"
              onClick={() => {
                props.remove(n);
              }}
            >
              DELETE🗑️
            </button>
          )}
        </div>

        <div className="my-3 shadow-md shadow-black rounded-lg border-2 p-1">
          <p className="p-2 mr-auto font-semibold text-indigo-950">SUMMARY</p>
          <div>
            <Nutrient
              nutrient="🔥CALORIES"
              value={n["calories"]}
              unit={"KC"}
              small={true}
            />
            <Nutrient
              nutrient="🥖CARBS"
              value={n["carbohydrates_total_g"]}
              unit={"g"}
              small={true}
            />
            <Nutrient
              nutrient="💪PROTEIN"
              value={n["protein_g"]}
              unit={"g"}
              small={true}
            />
            <Nutrient
              nutrient="🧈FATS"
              value={n["fat_total_g"]}
              unit={"g"}
              small={true}
            />
          </div>
        </div>
        <p onClick={() => setSmall((prev) => !prev)} className="text-center">
          TAP FOR DETAILS
        </p>
      </div>
    );
  }
  return (
    <div className="mx-1 my-4 border-4 rounded-lg p-3 shadow-lg shadow-black">
      <div className="p-1 flex">
        <p
          onClick={() => setSmall((prev) => !prev)}
          className="p-2 mr-auto text-2xl font-semibold text-indigo-950"
        >
          {n.name}
          {n.icon}
        </p>
        {props.hasOwnProperty("delete") && (
          <button
            className="p-2"
            onClick={() => {
              props.delete(n);
            }}
          >
            ❌
          </button>
        )}
      </div>

      <div className="flex justify-left mb-2 items-centre">
        {props.hasOwnProperty("add") && (
          <button
            className="mx-2 p-2 font-bold rounded-xl bg-black min-w-20 text-white hover:bg-gray-700 focus:scale-105 shadow-md shadow-black"
            onClick={() => {
              props.add(n);
            }}
          >
            EAT🍴
          </button>
        )}
        {props.hasOwnProperty("remove") && (
          <button
            className="mx-2 p-2 font-bold rounded-xl bg-black min-w-20 text-white hover:bg-gray-700 focus:scale-105 shadow-md shadow-black"
            onClick={() => {
              props.remove(n);
            }}
          >
            DELETE🗑️
          </button>
        )}
      </div>

      <div className="nutrient-group">
        <p className="m-2 font-bold text-lg">ENERGY</p>
        <div className="mb-3 flex flex-wrap">
          <Nutrient
            nutrient="🔥CALORIES"
            value={n["calories"]}
            unit={"KC"}
            RDA={RDA.CALORIES / mealPerDay}
            smallText={props.smallText}
          />
          <Nutrient
            nutrient="🧊SUGAR"
            value={n["sugar_g"]}
            unit={"g"}
            RDA={RDA.SUGAR / mealPerDay}
            smallText={props.smallText}
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
            RDA={RDA.CARBOHYDRATES / mealPerDay}
            smallText={props.smallText}
          />
          <Nutrient
            nutrient="💪PROTEIN"
            value={n["protein_g"]}
            unit={"g"}
            RDA={RDA.PROTEIN / mealPerDay}
            smallText={props.smallText}
          />
          <Nutrient
            nutrient="🧈FATS"
            value={n["fat_total_g"]}
            unit={"g"}
            RDA={RDA.FATS_TOTAL / mealPerDay}
            smallText={props.smallText}
          />
          <Nutrient
            nutrient="🌾FIBER"
            value={n["fiber_g"]}
            unit={"g"}
            RDA={RDA.FIBER / mealPerDay}
            smallText={props.smallText}
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
            RDA={RDA.POTASSIUM / mealPerDay}
            smallText={props.smallText}
          />
          <Nutrient
            nutrient="🧂SODIUM"
            value={n["sodium_mg"]}
            unit={"mg"}
            RDA={RDA.SODIUM / mealPerDay}
            smallText={props.smallText}
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
            RDA={RDA.FATS_TOTAL / mealPerDay}
            smallText={props.smallText}
          />
          <Nutrient
            nutrient="🥩SATURATED"
            value={n["fat_saturated_g"]}
            unit={"g"}
            RDA={RDA.FATS_SATURATED / mealPerDay}
            smallText={props.smallText}
          />
          <Nutrient
            nutrient="🫀Cholesterol"
            value={n["cholesterol_mg"]}
            unit={"mg"}
            RDA={RDA.FATS_CHOLESTEROL / mealPerDay}
            smallText={props.smallText}
          />
        </div>
      </div>
      <p onClick={() => setSmall((prev) => !prev)} className="text-center">
        TAP TO HIDE DETAILS
      </p>
    </div>
  );
}

export default NutritionCard;
