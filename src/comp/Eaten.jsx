import React, { useEffect, useState } from "react";
import Nutrient from "./Nutrient";
import { DAILY_NUTRIENT_REQUIREMENTS as DSA} from "../const/dsaNutrient";
function Eaten(props) {
  const n = props.nutrients;
  return (
    <div className="m-1 border-4 border-purple-950 rounded-lg p-3 bg-green-300">
        <p className="mb-4 text-2xl font-extrabold text-indigo-950">{n['name']}</p>
        <div className=" mb-3 bg-green-500 p-2 rounded-lg">
        <p>ENERGY</p>
        <div className="mb-3 flex flex-wrap">
            <Nutrient nutrient="🔥CALORIES" value={n['calories']} unit={"KCAL"} dsa={DSA.CALORIES}/>
            <Nutrient nutrient="🧊SUGAR" value={n['sugar_g']} unit={"g"} dsa={DSA.SUGAR}/>
        </div>
        </div>
        
        <div className=" mb-3 bg-orange-300 p-2 rounded-lg">
        <p>MACRO NUTRIENTS</p>
        <div className="mb-3 flex flex-wrap">
        <Nutrient nutrient="🥖CARBS" value={n['carbohydrates_total_g']} unit={'g'} dsa={DSA.CARBOHYDRATES}/>
        <Nutrient nutrient="💪PROTEIN" value={n['protein_g']} unit={'g'} dsa={DSA.PROTEIN}/>
        <Nutrient nutrient="🧈FATS" value={n['fat_total_g']} unit={'g'} dsa={DSA.FATS.total}/>
        <Nutrient nutrient="🌾FIBER" value={n['fiber_g']} unit={'g'} dsa={DSA.FIBER}/>
        </div>
        </div>
        
        <div className=" mb-3 bg-slate-400 p-2 rounded-lg">
        <p>MINERALS</p>
        <div className="mb-3 flex flex-wrap">
        <Nutrient nutrient="🍌POTASSIUM" value={n['potassium_mg']} unit={'mg'} dsa={DSA.POTASSIUM}/>
        <Nutrient nutrient="🧂SODIUM" value={n['sodium_mg']} unit={'mg'} dsa={DSA.SODIUM}/>
        </div>
        </div>

       
        <div className=" mb-3 bg-amber-600 p-2 rounded-lg">
        <p>FATS</p>
        <div className="mb-3 flex flex-wrap">
        <Nutrient nutrient="💯TOTAL" value={n['fat_total_g']} unit={'g'} dsa={DSA.FATS.total}/>
        <Nutrient nutrient="🥩SATURATED" value={n['fat_saturated_g']} unit={'g'} dsa={DSA.FATS.saturated}/>
        <Nutrient nutrient="🫀Cholesterol" value={n['cholesterol_mg']} unit={'mg'} dsa={DSA.FATS.cholesterol}/>
        </div>
        </div>
        <div className="flex justify-end">
        <button className="focus:bg-red-400 m-2 p-3 justify-items-end rounded-full bg-lime-400 border-white border-2" onClick={props.reset}>RESET🪥</button>
        </div>
    </div>
  );
}

export default Eaten;
