import React, { Component } from 'react';
import PropTypes from 'prop-types';

function Header(){
    const city =[
        {
            id: 1,
            name: 'Karachi',
        },
        {
            id: 2,
            name: 'Lahore',
        },
        {
            id: 3,
            name: 'Islamabad',
        },
        {
            id: 4,
            name: 'Peshawar',
        }
    ]
        return (
            <div className='flex items-center justify-around my-6'> 
                {city.map((obj)=>{
                     <button
                     key={obj.id}
                     className="text-white text-lg font-medium"
                     onClick={() => setQuery({ q: obj.title })}
                   >
                     {obj.title}
                   </button>
                })}
            </div>
        );
    };

export default Header;