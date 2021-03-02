class Tabs {
    #tabsDom
    #titleDom
    #memoDom
    #TAB_COUNT
    constructor(count) {
        this.#TAB_COUNT = count;
       this.prepareDom();
       this.setElementAttribute();
    }

    prepareDom(){
        const t = document.querySelector('.template-tab');
        const tmpl = document.importNode(t.content, true);
        this.#tabsDom = tmpl.querySelector('.notepadTab');
        this.#titleDom = this.#tabsDom.querySelector('.notepadTitle');
        this.#memoDom = this.#tabsDom.querySelector('.notepadMemo');
    }

    getDom(){
        return this.#tabsDom;
    }

    setElementAttribute(){
        this.#tabsDom.setAttribute('name', this.#TAB_COUNT);
    }

    changeNotepad(data, target, tabs){
        const jsonData = JSON.parse(data);
        const index = target.getAttribute('name');
        for(let i=0;i<tabs.length;i++){
            if(index === tabs[i].getAttribute('name')){
                const title = tabs[i].querySelector('.notepadTitle');
                const memo = tabs[i].querySelector('.notepadMemo');
                title.value = `${jsonData.title}`;
                memo.value = `${jsonData.memo}`;
            }
        }
    }
}