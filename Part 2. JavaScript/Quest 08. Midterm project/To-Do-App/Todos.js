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
        this.#todoForm.addEventListener("submit", (e)=>{
            e.preventDefault();
            const text = this.#todoInput.value;
            // this.setTodoList(text);
            this.setTodoList(text);
            this.#todoInput.value = "";
        });
    }

    setTodoList(text){
        const t = document.querySelector('.template-todo-element');
        const tmpl = document.importNode(t.content, true);
        const li = tmpl.querySelector('.todo-li');
        const span = li.querySelector('.todoElement');
        const delBt = li.querySelector('.delBt');
        const newId = Number(new Date()) + 1;
        console.log(newId);

        li.id = String(newId);
        span.innerHTML = text;
        this.#todoList.appendChild(li);
        delBt.addEventListener("click", e => {
            this.deleteTodoList(e);
        });
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
        this.#todos = this.#todos.filter(toDo => toDo.id !== parseInt(li.id));
        this.#todoList.removeChild(li);
        this.saveTodoList();
    }
}
