import React from "react";
import Nutrient from "./Nutrient";
function NutritionCard(props) {
  const n = props.nutrients;
  return (
    <div className="border-4 border-dotted border-purple-950 rounded-lg p-3 bg-red-300">
        <p className="mb-4 text-2xl font-extrabold text-indigo-950">{n['name']}</p>
        <div className=" mb-3 bg-green-500 p-2 rounded-lg">
        <p>ENERGY</p>
        <div className="mb-3 flex flex-wrap">
            <Nutrient nutrient="CALORIES" value={n['calories']} unit={"KCAL"}/>
            <Nutrient nutrient="SUGAR" value={n['sugar_g']} unit={"g"}/>
        </div>
        </div>
        
        <div className=" mb-3 bg-orange-300 p-2 rounded-lg">
        <p>MACRO NUTRIENTS</p>
        <div className="mb-3 flex flex-wrap">
        <Nutrient nutrient="CARBOHYDRATES" value={n['carbohydrates_total_g']} unit={'g'}/>
        <Nutrient nutrient="PROTEIN" value={n['protein_g']} unit={'g'}/>
        <Nutrient nutrient="FATS" value={n['fat_total_g']} unit={'g'}/>
        <Nutrient nutrient="FIBER" value={n['fiber_g']} unit={'g'}/>
        </div>
        </div>
        
        <div className=" mb-3 bg-slate-400 p-2 rounded-lg">
        <p>MINERALS</p>
        <div className="mb-3 flex flex-wrap">
        <Nutrient nutrient="POTASSIUM" value={n['potassium_mg']} unit={'mg'}/>
        <Nutrient nutrient="SODIUM" value={n['sodium_mg']} unit={'mg'}/>
        </div>
        </div>

       
        <div className=" mb-3 bg-amber-600 p-2 rounded-lg">
        <p>FATS</p>
        <div className="mb-3 flex flex-wrap">
        <Nutrient nutrient="TOTAL" value={n['fat_total_g']} unit={'g'}/>
        <Nutrient nutrient="SATURATED" value={n['fat_saturated_g']} unit={'g'}/>
        <Nutrient nutrient="Cholesterol" value={n['cholesterol_mg']} unit={'mg'}/>
        </div>
        </div>
    </div>
  );
}

export default NutritionCard;
