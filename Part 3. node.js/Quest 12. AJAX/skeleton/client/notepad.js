class Notepad {
    #notepadDom
    #header

    constructor(dom) {
        this.#notepadDom = dom;
        this.#header = new Header();
        console.log(this.#header);
        this.makeHeader(this.#header);
    }

    makeHeader(header){
        this.#notepadDom.appendChild(header.getHeaderDom());
    }

}