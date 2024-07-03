import { useEffect, useRef, useState } from 'react'
import Data from './comp/Data';

function App() {
  const [query, setQuery]=useState("");
  const queryChanged = (event)=>{
    setQuery(event.target.value)
  }
  const [data,setData]=useState([]);
  const button=useRef(null);
  const fetchInfo=()=>{
    if (query.trim()=="")return
    searchStarted()
    let url = 'https://api.calorieninjas.com/v1/nutrition?query=' + query;
    fetch(url,{method:"GET",headers:{'X-Api-Key':import.meta.env.VITE_YEK}})
    .then(response=>{searchEnded();return response.json();})
    .then(data=>setData(data))
    .catch(error=>console.log(error));
 
  }
  const searchStarted=()=>{
    button.current.disabled=true;
    button.current.innerHTML="SEARCHING🔍"
  }
  const searchEnded=()=>{
    setQuery("")
    button.current.innerHTML="SEARCH🔍"
    button.current.disabled=false;
  }
  useEffect(()=>
    document.addEventListener('keydown',(event)=>{
      if(event.key=='Enter')button.current.click();
    })
  ,[]);
  return (
    <div className='w-screen h-screen'>
      <h1 className='m-5 text-center text-3xl'>WHAT'S IN YOUR FOOD </h1>
      <div className='w-full p-2 flex justify-evenly items-center'>
       <input value={query} onChange={queryChanged} placeholder="WHAT ARE YOU EATING... " className='w-2/3 p-1 bg-red-100 text-slate-600 placeholder:text-sm rounded-md border-red-500 border-2' type="text" />
       <button ref={button} onClick={fetchInfo} className=" ps-2 pe-2 p-1 text-slate-600 bg-red-100 hover:bg-red-300 focus:ring-4 focus:ring-bg-amber-300 font-medium rounded-lg border-2 border-red-500 disabled:bg-red-500">SEARCH🔍</button> 
        </div>
        <div>
          <Data data={data}/>
        </div>
    </div>
   
  )
}

export default App
