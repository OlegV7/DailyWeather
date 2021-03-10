// Variables
const weatherData   = data(),
      daysList      = document.querySelector('.days-list'),
      singleDay     = document.querySelector('.single-day');

let chosenDay   = "",
    arrow       = "",
    dayName     = "",
    isKelvin    = false,
    isKilometar = false;

// Event Listeners
document.addEventListener('DOMContentLoaded', createList);

// Functions
function createList() {
    let output = "";
    weatherData.days.map(day => {
        output += `
            <li class="day"><span class="day-name">${day.day}</span><span class="day-degree">${day.temp}&#8451;</span></li>
        `;
    });

    daysList.innerHTML = output;

    const daysArr = Array.from(document.querySelectorAll('.day'));

    daysArr.map(day => day.addEventListener('click', () => dayData(day)));
}

function dayData(day) {
    chosenDay = day.firstChild.textContent.toLowerCase();  
    let output = "";

    weatherData.days.map(day => {
        if(day.day.toLowerCase() === chosenDay) {

            arrowDirection(day.windDirection);

            dayFullName(day.day.toLowerCase());

            output = `
            <h2 class="single-day__name">${dayName}</h2>

            <div class="weather-info">
                <h3 class="weather-info__degree">${day.temp}&#8451;</h3>

                <ul class="details-list">
                    <li class="details-item">Wind Direction: <span class="direction">${day.windDirection} <span class="direction-arrow">${arrow}</span></span></li>
                    <li class="details-item">Wind Speed: <span class="speed-type">${day.windSpeed} m/s</span></li>
                    <li class="details-item">Today's gonna be <span class="day-type">${day.type}</span></li>
                </ul>
            </div>
            `;
        }
    });

    singleDay.innerHTML = output;
}

function dayFullName(day) {
    switch(day) {
        case 'mon':
            dayName = "Monday";
            break;
        case 'tue':
            dayName = "Tuesday";
            break;
        case 'wed':
            dayName = "Wednesday";
            break;
        case 'thu':
            dayName = "Thursday";
            break;
        case 'fri':
            dayName = "Friday";
            break;
        case 'sat':
            dayName = "Saturday";
            break;
        case 'sun':
            dayName = "Sunday";
            break;
        default:
            dayName = "";
    }
}

function arrowDirection(direction) {
    switch(direction) {
        case 'north-east':
            arrow = '&nearr;';
            break;
        case 'south-east':
            arrow = '&searr;';
            break;
        case 'south-west':
            arrow = '&swarr;';
            break;
        case 'north-west':
            arrow = '&nwarr;';
            break;
        case 'north': 
            arrow = "&uarr;";
            break;
        case 'south': 
            arrow = "&darr;";
            break;
        case 'east': 
            arrow = "&rarr;";
            break;
        case 'west': 
            arrow = "&larr;";
            break;
        default: 
            arrow = "";
    }
}