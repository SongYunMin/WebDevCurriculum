class Location {
    #locationDom
    #weatherDom

    constructor() {
        this.prepareDom();
    }

    prepareDom(){
        const locationContainer = document.querySelector('.locationContainer');
        this.#locationDom = locationContainer.querySelector('.location');
        this.#weatherDom = locationContainer.querySelector('.weather');
    }


}