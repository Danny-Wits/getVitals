import React, { useEffect, useState } from "react";
import Nutrient from "./Nutrient";
import { DAILY_NUTRIENT_REQUIREMENTS as DSA} from "../const/dsaNutrient";
function NutritionCard(props) {
  const n = props.nutrients;
  const [img,setImg]=useState('🍽️')
  useEffect(()=>{
    let url=`https://emoji-api.com/emojis?search=${n['name']}&access_key=${import.meta.env.VITE_EMOJI}`
    fetch(url,{method:"get"})
    .then(response=>{return response.json();})
    .then(data=>{
      if(data.hasOwnProperty('0')){setImg(data['0'].character)}
      else setImg('🍽️')
     })
    .catch(error=>console.log(error));

  }
  ,[])


  return (
    <div className="border-4 border-dotted border-purple-950 rounded-lg p-3 bg-red-300">
        <p className="mb-4 text-2xl font-extrabold text-indigo-950">{n['name']+img}</p>
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
        <Nutrient nutrient="🥖CARBOHYDRATES" value={n['carbohydrates_total_g']} unit={'g'} dsa={DSA.CARBOHYDRATES}/>
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
    </div>
  );
}

export default NutritionCard;
