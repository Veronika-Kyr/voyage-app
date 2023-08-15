import React, { useState } from 'react';
import '../assets/styles/mainPanel.css';
import CitiesList from './CitiesList';
import WeatherOfTrip from './WeatherOfTrip';

export default function MainPanel() {
    const [cityTrip, setCityTrip] = useState('');
    const [searchingCity, setSearchingCity] = useState('');
    function getCity(event) {
        event.preventDefault();
        setCityTrip(searchingCity);
    }

    return (
        <div className='main'>
            <h1>
                Weather <b>Forecast</b></h1>
            <div className="sectionSearch">
                <form
                    onSubmit={getCity} >
                    <input
                        className="citySearch"
                        type="search"
                        placeholder="🔎 Search your trip" onChange={(event) => setSearchingCity(event.target.value)} />
                </form>
            </div>
            <CitiesList searchingCity={cityTrip} />


        </div>
    )
}