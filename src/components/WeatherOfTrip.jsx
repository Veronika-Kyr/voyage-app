import React, { useEffect } from 'react';
import { fetchForecast } from '../features/tripForecast/tripForecastSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/styles/weatherOfTrip.css';
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


export default function WeatherOfTrip(props) {
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const forecast = useSelector((state) => state.forecast);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchForecast({ cityName: props.chosenCity, dateStart: props.chosenDateStart, dateEnd: props.chosenDateEnd }))
    }, [props.chosenCity])


    return (
        <div className='sectionCards'>
            <h2 className='headForecast'>Be informed about the weather! 🌞</h2>
            {forecast.fetchStatus === 'success' && <div className='forecastCard'>
                {forecast.data.days.map((forecastItem, index) => {
                    //  if (index <= 6 && index >= 0) {
                    return (
                        <div key={index} className='wrapForecast'>
                            <div className='weekDays'> {days[new Date(forecastItem.datetimeEpoch * 1000).getDay()]}</div>
                            <div>
                                <img className='icons' src={icons[forecastItem.icon]} alt='forecast of sky conditions' />                                 </div>
                            <div>
                                <p>
                                    {Math.round(forecastItem.tempmax)}º / {Math.round(forecastItem.tempmin)}º
                                </p>
                            </div>
                        </div>
                    )
                })
                }
            </div>}
        </div>
    )
}