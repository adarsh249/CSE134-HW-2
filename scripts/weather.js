class WeatherWidget extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.forecastEndPoint = '';
    }

    connectedCallback() {
        this.fetchWeatherData();
    }

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
                            padding: 0 0.5rem 0.5rem 0rem
                        }
                    </style>
                    <div>${svgContent} <p>${shortForecast} ${temperature.toString()}&deg;${temperatureUnit}</p></div>
                `;
            })
            .catch(error => console.error('Error fetching SVG', error));
    }

}

customElements.define('weather-widget', WeatherWidget);