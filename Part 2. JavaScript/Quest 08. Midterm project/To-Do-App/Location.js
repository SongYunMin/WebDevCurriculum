class Location {
    #locationDom
    #weatherDom
    #LOCATION_LS
    #API_KEY
    #weather
    #location

    constructor() {
        console.log("constructor");
        this.#LOCATION_LS = 'location';
        this.#API_KEY = "b402e279bafc9f91cb1c18d5d8ca101d";
        this.prepareDom();
        this.hasLocalStorage();
    }

    prepareDom() {
        const locationContainer = document.querySelector('.locationContainer');
        this.#locationDom = locationContainer.querySelector('.location');
        this.#weatherDom = locationContainer.querySelector('.weather');
    }

    hasLocalStorage() {
        const loadLocation = localStorage.getItem(this.#LOCATION_LS);
        if (loadLocation === null) {
            console.log("날씨 데이터 없음. geolocation API 요청 중..");
            this.getLocation();
        } else {
            console.log("날씨 데이터 있음.");
            const parseLocation = JSON.parse(loadLocation);
            this.getWeather(parseLocation.lat, parseLocation.lon);
        }
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.saveLocation(position.coords.latitude, position.coords.longitude);
            this.getWeather(position.coords.latitude, position.coords.longitude);
        });
    }

    getWeather(lat, lon) {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.#API_KEY}&units=metric`
        ).then(function (response) {
            return response.json();
        }).then((json) => {
            this.#weather = json.main.temp + " ";
            console.log(this.#weather);
            this.#location = json.name;
            this.setLocation();
        });
    }

    saveLocation(lat,lon){
        const locationObj = {lat, lon};
        localStorage.setItem(this.#LOCATION_LS, JSON.stringify(locationObj));
    }

    setLocation(){
        this.#locationDom.innerText = '내 위치 : ' + this.#location
            +" "+ this.#weather + " 도";
    }
}