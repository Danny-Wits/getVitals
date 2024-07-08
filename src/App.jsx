import { useEffect, useRef, useState } from "react";
import Data from "./comp/Data";
import Eaten from "./comp/Eaten";
import { NavLink, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

function App() {
  //!STATES
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [eaten, setEaten] = useState({
    name: "EATEN",
    icon: "🍴",
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
    eaten: [],
  });

  const queryChanged = (event) => {
    setQuery(event.target.value);
  };

  //!REFS
  const button = useRef(null);
  const eatenTab = useRef(null);
  const eatTab = useRef(null);

  //!API CALL
  const fetchInfo = () => {
    if (query.trim() == "") return;
    searchStarted();
    let url =
      "https://api.calorieninjas.com/v1/nutrition?query=" +
      query.trim().toLowerCase();
    fetch(url, {
      method: "GET",
      headers: { "X-Api-Key": import.meta.env.VITE_YEK },
    })
      .then((response) => {
        searchEnded();
        return response.json();
      })
      .then((newData) => {
        if (newData.items.length == 0) {
          alert("NO MATCH FOUND!");
          return;
        }

        setData((prev) => {
          return [...addIconToData(newData.items), ...prev];
        });
      })
      .catch((error) => console.log(error));
  };

  const searchStarted = () => {
    button.current.disabled = true;
    button.current.innerHTML = "Searching";
  };
  const searchEnded = () => {
    setQuery("");
    button.current.innerHTML = "Search";
    button.current.disabled = false;
    eatTab.current.click();
  };

  //!DATA MANIPULATION
  const rmFromData = (n) => {
    setData((prev) => prev.filter((element) => element != n));
  };

  const addIconToData = (array) => {
    return array.map((e) => {
      e.icon = "🍽️";
      return e;
    });
  };
  const resetData = () => {
    setData([]);
  };
  const keydown = (event) => {
    if (event.key == "Enter" && button.current != null) {
      button.current.click();
    }
  };

  //!EATEN MANIPULATION
  const addToEaten = (n) => {
    setEaten((e) => {
      eatenTab.current.className =
        "m-2 p-2 font-bold rounded-xl bg-black min-w-20 text-white hover:scale-105 focus:scale-105 shadow-md shadow-black after:content-['👇']";
      return {
        name: "EATEN",
        icon: "🍽️",
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
        eaten: [n, ...e.eaten],
      };
    });
    rmFromData(n);
  };
  const delFromEaten = (n) => {
    setEaten((e) => {
      let multiplier = 1;
      return {
        name: "EATEN",
        icon: "🍽️",
        calories: e.calories - n.calories * multiplier,
        serving_size_g: e.serving_size_g - n.serving_size_g * multiplier,
        fat_total_g: e.fat_total_g - n.fat_total_g * multiplier,
        fat_saturated_g: e.fat_saturated_g - n.fat_saturated_g * multiplier,
        protein_g: e.protein_g - n.protein_g * multiplier,
        sodium_mg: e.sodium_mg - n.sodium_mg * multiplier,
        potassium_mg: e.potassium_mg - n.potassium_mg * multiplier,
        cholesterol_mg: e.cholesterol_mg - n.cholesterol_mg * multiplier,
        carbohydrates_total_g:
          e.carbohydrates_total_g - n.carbohydrates_total_g * multiplier,
        fiber_g: e.fiber_g - n.fiber_g * multiplier,
        sugar_g: e.sugar_g - n.sugar_g * multiplier,
        eaten: e.eaten.filter((element) => element != n),
      };
    });
  };
  const eatenReset = () => {
    setEaten({
      name: "EATEN",
      icon: "🍴",
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
      eaten: [],
    });
  };

  //!SAVE AND LOAD COOKIES
  const save = () => {
    let flag = confirm(
      "DO YOU WANT TO USE BROWSER ES🍪 TO STORE YOUR MEALS ??? "
    );
    if (flag) {
      Cookies.set("_eaten_", JSON.stringify(eaten), { expires: 2 });
      alert("SUCCESSFULLY STORED 👍👍👍");
    } else {
      alert("OK😭😭😭");
    }
  };
  const load = () => {
    let loadedData = Cookies.get("_eaten_");
    if (loadedData == undefined) {
      alert(
        "NO SAVED 🍪COOKIE🍪 FOUND IN THIS BROWSER ...\nTRY THESE FIXES: \n1.PLEASE USE THE BROWSER YOU USED TO SAVE YOUR MEALS\n2.SAVE MEALS IN 'WHAT YOU ATE TAB' "
      );
      return;
    }
    setEaten(JSON.parse(loadedData));
    alert("Meals Loaded Successfully");
    eatenTab.current.click();
  };
  return (
    <div className="w-screen h-screen">
      <div className="bg-slate-100 p-2 shadow-xl rounded-md mb-3 mx-3">
        <h1 className="m-4 sm:text-3xl text-2xl font-thin text-center">
          WHAT IS IN YOUR FOOD🍟
        </h1>
        <div className=" w-full p-2 flex justify-evenly items-center">
          <div className="border-2 p-2 bg-white shadow-md shadow-black rounded-md">
            <input
              value={query}
              onKeyDown={keydown}
              onChange={queryChanged}
              placeholder="WHAT ARE YOU EATING... "
              className="bg-white p-3 m-0 font-semibold"
              type="text"
            />
            <button
              ref={button}
              onClick={fetchInfo}
              className="mx-2 p-2 font-bold rounded-xl bg-black min-w-20 text-white hover:scale-105 focus:scale-105 shadow-md shadow-black"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-around px-2 pt-2">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "px-2 pt-2 bg-black rounded-t-lg text-white"
              : "m-2 p-2 font-bold rounded-xl bg-black min-w-20 text-white hover:scale-105 focus:scale-105 shadow-md shadow-black"
          }
          to={"/"}
          ref={eatTab}
        >
          EAT MORE FOOD
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "px-2 pt-2 bg-black rounded-t-lg text-white"
              : "m-2 p-2 font-bold rounded-xl bg-black min-w-20 text-white hover:scale-105 focus:scale-105 shadow-md shadow-black"
          }
          to={"/eaten"}
          ref={eatenTab}
        >
          WHAT YOU ATE
        </NavLink>
      </div>

      <div>
        <Routes>
          <Route
            path="/"
            element={
              <div className="mx-3 border-gray-400 rounded-lg border-2">
                <Data
                  data={data}
                  eat={addToEaten}
                  delete={delFromEaten}
                  remove={rmFromData}
                  load={load}
                  reset={resetData}
                />
              </div>
            }
          ></Route>
          <Route
            path="/eaten"
            element={
              <div className="mx-3 border-gray-400 rounded-lg border-2">
                <Eaten
                  key={-1}
                  nutrients={eaten}
                  reset={eatenReset}
                  delete={delFromEaten}
                  save={save}
                />
              </div>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}
export default App;
