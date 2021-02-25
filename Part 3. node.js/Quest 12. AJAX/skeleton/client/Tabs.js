class Tabs {
    #tabsDom
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
    }

    getDom(){
        return this.#tabsDom;
    }

    setElementAttribute(){
        this.#tabsDom.setAttribute('name', this.#TAB_COUNT);
    }

    // addTab(notepadDom){
    //     const t = document.querySelector('.template-notepad');
    //     const tmpl = document.importNode(t.content, true);
    //     this.#notepadTabDom = tmpl.querySelector('.notepadTab');
    //     this.#notepadTabDom.classList.add(`Tab${this.TAB_COUNT}`);
    //     this.#notepadTabDom.setAttribute('name', `${this.TAB_COUNT++}`);
    //     notepadDom.appendChild(this.#notepadTabDom);
    // }
    //
    // changeTab(notepadDom, target){
    //     const click = target.getAttribute('name');
    //     const sectionNodes = notepadDom.childNodes;   // 홀수
    //     const navNodes = notepadDom.childNodes;       // 짝수
    //
    //     for(let i = 1; i<sectionNodes.length; i+=2){
    //         if(click === sectionNodes[i].getAttribute('name')){
    //             sectionNodes[i].style.visibility = 'visible';
    //         } else {
    //             sectionNodes[i].style.visibility = 'hidden';
    //         }
    //     }
    //
    //     for(let i = 2; i<navNodes.length;i+=2){
    //         if(click === navNodes[i].getAttribute('name')){
    //             console.log(navNodes[i]);
    //             navNodes[i].style.visibility = 'visible';
    //             navNodes[i].style.zIndex = '2';
    //         }else{
    //             navNodes[i].style.visibility = 'hidden';
    //             navNodes[i].style.zIndex= '1';
    //         }
    //     }
    // }
}