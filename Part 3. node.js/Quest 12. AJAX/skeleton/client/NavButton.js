class NavButton{
    #navDom
    #loadDom
    #savaDom

    TAB_COUNT
    TAB_LIMIT
    constructor() {
        this.TAB_COUNT = 1;
        this.TAB_LIMIT = 5;
    }

    addNav(notepadDom){
        const t = document.querySelector('.template-button');
        const tmpl = document.importNode(t.content, true);
        this.#navDom = tmpl.querySelector('.notepad-nav');
        this.#navDom.setAttribute('name', `${this.TAB_COUNT++}`);
        notepadDom.appendChild(this.#navDom);
    }


}