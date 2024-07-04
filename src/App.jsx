import { useEffect, useRef, useState } from "react";
import Data from "./comp/Data";
import Eaten from "./comp/Eaten";
import { NavLink, Route, Routes } from "react-router-dom";

function App() {
  const [query, setQuery] = useState("");
  const queryChanged = (event) => {
    setQuery(event.target.value);
  };
  const [data, setData] = useState([]);
  const button = useRef(null);
  const fetchInfo = () => {
    if (query.trim() == "") return;
    searchStarted();
    let url = "https://api.calorieninjas.com/v1/nutrition?query=" + query;
    fetch(url, {
      method: "GET",
      headers: { "X-Api-Key": import.meta.env.VITE_YEK },
    })
      .then((response) => {
        searchEnded();
        return response.json();
      })
      .then((newData) => {
        if (newData.items.length == 0) alert("NO MATCH FOUND!");
        setData((prev) => {
          return [...newData.items, ...prev];
        });
      })
      .catch((error) => console.log(error));
  };
  const searchStarted = () => {
    button.current.disabled = true;
    button.current.innerHTML = "🔍ADDING➕";
  };
  const searchEnded = () => {
    setQuery("");
    button.current.innerHTML = "ADD➕";
    button.current.disabled = false;
  };
  useEffect(
    () =>
      document.addEventListener("keydown", (event) => {
        if (event.key == "Enter") button.current.click();
      }),
    []
  );

  const [eaten, setEaten] = useState({
    name: "EATEN🍴",
    calories: 0,
    serving_size_g: 0,
    fat_total_g: 0,
    fat_saturated_g: 0,
    protein_g: 0,
    sodium_mg: 0,
    potassium_mg: 0,
    cholesterol_mg: 0,
    carbohydrates_total_g: 0,
    fiber_g: 0,
    sugar_g: 0,
  });

  const addToEaten = (n) => {
    setEaten((e) => {
      return {
        name: "EATEN🍴",
        calories: e.calories + n.calories,
        serving_size_g: e.serving_size_g + n.serving_size_g,
        fat_total_g: e.fat_total_g + n.fat_total_g,
        fat_saturated_g: e.fat_saturated_g + n.fat_saturated_g,
        protein_g: e.protein_g + n.protein_g,
        sodium_mg: e.sodium_mg + n.sodium_mg,
        potassium_mg: e.potassium_mg + n.potassium_mg,
        cholesterol_mg: e.cholesterol_mg + n.cholesterol_mg,
        carbohydrates_total_g:
          e.carbohydrates_total_g + n.carbohydrates_total_g,
        fiber_g: e.fiber_g + n.fiber_g,
        sugar_g: e.sugar_g + n.sugar_g,
      };
    });
  };

  const delFromEaten = (n) => {
    setEaten((e) => {
      return {
        name: "EATEN🍴",
        calories: e.calories - n.calories,
        serving_size_g: e.serving_size_g - n.serving_size_g,
        fat_total_g: e.fat_total_g - n.fat_total_g,
        fat_saturated_g: e.fat_saturated_g - n.fat_saturated_g,
        protein_g: e.protein_g - n.protein_g,
        sodium_mg: e.sodium_mg - n.sodium_mg,
        potassium_mg: e.potassium_mg - n.potassium_mg,
        cholesterol_mg: e.cholesterol_mg - n.cholesterol_mg,
        carbohydrates_total_g:
          e.carbohydrates_total_g - n.carbohydrates_total_g,
        fiber_g: e.fiber_g - n.fiber_g,
        sugar_g: e.sugar_g - n.sugar_g,
      };
    });
  };
  const eatenReset = () => {
    setEaten({
      name: "EATEN🍴",
      calories: 0,
      serving_size_g: 0,
      fat_total_g: 0,
      fat_saturated_g: 0,
      protein_g: 0,
      sodium_mg: 0,
      potassium_mg: 0,
      cholesterol_mg: 0,
      carbohydrates_total_g: 0,
      fiber_g: 0,
      sugar_g: 0,
    });
  };
  return (
    <div className="w-screen h-screen">
      <div className="bg-slate-100 p-2 shadow-xl rounded-md mb-3 mx-3">
        <h1 className="m-5  text-red-900 text-center text-3xl">
          WHAT IS IN YOUR FOOD{" "}
        </h1>
        <div className="w-full p-2 flex justify-evenly items-center">
          <input
            value={query}
            onChange={queryChanged}
            placeholder="WHAT ARE YOU EATING... "
            className="w-1/2 p-1 bg-red-100 text-slate-600 placeholder:text-sm rounded-md border-red-500 border-2"
            type="text"
          />
          <button
            ref={button}
            onClick={fetchInfo}
            className=" ps-2 pe-2 p-1 text-slate-600 bg-red-100 hover:bg-red-300 focus:ring-4 focus:ring-bg-amber-300 font-medium rounded-lg border-2 border-red-500 disabled:bg-red-500"
          >
            ADD➕
          </button>
          <button
            onClick={() => setData([])}
            className=" ps-2 pe-2 p-1 text-slate-600 bg-red-100 hover:bg-red-300 focus:ring-4 focus:ring-bg-amber-300 font-medium rounded-lg border-2 border-red-500 disabled:bg-red-500"
          >
            CLEAR🧼
          </button>
        </div>
      </div>

      <div className="flex justify-around px-2 pt-2">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "px-2 pt-2 bg-red-400 rounded-t-lg"
              : "m-1 p-2 border-2 border-red-800 rounded-lg bg-red-300 hover:bg-red-500 hover:text-white"
          }
          to={"/"}
        >
          ADD MORE FOOD
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "px-2 pt-2 bg-green-400 rounded-t-lg"
              : "m-1 p-2 border-2 border-green-800 rounded-lg bg-green-300 hover:bg-green-500 hover:text-white"
          }
          to={"/eaten"}
        >
          WHAT YOU ATE
        </NavLink>
      </div>

      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Data data={data} eat={addToEaten} delete={delFromEaten} />
            }
          ></Route>
          <Route
            path="/eaten"
            element={
              <div className="mx-2 p-2 bg-green-400 shadow-xl shadow-green-500">
                <Eaten key={-1} nutrients={eaten} reset={eatenReset} />
              </div>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}
export default App;
