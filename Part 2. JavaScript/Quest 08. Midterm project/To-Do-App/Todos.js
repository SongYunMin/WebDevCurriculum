class Todos {
    #TODOS_LS
    #dom            // todo List
    #todoForm
    #todoInput

    constructor() {
        this.#TODOS_LS = 'toDos';
        this.prepareDom();
        this.startForm();
        // this.hasLocalStorage();
    }

    prepareDom() {
        const todosContainer = document.querySelector('.todosContainer');
        this.#dom = todosContainer.querySelector('.todos');
        this.#todoForm = document.querySelector('.inputTodosForm');
        this.#todoInput = this.#todoForm.querySelector('.inputTodos');
    }

    startForm() {
        console.log(this.#todoForm);
        this.#todoForm.addEventListener("submit", e =>{
            e.preventDefault();
            console.log("Event!!");
            const text = this.#todoInput.value;
            // this.setTodoList(text);
            console.log(text);
            this.#dom.value = "";
            // this.getInputText();
        });
    }

    // form에 있는 Text를 받아서 setTodo로 전달
    getInputText() {
        // const text = this.#dom.value;
        // // this.setTodoList(text);
        // console.log(text);
        // debugger;
        // this.#dom.value = "";
    }

    hasLocalStorage() {
        const loadedToDos = localStorage.getItem(this.#TODOS_LS);
        if (loadedToDos !== null) {               // 데이터가 있다면?
            const parsedToDos = JSON.parse(loadedToDos);
            // parsedToDos.forEach((toDo) => {
            //     console.log(toDo);
            //     // this.setTodoList(toDo);
            // });
        }
    }

    setTodoList(text) {
        const list = document.createElement("li");
        const delBt = document.createElement("button");
        const span = document.createElement("span");
    }


}
