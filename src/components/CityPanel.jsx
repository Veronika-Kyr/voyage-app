import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentWeather } from '../features/currentWeather/currentWeatherSlice';
import Countdown, { zeroPad } from 'react-countdown';
import '../assets/styles/cityPanel.css';
import clearday from '../assets/images/clear-day.png';
import clearnight from '../assets/images/clear-night.png';
import cloudy from '../assets/images/cloudy.png';
import fog from '../assets/images/fog.png';
import hail from '../assets/images/hail.png';
import partlycloudyday from '../assets/images/partly-cloudy-day.png';
import partlycloudynight from '../assets/images/partly-cloudy-night.png';
import wind from '../assets/images/wind.png';
import thunder from '../assets/images/thunder.png';
import thundershowersnight from '../assets/images/thunder-showers-night.png';
import thundershowersday from '../assets/images/thunder-showers-day.png';
import thunderrain from '../assets/images/thunder-rain.png';
import snow from '../assets/images/snow.png';
import snowshowersnight from '../assets/images/snow-showers-night.png';
import snowshowersday from '../assets/images/snow-showers-day.png';
import sleet from '../assets/images/sleet.png';
import showersnight from '../assets/images/showers-night.png';
import showersday from '../assets/images/showers-day.png';
import rain from '../assets/images/rain.png';
import rainsnow from '../assets/images/rain-snow.png';
import rainsnowshowersnight from '../assets/images/rain-snow-showers-night.png';
import rainsnowshowersday from '../assets/images/rain-snow-showers-day.png';


const icons = {

    'clear-day': `${clearday}`
    ,
    'clear-night': `${clearnight}`
    ,
    'cloudy': `${cloudy}`
    ,
    'fog': `${fog}`
    ,
    'hail': `${hail}`
    ,
    'partly-cloudy-day': `${partlycloudyday}`
    ,
    'partly-cloudy-night': `${partlycloudynight}`
    ,
    'wind': `${wind}`
    ,
    'thunder': `${thunder}`
    ,
    'thunder-showers-night': `${thundershowersnight}`
    ,
    'thunder-showers-day': `${thundershowersday}`
    ,
    'thunder-rain': `${thunderrain}`
    ,
    'snow': `${snow}`
    ,
    'snow-showers-night': `${snowshowersnight}`
    ,
    'snow-showers-day': `${snowshowersday}`
    ,
    'sleet': `${sleet}`
    ,
    'showers-night': `${showersnight}`
    ,
    'showers-day': `${showersday}`
    ,
    'rain': `${rain}`
    ,
    'rain-snow': `${rainsnow}`
    ,
    'rain-snow-showers-night': `${rainsnowshowersnight}`
    ,
    'rain-snow-showers-day': `${rainsnowshowersday}`
}


export default function CityPanel(props) {
    const current = useSelector((state) => state.current);
    const dispatch = useDispatch();
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const renderer = ({ days, hours, minutes, seconds }) => {
        return <div> <span> {zeroPad(days)}     {zeroPad(hours)}     {zeroPad(minutes)}    {zeroPad(seconds)}</span>
            <div className='captionSection'>  <p className='caption'>DAYS</p>  <p className='caption'>HOURS</p>  <p className='caption'>MINUTES</p>  <p className='caption'>SECONDS </p></div>
        </div>;
    };

    useEffect(() => {
        dispatch(fetchCurrentWeather(props.chosenCity));
    }, [props.chosenCity])


    return (
        <div className='cityWeather'>
            {current.fetchStatus === 'success' && <div className='wrapper'>
                <div> {days[new Date(current.data.currentConditions.datetimeEpoch * 1000).getDay()]}</div>
                <div className='iconWeather'>
                    <img className='iconCurrent' src={icons[current.data.currentConditions.icon]} alt='current state of sky conditions' />
                    <p className='currentTempreture'>{Math.round(current.data.currentConditions.temp)}℃</p>
                </div>
                <div>{current.data.address}  </div>
            </div>}
            <div className='timer'>
                <Countdown date={new Date(props.chosenDateStart) + 10000} renderer={renderer} />
            </div>
        </div>
    )
}


