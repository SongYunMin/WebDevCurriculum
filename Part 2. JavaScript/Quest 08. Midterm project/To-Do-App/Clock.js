class Clock{
    #dom
    constructor() {
        this.prepareDom();
        this.startClock();
    }

    prepareDom(){
        const clockContainer = document.querySelector('.clockContainer');
        this.#dom = clockContainer.querySelector('.clock');
    }

    getDom(){
        return this.#dom;
    }

    prepareClock() {
        const date = new Date();
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const seconds = date.getSeconds();
        this.#dom.innerText = `${hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds}`;
    }

    // setTime(time){
    //     return `${time < 10 ? `0${time}` : time}`
    // }

    startClock(){
        this.prepareClock();
        let set = setInterval(this.prepareClock.bind(this), 1000);
        console.log(set);
    }
}