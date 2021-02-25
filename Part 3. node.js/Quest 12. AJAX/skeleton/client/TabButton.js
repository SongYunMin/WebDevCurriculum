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

    // TODO : 탭에 들어갈 속성값 세팅 TAB_COUNT 어떻게 받아오
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
            console.log(e.target);
            const click = e.target.getAttribute('name');
            document.dispatchEvent(new CustomEvent('changeTab', {
                bubbles: true,
                detail: click
            }))
        });
    }
}
