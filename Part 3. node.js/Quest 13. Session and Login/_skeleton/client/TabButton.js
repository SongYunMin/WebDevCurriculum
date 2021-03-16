class TabButton{
    #tabButtonDom
    #tabBT
    #TAB_COUNT
    constructor(count) {
        this.prepareDom();
        this.#TAB_COUNT = count;
        this.setElementAttribute();
        this.changeTab();
    }

    prepareDom(){
        const t = document.querySelector('.template-tabBT');
        const tmpl = document.importNode(t.content, true);
        this.#tabButtonDom = tmpl.querySelector('.tabBT-li');
        this.#tabBT = this.#tabButtonDom.querySelector('.tabBT-bt');
    }

    setElementAttribute(){
        this.#tabBT.setAttribute('name', this.#TAB_COUNT);
        this.#tabButtonDom.setAttribute('name', this.#TAB_COUNT);
        this.#tabBT.innerHTML = `탭 ${this.#TAB_COUNT}`;
    }

    getDom(){
        return this.#tabButtonDom;
    }

    changeTab(){
        this.#tabBT.addEventListener('click',(e)=>{
            const click = e.target.getAttribute('name');
            document.dispatchEvent(new CustomEvent('custom-changeTab', {
                bubbles: true,
                detail: click
            }))
        });
    }
}
