import React, { useState } from "react";
import NutritionCard from "./NutritionCard";

function Data(props) {
  if (props.data.length == 0) {
    return (
      <div className="border-4 rounded-lg p-3 shadow-lg shadow-black flex flex-col">
        <h2 className="text-black">INTRO</h2>
        <br />
        <p className="text-slate-600 text-justify">
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
          <br /> 1 Chicken Biryani
        </p>
        <br />
        <button
          className="m-2 p-3  rounded-xl border-black-400 border-2"
          onClick={props.load}
        >
          LOAD Previous MEALS ⚙️
          <br />
          <small className="font-thin">only use if visited before</small>
        </button>
      </div>
    );
  }
  return (
    <div className="border-4 rounded-lg p-2 shadow-lg shadow-black">
      <div className="w-full flex justify-start">
        <span className="m-2 p-2 text-xl ">SEARCH RESULTS</span>
        <button
          onClick={props.reset}
          className="rounded-xl ml-auto mr-2 p-2 my-2 text-white bg-black min-w-20 focus:scale-105 shadow-md shadow-black"
        >
          Clear❌
        </button>
      </div>
      {props.data.map((element, key) => {
        return (
          <NutritionCard
            key={key}
            nutrients={element}
            add={props.eat}
            remove={props.remove}
          />
        );
      })}
    </div>
  );
}

export default Data;
