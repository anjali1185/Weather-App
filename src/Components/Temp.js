import React, { useState,useEffect } from 'react'
import "./style.css"
import Weathercard from './Weathercard';
export default function Temp() {
   
    const [tempInfo,setTempInfo] = useState({});
    const[searchValue,setSearchValue] = useState("pune")
    const getWeatherInfo = async() =>{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=ee03bd938a92e04f0142341f2da4fc8c`

            const res = await fetch(url);
            const data = await res.json();
            const {temp,humidity,pressure} = data.main;
            const {main: weathermood} = data.weather[0];
            const {speed} = data.wind;
            const {name} = data; 
            const {country,sunset} = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
            }
            setTempInfo( myNewWeatherInfo);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getWeatherInfo();
     },[]);
    
  return (
    <div>
      <div className='wrap'>
        <div className='search'>
            <input
            type='search'
            placeholder='search'
            autoFocus
            id='search'
            className='searchTerm'
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
            />
            <button className='searchButton' onClick={getWeatherInfo}
            type='button'>
                search
            </button>
        </div>
      </div>
     <Weathercard  tempInfo = {tempInfo}/>
    </div>
  )
}
