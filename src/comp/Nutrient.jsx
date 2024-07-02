import React from 'react';
import PropTypes from 'prop-types';


function Nutrient(props) {
    const unit = (!props.hasOwnProperty('unit'))?"":props['unit'];
    return (
        <span className='m-3'>
       <span className="p-2 rounded-s-lg border-2 border-black bg-black">{props.nutrient}</span>
        <span className="p-2 rounded-e-lg font-bold border-2 border-black text-indigo-950">
          {props.value}{unit}
        </span>  
    </span>
        
    );
}

export default Nutrient;