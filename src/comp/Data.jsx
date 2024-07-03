import React, { useState } from "react";
import NutritionCard from "./NutritionCard";


function Data(props) {
  if (props.data.length==0) {
    return (
      <div className=" flex flex-col items-center m-2 p-3 bg-red-100 border-red-400 border-2">
        <h2 className="text-black">INTRO</h2>
        <br />
        <p className="text-slate-600">
          Hey there 👋, food explorers! Ready to unlock the secrets of your
          snacks and meals? Here, you can become a nutrition superhero! Our
          awesome tool tells you everything you need to know about the nutrients
          in your food, making healthy eating fun and easy.
        </p>
        <br />
        <h2 className="text-black">START</h2>
        <p className="text-slate-600">
          Just type in what you want to SEARCH🔍... <br />
          Follow the format : <br /> Quantity🔢 Name of the Food🍽️ and then the
          next food item
        </p>
        <br />
        <h2 className="text-black">EXAMPLES</h2>
        <p className="text-slate-600">
          1kg sugar
          <br /> one apple and one orange
          <br /> 100g cake with 10 cookies
        </p>
      </div>
    );
  }
  return (
  
    <div className="m-1 p-1 bg-red-500">
      {props.data.map((element, key) => {
        return <NutritionCard key={key} nutrients={element} add={props.eat} delete={props.delete} />;
      })}
    </div>
  );
}

export default Data;
