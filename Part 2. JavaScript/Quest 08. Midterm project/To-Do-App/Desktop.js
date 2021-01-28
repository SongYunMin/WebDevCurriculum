// 배경화면 관련 기능 구현
class Desktop {
    #dom
    #clock
    #todos
    constructor(dom) {
        this.#dom = dom;
        this.#clock = new Clock();
        this.#clock = new Todos();
    }

    showTodos(todos){

    }
}