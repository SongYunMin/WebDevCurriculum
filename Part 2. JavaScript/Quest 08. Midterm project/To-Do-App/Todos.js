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
        console.log(li);
        li.setAttribute('id', 'del');
        console.log(this.#todos);

        this.#todoList.removeChild(li);
        // filter로 LS 삭제되지 않음 (id 문제인듯)
        this.#todos = this.#todos.filter(toDo => toDo.id);
        this.saveTodoList();
    }

    // setTodoList(text) {
    //     const list = document.createElement("li");
    //     const delBt = document.createElement("button");
    //     const span = document.createElement("span");
    //     // const newId = this.#todos.length + 1;
    //     const newId = Number(new Date());
    //
    //     delBt.innerHTML = " &#x26D4";               // Emoji
    //     delBt.classList.add('delBt');
    //
    //     span.innerText = text;                      // list element 요소
    //     list.classList.add('todoElement');
    //     list.appendChild(span);
    //     list.appendChild(delBt);
    //     list.id = newId;
    //     this.#todoList.appendChild(list);
    //     const toDoObj = {
    //         text: text,
    //         id: newId
    //     };
    //     this.#todos.push(toDoObj);
    //     this.saveTodoList();
    // }

}
