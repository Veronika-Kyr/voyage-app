import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchCurrentWeather = createAsyncThunk(
    "cuurent/fetch",
    async (cityName) => {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?iconSet=icons2&unitGroup=metric&key=BP2BS5TKEFZ3A6GZ678P97SGZ&contentType=json`);
        return response.json();
    }
);

const currentWeatherSlice = createSlice({
    name: 'current',
    initialState: { data: [], fetchStatus: '' },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentWeather.fulfilled, (state, action) => {
            state.data = action.payload
            state.fetchStatus = 'success'
        })
            .addCase(fetchCurrentWeather.pending, (state) => {
                state.fetchStatus = 'loading'
            })
            .addCase(fetchCurrentWeather.rejected, (state) => {
                state.fetchStatus = 'error'
            })
    },
})


export default currentWeatherSlice;

