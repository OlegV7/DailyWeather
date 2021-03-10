const data = () => {
    const weatherData = {
        tempUnit: 'C',
        windSpeedUnit: 'm/s',
        days: [
            {day: 'Mon', temp: 10, windDirection: 'north-east', windSpeed: 10, type: 'sunny'},
            {day: 'Tue', temp: 12, windDirection: 'north-west', windSpeed: 14, type: 'rainy'},
            {day: 'Wed', temp: 6, windDirection: 'south-east', windSpeed: 20, type: 'cloudy'},
            {day: 'Thu', temp: 9, windDirection: 'north-west', windSpeed: 11, type: 'cloudy'},
            {day: 'Fri', temp: 14, windDirection: 'north-east', windSpeed: 14, type: 'rainy'},
            {day: 'Sat', temp: 16, windDirection: 'north-east', windSpeed: 20, type: 'sunny'},
            {day: 'Sun', temp: 17, windDirection: 'north-east', windSpeed: 12, type: 'sunny'}
        ]
    }

    return weatherData;
}