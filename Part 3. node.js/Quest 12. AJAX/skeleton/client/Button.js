class NavButton{
    #newNoteDom
    #loadDom
    #modifyDom
    constructor() {
        this.prepareDom();

    }

    prepareDom(){
        const t = document.querySelector('.template-button');
        const tmpl = document.importNode(t.content, true);
        this.#newNoteDom = tmpl.querySelector('.newNoteBT');
        this.#loadDom = tmpl.querySelector('.loadBT');
        this.#modifyDom = tmpl.querySelector('.modifyBT');
    }

    getNewNoteDom(){
        return this.#newNoteDom;
    }

    getloadDom(){
        return this.#loadDom;
    }

    getmodifyDom(){
        return this.#modifyDom;
    }

}