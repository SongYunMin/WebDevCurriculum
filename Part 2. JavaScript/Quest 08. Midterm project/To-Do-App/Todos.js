class Todos {
    /* Private Member */
    #TODOS_LS           // Local Storage Name
    #dom                // Container DOM
    #todoForm           // Form DOM
    #todoInput          // input Tag DOM

    #todos              // List Array
    #todoList           // List Element

    constructor() {
        this.#TODOS_LS = 'toDos';
        this.#todos = [];
        this.prepareDom();
        this.getInputText();
        this.hasLocalStorage();
    }

    prepareDom() {
        const todosContainer = document.querySelector('.todosContainer');
        this.#dom = todosContainer.querySelector('.todos');
        this.#todoList = todosContainer.querySelector('.todolist');
        this.#todoForm = document.querySelector('.inputTodosForm');
        this.#todoInput = this.#todoForm.querySelector('.inputTodos');
    }

    hasLocalStorage() {
        const loadedToDos = localStorage.getItem(this.#TODOS_LS);
        if (loadedToDos !== null) {               // 데이터가 있다면?
            const parsedToDos = JSON.parse(loadedToDos);
            parsedToDos.forEach((toDo) => {
                console.log(toDo);
                this.setTodoList(toDo.text);
            });
        }
    }

    getInputText() {
        console.log(this.#todoForm);
        this.#todoForm.addEventListener("submit", e =>{
            e.preventDefault();
            const text = this.#todoInput.value;
            this.setTodoList(text);
            this.#todoInput.value = "";
        });
    }



    setTodoList(text) {
        const list = document.createElement("li");
        const delBt = document.createElement("button");
        const span = document.createElement("span");
        const newId = this.#todos.length + 1;

        delBt.innerHTML = " &#x26D4";               // Emoji
        delBt.addEventListener("click", e => {
            this.deleteTodoList(e);
        });

        span.innerText = text;                      // list element 요소
        list.appendChild(span);
        list.appendChild(delBt);
        list.id = newId;
        this.#todoList.appendChild(list);
        const toDoObj = {
            text: text,
            id: newId
        };
        this.#todos.push(toDoObj);
        this.saveTodoList();
    }

    saveTodoList(){
        localStorage.setItem(this.#TODOS_LS, JSON.stringify(this.#todos));
    }

    deleteTodoList(e) {
        const bt = e.target;
        const li = bt.parentNode;
        console.log(li);
        this.#todoList.removeChild(li);     // 완전 삭제 아님
        this.#todos = this.#todos.filter(toDo => {
            console.log(li.id, (toDo.id));
            return toDo.id !== parseInt(li.id);
        });
        this.saveTodoList();
    }
}
