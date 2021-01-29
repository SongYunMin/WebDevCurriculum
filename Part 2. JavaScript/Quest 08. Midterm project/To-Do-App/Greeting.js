class Greeting {
    #greetingForm
    #greetingInput

    constructor() {
        this.prepareDom();
        this.getInputText();

    }

    prepareDom(){
        const greetingContainer = document.querySelector('.greetingContainer');
        this.#greetingForm = greetingContainer.querySelector('.greetingForm');
        this.#greetingInput = this.#greetingForm.querySelector('.greetingInput');
    }

    getInputText(){
        this.#greetingForm.addEventListener("submit", e=>{
           e.preventDefault();
           const text = this.#greetingInput.value;
           console.log(text);
           this.#greetingInput.value = "";
        });
    }





}