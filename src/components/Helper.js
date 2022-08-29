import React from 'react'

const getCoordinates = () => {
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=dubai&key=AIzaSyADaj-xDzXHwwIcDzD5bvOCdCyOwQHEVNY"
    fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
} 

const Helper = () => {
    {
        const url = "https://maps.googleapis.com/maps/api/geocode/json?address=dubai&key=AIzaSyADaj-xDzXHwwIcDzD5bvOCdCyOwQHEVNY"
        fetch(url)
        .then((response) => response.json())
        .then((data) => console.log(JSON.parse(data))); 

    }
    return (
        <div>
        <h2>hi</h2>
        </div>
    )
}

export default Helper
