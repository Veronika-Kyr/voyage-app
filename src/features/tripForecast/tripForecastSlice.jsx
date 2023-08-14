import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchForecast = createAsyncThunk(
    "forecast/fetch",
    async ({ cityName: cityName, dateStart: dateStart, dateEnd: dateEnd }) => {
        // let dateS = Date.parse(dateStart);
        //  let stampDateS = Math.floor(dateS.getTime());
        //  let dateE = Date.parse(dateEnd);
        //let stampDateE = Math.floor(dateE.getTime());
        console.log(dateStart);

        //  console.log(dateS);
        //  console.log(dateE);

        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/${dateStart}/${dateEnd}?iconSet=icons2&unitGroup=metric&key=BP2BS5TKEFZ3A6GZ678P97SGZ&contentType=json`);
        return response.json();
    }
);

const tripForecastSlice = createSlice({
    name: 'forecast',
    initialState: { data: [], fetchStatus: '' },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchForecast.fulfilled, (state, action) => {
            state.data = action.payload
            state.fetchStatus = 'success'
        })
            .addCase(fetchForecast.pending, (state) => {
                state.fetchStatus = 'loading'
            })
            .addCase(fetchForecast.rejected, (state) => {
                state.fetchStatus = 'error'
            })
    },
})


export default tripForecastSlice;