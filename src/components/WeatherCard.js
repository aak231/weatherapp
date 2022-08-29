import React, { useState, useEffect } from 'react'
import "./style.css"




const WeatherCard = ({ tempInfo }) => {

    const [weatherState, setWeatherState] = useState("")

    const {
        temp, humidity, pressure, weatherDescription, name, speed, country, adjustedSunset, datetime, isCurrentLocation
    } = tempInfo
       const getSunset = (time) => {
        let sec = time
        let date = new Date(sec * 1000)
        let adjustedHours = date.getUTCHours().toString().length === 1 ? "0" + date.getUTCHours().toString() : date.getUTCHours().toString()
        let adjustedMinutes = date.getUTCMinutes().toString().length === 1 ? "0" + date.getUTCMinutes().toString() : date.getUTCMinutes().toString()
        let timeString = `${adjustedHours}:${adjustedMinutes}`
        return timeString
    }

    useEffect(() => {
        if (weatherDescription) {
            console.log(weatherDescription)
            switch (weatherDescription) {
                case "Clouds":
                    setWeatherState("wi-day-cloudy");
                    break;
                case "Haze":
                    setWeatherState("wi-fog");
                    break;
                case "Clear":
                    setWeatherState("wi-day-sunny");
                    break;
                case "Mist":
                    setWeatherState("wi-dust");
                    break;
                default:
                    setWeatherState("wi-day-sunny");
                    break;
            }
        }
    }, [weatherDescription])

    return (
        <>
            {/* Weather card */}
            <article className="widget">
                <div className="weatherIcon">
                    <i className={`wi + ${weatherState}`}></i>
                </div>
                <div className="weatherInfo">
                    <div className="temperature">
                        <span>{temp ? temp.toFixed() : temp}&deg;</span>
                    </div>
                    <div className="description">
                        <div className="weatherCondition">
                            {weatherDescription}
                        </div>
                        <div className="place">
                            {name}
                        </div>
                    </div>
                </div>
                <div className="date">
                    {datetime}
                </div>
                <div className="extra-temp">
                    <div className="temp-info-minmax">
                        <div className="two-sided-section">
                            <p><i className="wi wi-sunset"></i></p>
                            <p className="extra-info-leftside">
                                {getSunset(adjustedSunset)}
                                <br />
                                Sunset
                            </p>
                        </div>
                        <div className="two-sided-section">
                            <p><i className="wi wi-humidity"></i></p>
                            <p className="extra-info-leftside">
                                {humidity + "%"}
                                <br />
                                Humidity
                            </p>
                        </div>
                    </div>
                    <div className="weather-extra-info">
                        <div className="two-sided-section">
                            <p><i className="wi wi-rain"></i></p>
                            <p className="extra-info-leftside">
                                {pressure + " atm"}
                                <br />
                                Pressure
                            </p>
                        </div>
                        <div className="two-sided-section">
                            <p><i className="wi wi-strong-wind"></i></p>
                            <p className="extra-info-leftside">
                                {speed + " m/s"}
                                <br />
                                Speed
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}

export default WeatherCard
