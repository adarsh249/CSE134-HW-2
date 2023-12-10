class WeatherWidget extends HTMLElement{

    /**
     * Constructor for WeatherWidget. Calls super(), attachs a open shadow, creates the endpoint string.
     */
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.forecastEndPoint = '';
    }

    /**
     * When we first connect to DOM, fetch the weather data.
     */
    connectedCallback() {
        this.fetchWeatherData();
    }

    /**
     * Function that fetches weather data from api.weather.gov using La Jolla's coordinates.
     * If fetch is successful, call a second fetch for the forecast. This is how weather.gov's api works.
     * Two fetches are necessary.
     */
    fetchWeatherData() {
        const endpoint = 'https://api.weather.gov/points/32.872,-117.235';

        fetch(endpoint)
            .then(response => {
                if(!response.ok){
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.forecastEndPoint = data.properties.forecast;
                this.getForecast(this.forecastEndPoint);
            })
            .catch(error => console.error('Error fetching weather data...', error));
        }

    /**
     * Passes in forecast api from previous fetch and fetches the necessary data, and calls update widget.
     * @param {String} endpoint 
     */
    getForecast(endpoint) {
        fetch(endpoint)
            .then(response => {
                if(!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                let periods = data.properties.periods;
                if(periods) {
                    this.updateWidget(periods[0]);
                }

            })
            .catch(error => console.error('Error fetching forecast...', error));
    
    }

    //If time, add some more data from endpoint and create a nicer lookign widget
    /**
     * Passing in the application/geo+json from the endpoint, we update the widget.
     * We get the temperature, temperature units, the forecast description and whether
     * or not it is daytime. Find the proper svg to use and print out a statement with some CSS.
     * @param {JSON}} currentPeriod 
     */
    updateWidget(currentPeriod) {
        let temperature = currentPeriod.temperature;
        let temperatureUnit = currentPeriod.temperatureUnit;
        let shortForecast = currentPeriod.shortForecast;
        let dayTime = currentPeriod.isDaytime;
        let svgPath;
        if(dayTime) {
            svgPath = '../assets/images/sun.svg';
        }
        else {
            svgPath = '../assets/images/moon.svg';
        }
        fetch(svgPath)
            .then(response => response.text())
            .then(svgContent => {
                this.shadowRoot.innerHTML = `
                    <style>
                        div {
                            display: flex;
                            align-items: center;
                            flex-wrap: nowrap;
                        }
                        p, #icon {
                            padding: 0 0.5rem 0.5rem 0rem;
                            color: var(--text-color, white);
                        }
                    </style>
                    <div>${svgContent} <p>${shortForecast} ${temperature.toString()}&deg;${temperatureUnit}</p></div>
                `;
            })
            .catch(error => console.error('Error fetching SVG', error));
    }

}

customElements.define('weather-widget', WeatherWidget);