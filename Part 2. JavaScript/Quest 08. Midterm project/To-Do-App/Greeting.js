class Greeting {
    #GREETING_LS = 'User';
    #greeting
    #greetingForm
    #greetingInput

    constructor() {
        this.prepareDom();
        this.hasLocalStorage();
        this.getInputText();
    }

    prepareDom() {
        const greetingContainer = document.querySelector('.greetingContainer');
        this.#greetingForm = greetingContainer.querySelector('.greetingForm');
        this.#greetingInput = this.#greetingForm.querySelector('.greetingInput');
    }

    // Web 시작 시 LocalStorage 저장 값을 확인하는 메서드
    hasLocalStorage() {
        const loadedGreeting = localStorage.getItem(this.#GREETING_LS);
        if (loadedGreeting !== null) {              // 데이터가 있다면?
            const parsedGreeting = JSON.parse(loadedGreeting);
            this.#greetingInput.remove();
            this.setGreeting(parsedGreeting.name);
        }else{                                      // 데이터가 없다면?

        }
    }

    setGreeting(text) {
        const greeting = document.createElement("span");
        greeting.innerText = text;
        greeting.classList.add('greeting');
        // TODO : Form 을 없애서 Append 되지 않음
        this.#greetingForm.appendChild(greeting);
        this.#greeting = {name : text};
        this.saveUserName();

    }

    // LS에 값이 없을 시 Form을 통해 입력받음
    getInputText() {
        this.#greetingForm.addEventListener("submit", e => {
            e.preventDefault();
            const text = this.#greetingInput.value;
            this.setGreeting(text);
            this.#greetingInput.remove();
        });
    }

    saveUserName() {
        localStorage.setItem(this.#GREETING_LS, JSON.stringify(this.#greeting))
    }


}