// Variables
const weatherData   = data(),
      daysList      = document.querySelector('.days-list'),
      singleDay     = document.querySelector('.single-day'),
      tempBtn       = document.querySelector('.change-temp'),
      speedBtn      = document.querySelector('.change-speed');

let chosenDay       = "",
    arrow           = "",
    dayName         = "",
    dayTemp         = null,
    isKelvin        = false,
    isKilometar     = false,
    openedWidget    = false,
    tempSign        = "&#8451;";

// Event Listeners
document.addEventListener('DOMContentLoaded', createList);
tempBtn.addEventListener('click', changeTemp);
speedBtn.addEventListener('click', changeSpeed);

// Functions
function createList() {
    let output = "";
    // Create and add li's to ul
    weatherData.days.map(day => {
        output += `
            <li class="day"><span class="day-name">${day.day}</span><span class="day-degree"><span class="temp-value">${day.temp}</span> <span class="temp-sign">${tempSign}</span></span></li>
        `;
    });

    daysList.innerHTML = output;

    // Select all created li's
    const daysArr = Array.from(document.querySelectorAll('.day'));

    // Add event listeners to all li's
    daysArr.map(day => day.addEventListener('click', () => {
        dayData(day);

        // Check for chosen metrics and change
        if(isKilometar) {
            let speed = parseInt(document.querySelector('.speed-type').textContent);
            document.querySelector('.speed-type').textContent = Math.round(speed * 3.6);
        }
    }));
}

function dayData(day) {
    openedWidget = true;
    chosenDay = day.firstChild.textContent.toLowerCase();  
    let output = "";

    weatherData.days.map(day => {
        if(day.day.toLowerCase() === chosenDay) {
            // Get arrow direction
            arrowDirection(day.windDirection);

            // Get the days full name
            dayFullName(day.day.toLowerCase());

            // Check for chosen temperature metrics
            let tempetarture = isKelvin ? day.temp + 273 : day.temp;

            output = `
            <h2 class="single-day__name">${dayName}</h2>

            <div class="weather-info">
                <h3 class="weather-info__degree"><span class="temp-value">${tempetarture}</span> <span class="temp-sign">${tempSign}</span></h3>

                <ul class="details-list">
                    <li class="details-item">Wind Direction: <span class="direction">${day.windDirection} <span class="direction-arrow">${arrow}</span></span></li>
                    <li class="details-item">Wind Speed: <span class="speed-type">${day.windSpeed}</span> <span class="speed-sign">${isKilometar ? "km/h" : "m/s"}</span>.</li>
                    <li class="details-item">Today's gonna be <span class="day-type">${day.type}.</span></li>
                </ul>
            </div>
            `;
        }
    });

    singleDay.innerHTML = output;
}

function changeTemp() {
    isKelvin = !isKelvin;
    // Change sign
    isKelvin ? tempBtn.textContent = 'to Celsius' : tempBtn.textContent = 'to Kelvin';
    tempSign = isKelvin ? "&#x212A;" : "&#8451;";
    let signArr = Array.from(document.querySelectorAll('.temp-sign'));
    signArr.map(sign => sign.innerHTML = tempSign);

    // Change temp value
    let valueArr = Array.from(document.querySelectorAll('.temp-value'));

    valueArr.map(value => {
        // Get inital degree value
        let shownValue  = parseInt(value.textContent);

        if(isKelvin) {
            // Change to kelvin
            dayTemp = shownValue + 273;
        } else {
            // Change to celsius
            dayTemp = shownValue - 273;
        }

        // Change value in UI
        value.textContent = dayTemp;
    });
}

function changeSpeed() {
    // Change Sign
    isKilometar = !isKilometar;
    // Change the content of the button
    isKilometar ? speedBtn.textContent = "to m/s" : speedBtn.textContent = "to km/h";
    // Change content only if widget is open
    if(openedWidget) {
        let sign    = document.querySelector('.speed-sign'),
            speed   =  parseInt(document.querySelector('.speed-type').textContent);

        isKilometar ? sign.textContent = 'km/h' : sign.textContent = 'm/s';
        isKilometar ? document.querySelector('.speed-type').textContent = Math.round(speed * 3.6) : document.querySelector('.speed-type').textContent = Math.round(speed / 3.6);
    }
}

// Get the arrow directions
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

// Get the days full name
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