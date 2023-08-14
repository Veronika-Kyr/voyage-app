import React, { useState } from 'react';
import WeatherOfTrip from './WeatherOfTrip';
import CityPanel from './CityPanel';
import '../assets/styles/mainPanel.css';
import "../assets/styles/cityCard.css";


export default function CityCard(props) {
    const [chosenCity, setChosenCity] = useState(props.cityData[0].cityName);
    const [chosenDateStart, setChosenDateStart] = useState(props.cityData[0].datestart);
    const [chosenDateEnd, setChosenDateEnd] = useState(props.cityData[0].dateend);
    const [isActive, setIsActive] = useState(null);
    const handleEditProp = props.handleEditProp;
    const handleScrollProp = props.handleScrollProp;
    const handleScrollLeftProp = props.handleScrollLeftProp;

    WeatherOfTrip.defaultProps = {
        chosenCity: 'Berlin',
        chosenDateStart: '2023-08-10',
        chosenDateEnd: '2023-08-17'
    };
    CityPanel.defaultProps = {
        chosenCity: 'Berlin'
    };


    return (
        <div className='cityWeather'>
            {props.error && <p>There is no such a trip!</p>}
            <div className='tripCard'>
                <div className="arrow" >
                    <button className='scrollBtn' disabled={props.scrollLeftdisabled} onClick={handleScrollLeftProp}>⬅</button>
                </div>
                {props.cityData.map((city) => {
                    return (
                        <div key={city.id} className={`wrap ${isActive == city && 'activeWrap'}`} onClick={() => {
                            setChosenDateStart(city.datestart);
                            setChosenDateEnd(city.dateend);

                            setChosenCity(city.cityName);
                            setIsActive(city);
                        }} >
                            <div className='cityphotoCard'>
                                <img src={city.refpic} alt='main view of ${city.name}' />
                            </div>
                            <div>
                                <h3>{city.cityName}</h3>
                                <p>{city.datestart} - {city.dateend}</p>

                            </div>
                        </div>
                    )
                }
                )}
                <button className="openModal" onClick={handleEditProp}>+<br />Add trip</button>
                <div className="arrow" >
                    <button className='scrollBtn' disabled={props.scrolldisabled} onClick={handleScrollProp}>➡</button>
                </div>
            </div>

            <div className='weatherTrip'>
                <WeatherOfTrip chosenCity={chosenCity} chosenDateStart={chosenDateStart} chosenDateEnd={chosenDateEnd} />
            </div>
            <div className='cityCurrentWeather'>
                <CityPanel chosenCity={chosenCity} chosenDateStart={chosenDateStart} />
            </div>
        </div>
    )
}