// js file to obtain all necessary data from weather
import React from "react";

const API_KEY = 'cbf05118315d2e7511acaabd788a6f6e';

export async function getLocationTemp(location) {
    const getWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`, {mode: 'cors'})
    const weatherData = await getWeather.json();

    return weatherData.main.temp;
    

}

/*
export default class FetchLocationTemp extends React.Component {

    state = {
        loading = true;
    }

    componentDidMount() {

    }

    render() {
        return <div>
            {this.state.loading ? <div>loading...</div> : <div>person...</div>}
        </div>
    }

}
*/