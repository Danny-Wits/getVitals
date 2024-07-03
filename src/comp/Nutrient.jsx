import React from 'react';

function Nutrient(props) {
   let remaining = props.dsa-props.value
   let currentP = (props.value*100)/props.dsa
   let color='bg-green-500'
   if (currentP<=1)color='bg-red-500'
   else if (currentP<=5)color='bg-orange-500'
   else if (currentP<=15)color='bg-yellow-500'
   else if (currentP>=100)color='bg-lime-400'
    return (
        <span className='my-3 mx-1'>
       <span className="p-2 rounded-s-lg border-2 border-black bg-black">{props.nutrient}</span>
        
        <span className="p-2  font-bold border-2 border-black text-indigo-950">
          {props.value}{props.unit}
        </span>  
        <span className={`p-2 text-white ${color} rounded-e-lg font-bold border-r-2 border-y-2 border-black text-indigo-950`}>
        ✅{currentP.toFixed(0)}%  ➕{remaining.toFixed(0)}
        </span>  
         
    </span>
        
    );
}

export default Nutrient;