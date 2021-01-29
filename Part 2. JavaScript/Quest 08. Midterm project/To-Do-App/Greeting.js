class Greeting {
    #greetingForm
    #greetingInput
    constructor() {
        this.prepareDom();
    }

    prepareDom(){
        const greetingContainer = document.querySelector('.greetingContainer');
        this.#greetingForm = greetingContainer.querySelector('.greetingForm');
        this.#greetingInput = this.#greetingForm.querySelector('.greetingInput');
    }


}