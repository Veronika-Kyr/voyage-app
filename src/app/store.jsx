import { configureStore } from '@reduxjs/toolkit';
import currentWeatherSlice from '../features/currentWeather/currentWeatherSlice';
import tripForecastSlice from '../features/tripForecast/tripForecastSlice';


const store = configureStore({
    reducer: {
        current: currentWeatherSlice.reducer,
        forecast: tripForecastSlice.reducer,
    }
});
export default store;
