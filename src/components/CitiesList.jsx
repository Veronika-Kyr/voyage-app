import React, { createRef, useState, useMemo } from "react";
import '../assets/styles/citiesList.css';
import CityCard from './CityCard';
import card1 from "../assets/images/berlin.jpg";
import card2 from "../assets/images/tokyo.jpeg";
import card3 from "../assets/images/Barcelona.jpg";
import card4 from "../assets/images/kyiv.jpg";
import card5 from "../assets/images/london.jpg";
import card6 from "../assets/images/paris.jpeg";
import card7 from "../assets/images/wien.jpg";


const cities = [
    {
        'cityName': 'Berlin',
        'refpic': `${card1}`,
        'id': 1
    },
    {
        'cityName': 'Tokyo',
        'refpic': `${card2}`,
        'id': 2
    },
    {
        'cityName': 'Barcelona',
        'refpic': `${card3}`,
        'id': 3
    },
    {
        'cityName': 'Kyiv',
        'refpic': `${card4}`,
        'id': 4
    },
    {
        'cityName': 'London',
        'refpic': `${card5}`,
        'id': 5
    },
    {
        'cityName': 'Paris',
        'refpic': `${card6}`,
        'id': 6
    },
    {
        'cityName': 'Wien',
        'refpic': `${card7}`,
        'id': 7
    }
];
const cit = [
    {
        'cityName': 'Berlin',
        'datestart': '2023-08-18',
        'dateend': '2023-08-23',
        'refpic': `${card1}`,
        'id': 1
    },
    {
        'cityName': 'Tokyo',
        'datestart': '2023-08-19',
        'dateend': '2023-08-26',
        'refpic': `${card2}`,
        'id': 2
    },
    {
        'cityName': 'Barcelona',
        'datestart': '2023-08-22',
        'dateend': '2023-08-28',
        'refpic': `${card3}`,
        'id': 3
    },
    {
        'cityName': 'Kyiv',
        'datestart': '2023-08-18',
        'dateend': '2023-08-25',
        'refpic': `${card4}`,
        'id': 4
    },
];


