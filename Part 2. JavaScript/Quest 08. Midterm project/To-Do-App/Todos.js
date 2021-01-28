class Todos {
    #TODOS_LS
    #dom            // todo List
    #todoForm

    constructor() {
        this.#TODOS_LS = 'toDos';
        this.prepareDom();
        this.startForm();
        this.hasLocalStorage();
        this.getInputText();
    }

    prepareDom() {
        const todosContainer = document.querySelector('.todosContainer');
        this.#dom = todosContainer.querySelector('.todos');
        this.#todoForm = todosContainer.querySelector('.inputTodos');
    }

    startForm() {
        this.#todoForm.addEventListener("submit", this.getInputText);
    }

    // form에 있는 Text를 받아서 setTodo로 전달
    getInputText(event) {
        event.preventDefault();
        const text = this.#dom.value;
        this.setTodoList(text);
        console.log(text);
        debugger;
        this.#dom.value = "";
    }

    hasLocalStorage() {
        const loadedToDos = localStorage.getItem(this.#TODOS_LS);
        if (loadedToDos !== null) {               // 데이터가 있다면?
            const parsedToDos = JSON.parse(loadedToDos);
            parsedToDos.forEach((toDo) => {
                console.log(toDo);
                debugger;
                this.setTodoList(toDo);
            });
        }
    }

    setTodoList(text) {
        const list = document.createElement("li");
        const delBt = document.createElement("button");
        const span = document.createElement("span");
    }


}
