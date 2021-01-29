// 배경화면 관련 기능 구현
class Desktop {
    #DesktopDom
    #clockDom
    #todoDom
    #greetingDom
    constructor(dom) {
        this.#DesktopDom = dom;
        this.#clockDom = new Clock();
        this.#todoDom = new Todos();
        this.#greetingDom = new Greeting();
    }

    showTodos(todos){

    }
}