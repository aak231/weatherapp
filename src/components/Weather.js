import React, { useState, useEffect } from 'react'
import WeatherCard from "./WeatherCard"
import './style.css'
import '../.env'


// https://api.openweathermap.org/data/2.5/weather?q=Islamabad&units=metric&appid=6d3aaa8a5abd1b2dbf5a87e420b6b6e5
const Weather = () => {

    const [searchValue, setSearchValue] = useState("Islamabad")
    const [tempInfo, setTempInfo] = useState({})
    const [userLocation, setUserLocation] = useState({})


    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position)
                setUserLocation(position)
            })
        }
        else {
            console.error("geolocation is not supported")
        }
    }
    const getUserLocationsWeatherInfo = async () => {
        getUserLocation()
        try {
            if (userLocation) {

                let urlWeatherLatLong = `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.coords.latitude.toFixed(4)}&lon=${userLocation.coords.longitude.toFixed(4)}&units=metric&appid=6d3aaa8a5abd1b2dbf5a87e420b6b6e5`
                // let urlWeatherLatLong = `https://api.openweathermap.org/data/2.5/weather?lat=${40.635665}&lon=${-74.023920}&units=metric&appid=6d3aaa8a5abd1b2dbf5a87e420b6b6e5`

                let urlTime = `https://timezone.abstractapi.com/v1/current_time/?api_key=ab0716307a2b4cb49a23a2deaeb9686f&location=${userLocation.coords.latitude + "," + userLocation.coords.longitude}`

                // let urlTime = `https://timezone.abstractapi.com/v1/current_time/?api_key=ab0716307a2b4cb49a23a2deaeb9686f&location=${40.635665 + "," + -74.023920}`
                let urlReverseGeocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation.coords.latitude + "," + userLocation.coords.longitude}&key=AIzaSyADaj-xDzXHwwIcDzD5bvOCdCyOwQHEVNY`

                
                const responseWeatherCoord = await fetch(urlWeatherLatLong)
                const dataWeatherCoord = await responseWeatherCoord.json()
                console.log(dataWeatherCoord)
                
                const responseTime = await fetch(urlTime)
                const dataTime = await responseTime.json()
                console.log(dataTime)

                const responseReverseGeocode = await fetch(urlReverseGeocode)
                const dataReverseGeocode = await responseReverseGeocode.json()
                console.log(dataReverseGeocode)


                const { temp, humidity, pressure } = dataWeatherCoord.main
                const { main: weatherDescription } = dataWeatherCoord.weather[0]
                // const { name } = dataWeatherCoord
                const { formatted_address: name } = dataReverseGeocode.results[5]
                const { speed } = dataWeatherCoord.wind
                const { country, sunset } = dataWeatherCoord.sys
                const { timezone } = dataWeatherCoord
                const adjustedSunset = sunset + timezone

                console.log(sunset, timezone, adjustedSunset)
                const { datetime } = dataTime
                const isCurrentLocation = true
                const myWeatherObject = {
                    temp, humidity, pressure, weatherDescription, name, speed, country, adjustedSunset, datetime, isCurrentLocation
                }
                console.log(myWeatherObject)
                setSearchValue(name)
// Set extracted usable data to a weather Object    
                setTempInfo(myWeatherObject)
            }
            else {
                const myWeatherObject = {}
                console.log(myWeatherObject)
                setSearchValue("")
                setTempInfo(myWeatherObject)
            }     
        } catch (error) {
            console.log(error)

        }

    }
    const getCoordinates = async () => {
        try {
            let urlGeocode = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchValue}&key=AIzaSyADaj-xDzXHwwIcDzD5bvOCdCyOwQHEVNY`

            const responseGeocode = await fetch(urlGeocode)
            const dataGeocode = await responseGeocode.json()
            console.log(dataGeocode)

            const{lat,lng}  = dataGeocode.results[0].geometry.location
            const {formatted_address : location} = dataGeocode.results[0]
            // console.log(lat,lng)
            const coordinates = {
                locationName: location,
                latitude: lat,
                longitude: lng
            }
            return coordinates
        } catch (error) {
            console.log(error)
        }
    }
    const getWeatherInfo = async () => {
        try {
            const coordinates = getCoordinates()
            console.log((await coordinates).latitude, (await coordinates).longitude)
            console.log(searchValue)

            let urlWeatherCityName = `https://api.openweathermap.org/data/2.5/weather?lat=${(await coordinates).latitude}&lon=${(await coordinates).longitude}&units=metric&appid=6d3aaa8a5abd1b2dbf5a87e420b6b6e5`

            let urlTime = `https://timezone.abstractapi.com/v1/current_time/?api_key=ab0716307a2b4cb49a23a2deaeb9686f&location=${searchValue}`


            const responseTime = await fetch(urlTime)
            const dataTime = await responseTime.json()
            console.log(dataTime)

            const responseWeatherLoc = await fetch(urlWeatherCityName)
            const dataWeatherLoc = await responseWeatherLoc.json()
            console.log(dataWeatherLoc)
            
            if(dataWeatherLoc.cod === "404" || JSON.stringify(dataTime) === "{}")
            {
                alert("Cannot find a place based on entered value. Please try again.")
            }

            const { temp, humidity, pressure } = dataWeatherLoc.main
            const { main: weatherDescription } = dataWeatherLoc.weather[0]
            const name = (await coordinates).locationName
            const { speed } = dataWeatherLoc.wind
            const { country, sunset } = dataWeatherLoc.sys
            const { timezone } = dataWeatherLoc
            const adjustedSunset = sunset + timezone 

            console.log(sunset, timezone, adjustedSunset)
            const { datetime } = dataTime
            const isCurrentLocation = false

            const myWeatherObject = {
                temp, humidity, pressure, weatherDescription, name, speed, country, adjustedSunset, datetime, isCurrentLocation
            }
            console.log(myWeatherObject)
            // Set extracted usable data to a weather Object             
            setTempInfo(myWeatherObject)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { getWeatherInfo() }, [])
    // useEffect(() => {getLocation()}, [])
    return (
        <>
            {/* Search bar */}
            <div className="wrap">
                <div className="search">
                    <input type="search"
                        placeholder="search.."
                        autoFocus
                        id="search"
                        className="searchTerm"
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                    />
                    <button className="searchButton" type="button" onClick={getWeatherInfo}>
                        Search
                    </button>
                    <button className="findMeButton" type="button" onClick={getUserLocationsWeatherInfo}>
                        Use my Location
                    </button>
                </div>
            </div>
            <WeatherCard tempInfo={tempInfo} />
        </>
    )
}

export default Weather
