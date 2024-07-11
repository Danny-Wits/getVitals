import React, { useContext, useRef } from "react";
import Nutrient from "./Nutrient";
import NutritionCard from "./NutritionCard";
import { RDAcontext } from "../const/RDAcontext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Eaten(props) {
  const n = props.nutrients;
  const total = n["carbohydrates_total_g"] + n["protein_g"] + n["fat_total_g"];
  const [RDA, _] = useContext(RDAcontext);
  useGSAP(() => {
    gsap.fromTo(
      ".nutrient-group",
      {
        scale: 0.1,
        opacity: 0,
      },
      {
        scale: 1,
        duration: 0.4,
        opacity: 1,
        delay: 0.1,
        ease: "elastic",
      }
    );
  }, [n]);

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

        <div className="flex flex-wrap ">
          <div className="nutrient-group md:w-auto">
            <p className="m-2 font-bold text-lg">ENERGY</p>
            <div className="mb-3 flex flex-wrap">
              <Nutrient
                nutrient="🔥CALORIES"
                value={n["calories"]}
                unit={"KC"}
                RDA={RDA.CALORIES}
              />
              <Nutrient
                nutrient="🧊SUGAR"
                value={n["sugar_g"]}
                unit={"g"}
                RDA={RDA.SUGAR}
              />
            </div>
          </div>

          <div className="nutrient-group md:w-auto">
            <p className="m-2 font-bold text-lg">MACRO NUTRIENTS</p>
            <div className="flex flex-wrap items-center">
              <div className="sm:w-2/3 ">
                <div className="mb-3 flex flex-wrap">
                  <Nutrient
                    nutrient="🥖CARBS"
                    value={n["carbohydrates_total_g"]}
                    unit={"g"}
                    RDA={RDA.CARBOHYDRATES}
                  />
                  <Nutrient
                    nutrient="💪PROTEIN"
                    value={n["protein_g"]}
                    unit={"g"}
                    RDA={RDA.PROTEIN}
                  />
                  <Nutrient
                    nutrient="🧈FATS"
                    value={n["fat_total_g"]}
                    unit={"g"}
                    RDA={RDA.FATS_TOTAL}
                  />
                  <Nutrient
                    nutrient="🌾FIBER"
                    value={n["fiber_g"]}
                    unit={"g"}
                    RDA={RDA.FIBER}
                  />
                </div>
              </div>
              <div className="p-1 sm:ml-auto w-10/12 sm:w-1/4">
                {n.eaten.length != 0 && (
                  <div className=" shadow-md shadow-black rounded-lg border-2">
                    <p className="p-2 font-bold text-lg">MACRO RATIO</p>
                    <Doughnut
                      data={{
                        labels: ["CARBS", "PROTEIN", "FATS"],
                        datasets: [
                          {
                            animation: {
                              delay: 1500,
                            },
                            label: "YOUR RATIO",
                            data: [
                              (n["carbohydrates_total_g"] / total) * 100,
                              (n["protein_g"] / total) * 100,
                              (n["fat_total_g"] / total) * 100,
                            ],
                            backgroundColor: [
                              "rgba(255, 99, 132,1)",
                              "rgba(120, 255, 120,1)",
                              "rgba(255, 205, 86,1)",
                            ],
                            hoverOffset: 5,
                          },
                          {
                            label: "OPTIMAL RATIO",
                            data: [50, 30, 20],
                            backgroundColor: [
                              "rgb(255, 99, 132)",
                              "rgb(120, 255, 120)",
                              "rgb(255, 205, 86)",
                            ],
                            hoverOffset: 2,
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            position: "bottom",
                            onClick: (e) => {},
                          },
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="nutrient-group md:w-5/12">
            <p className="m-2 font-bold text-lg">MINERALS</p>
            <div className="mb-3 flex flex-wrap">
              <Nutrient
                nutrient="🍌POTASSIUM"
                value={n["potassium_mg"]}
                unit={"mg"}
                RDA={RDA.POTASSIUM}
              />
              <Nutrient
                nutrient="🧂SODIUM"
                value={n["sodium_mg"]}
                unit={"mg"}
                RDA={RDA.SODIUM}
              />
            </div>
          </div>

          <div className="nutrient-group md:w-5/12">
            <p className="m-2 font-bold text-lg">FATS</p>
            <div className="mb-3 flex flex-wrap">
              <Nutrient
                nutrient="💯TOTAL"
                value={n["fat_total_g"]}
                unit={"g"}
                RDA={RDA.FATS_TOTAL}
              />
              <Nutrient
                nutrient="🥩SATURATED"
                value={n["fat_saturated_g"]}
                unit={"g"}
                RDA={RDA.FATS_SATURATED}
              />
              <Nutrient
                nutrient="🫀Cholesterol"
                value={n["cholesterol_mg"]}
                unit={"mg"}
                RDA={RDA.FATS_CHOLESTEROL}
              />
            </div>
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
                  smallText={true}
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