export default function CitiesList(props) {
    let n = 0;
    const [modalVisibility, setmodalVisibility] = useState(false);
    const [scrollPosition, setscrollPosition] = useState(n);
    const [clickSubmit, setclickSubmit] = useState(false);
    const [scrolldisabled, setScrolldisabled] = useState(false);
    const [scrollLeftdisabled, setScrollLeftdisabled] = useState(false);
    //  const [newAdded, setnewAdded] = useState(false);
    const form = createRef();
    const [errorStart, setErrorStart] = useState(false);
    const [errorEnd, setErrorEnd] = useState(false);
    const period = new Date();
    {/*  const cit = [
        {
            'cityName': 'Berlin',
            'datestart': '2023-08-18',
            'dateend': '2023-08-23',
            'refpic': `${card1}`,
            'id': 1
        },
        {
            'cityName': 'Tokyo',
            'datestart': '2023-08-19',
            'dateend': '2023-08-26',
            'refpic': `${card2}`,
            'id': 2
        },
        {
            'cityName': 'Barcelona',
            'datestart': '2023-08-22',
            'dateend': '2023-08-28',
            'refpic': `${card3}`,
            'id': 3
        },
        {
            'cityName': 'Kyiv',
            'datestart': '2023-08-18',
            'dateend': '2023-08-25',
            'refpic': `${card4}`,
            'id': 4
        },
    ];*/}
    let [cityData, setCityData] = useState(cit);
    console.log(cityData);

    const [formState, setFormState] = useState({
        'cityName': '',
        'datestart': '',
        'dateend': '',
        'refpic': '',
        'id': 0
    });

    function handleEdit(event) {
        setmodalVisibility(true);
    }

    function handleScroll(event) {
        if ((scrollPosition + 1) < cityData.length) {
            setscrollPosition(scrollPosition + 1);
            setScrollLeftdisabled(false);

        }
        else {
            setScrolldisabled(true);
        }
    }
    function handleScrollLeft(event) {
        if ((scrollPosition) > 0) {
            setscrollPosition(scrollPosition - 1);
            setScrolldisabled(false);
        }
        else {
            setScrollLeftdisabled(true);
        }
    }

    function changeState(value, field) {
        const clone = { ...formState };
        clone[field] = value;
        setFormState(clone);
    }

    function handleCity(event) {
        changeState(event.target.value, 'cityName');
    }

    function handleStartDate(event) {
        let enterDate = new Date(event.target.value);
        const diff = Math.abs(enterDate - period);
        const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

        if (diffDays >= 15) {
            setErrorStart(true);
        }
        else {
            setErrorStart(false);
            changeState(event.target.value, 'datestart');
        }
    }

    function handleEndDate(event) {
        let enterDate = new Date(event.target.value);
        const diff = Math.abs(enterDate - period);
        const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
        if (diffDays >= 15) {
            setErrorEnd(true);
        }
        else {
            setErrorEnd(false);
            changeState(event.target.value, 'dateend');
        }
    }

    function submitData(event) {
        if (!errorStart && !errorEnd) {
            event.preventDefault();
            setclickSubmit(true);

            // localStorage.setItem('cityName', formState.cityName);
            //  localStorage.setItem('refpic', formState.refpic);
            //  localStorage.setItem('id', formState.id);
            // localStorage.setItem('dateend', formState.dateend);
            // localStorage.setItem('datestart', formState.datestart);


            let m = cities.filter(el => el.cityName === formState.cityName);
            formState.refpic = m[0].refpic;
            formState.id = m[0].id;
            setCityData([...cityData, formState]);
            console.log(cityData);
            closeModal();
        }
    }
    function closeModal() {
        setclickSubmit(false);
        setmodalVisibility(false);
    }

    function resetData(e) {
        setclickSubmit(false);
        setErrorStart(false);
        setErrorEnd(false);
        setFormState({
            'cityName': '',
            'datestart': '',
            'dateend': '',
            'refpic': '',
            'id': 0
        });

        form.current.reset();
    }


    return (
        <>
            <div className='citiesList'>
                {!props.searchingCity ? <CityCard cityData={(cityData.sort((d1, d2) => new Date(d1.datestart) - new Date(d2.datestart))).slice(scrollPosition, scrollPosition + 3)} handleEditProp={handleEdit} handleScrollProp={handleScroll} handleScrollLeftProp={handleScrollLeft} scrolldisabled={scrolldisabled} scrollLeftdisabled={scrollLeftdisabled} /> : <div>
                    {cityData.some((cityItem) => cityItem.cityName === props.searchingCity) ? <CityCard cityData={cityData.filter(el => el.cityName === props.searchingCity)} handleEditProp={handleEdit} /> : <CityCard cityData={(cityData.sort((d1, d2) => new Date(d1.datestart) - new Date(d2.datestart))).slice(scrollPosition, 3)} handleEditProp={handleEdit} handleScrollProp={handleScroll} handleScrollLeftProp={handleScrollLeft} error='Error' scrollLeftdisabled={scrollLeftdisabled} scrolldisabled={scrolldisabled} />}</div>}

            </div>
            <div>
                {modalVisibility && <div className='addTrip'>
                    <div className="modalHeader">
                        <h3 className="modalHead"> Create trip</h3>
                        <button className="closeButton" onClick={() => { setmodalVisibility(false) }}>✖</button>
                        <hr />
                    </div>
                    <form onSubmit={submitData} ref={form}>

                        <div className="form-items"> <label htmlFor="cityName"><span className="star">*</span>  City </label>
                            <input id="cityName" list="cities" name='cities' onChange={handleCity} placeholder='Please select a city' />
                            <datalist id="cities">
                                <option> {cities[0].cityName} </option>
                                <option> {cities[1].cityName} </option>
                                <option>{cities[2].cityName} </option>
                                <option> {cities[3].cityName} </option>
                                <option> {cities[4].cityName} </option>
                                <option> {cities[5].cityName} </option>
                                <option> {cities[6].cityName} </option>

                            </datalist>
                        </div>
                        <div className="form-items"> <label htmlFor="startDate"> <span className="star">*</span>
                            {errorStart ? <span className="errorStart"> Start date should be within 15 further days</span> : <span> Start date</span>}
                        </label>
                            <input id="startDate" type="date" onChange={handleStartDate} placeholder='Select date' />
                        </div>
                        <div className="form-items">  <label htmlFor="endDate"> <span className="star">*</span>
                            {errorEnd ? <span className="errorEnd"> End date should be within 15 further days</span> : <span> End date</span>}

                        </label>
                            <input id="endDate" type="date" onChange={handleEndDate} placeholder='Select date' />
                        </div>
                        <div className="modalFooter">
                            <hr />
                            <button className="btnReset" type="reset" onClick={resetData}>Cancel</button>
                            <button className="btnSubmit" type="submit" >Save</button>
                        </div>

                    </form >
                </div>
                }
            </div>
        </>
    )
}