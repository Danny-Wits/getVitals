import { useRef, useState } from 'react'
import Data from './comp/Data';

function App() {
  const [query, setQuery]=useState("");
  const queryChanged = (event)=>{
    setQuery(event.target.value)
  }
  const [data,setData]=useState([]);
  const button=useRef(null);
  const fetchInfo=()=>{
    searchStarted()
    let url = 'https://api.calorieninjas.com/v1/nutrition?query=' + query;
    fetch(url,{method:"GET",headers:{'X-Api-Key':process.env.PK}})
    .then(response=>{searchEnded();return response.json();})
    .then(data=>setData(data))
    .catch(error=>console.log(error));
 
  }
  const searchStarted=()=>{
   button.current.disabled=true;
    button.current.innerHTML="SEARCHING🔍🔍🔍"
  }
  const searchEnded=()=>{
    setQuery("")
    button.current.innerHTML="SEARCH🔍"
   button.current.disabled=false;
  }
  return (
    <div className='w-screen h-screen'>
      <h1 className='m-5 text-center text-2xl text-yellow-300'>WHAT'S IN YOUR FOOD </h1>
      <div className='w-full p-2 flex justify-evenly items-center'>
       <input value={query} onChange={queryChanged} placeholder="WHAT ARE YOU EATING... " className='w-1/2 p-1 placeholder:text-sm rounded-md border-red-300 bg-yellow-400 border-2' type="text" />
       <button ref={button} onClick={fetchInfo} className=" ps-2 pe-2 p-1 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg dark:focus:ring-yellow-900 disabled:bg-indigo-800">SEARCH🔍</button> 
        </div>
        <div>
          <Data data={data}/>
        </div>
    </div>
   
  )
}

export default App
