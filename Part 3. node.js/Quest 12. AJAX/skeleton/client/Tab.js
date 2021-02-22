class Tab{
    #notepadTabDom

    TAB_COUNT
    TAB_LIMIT
    constructor() {
        this.TAB_COUNT = 1;
        this.TAB_LIMIT = 5;
    }

    addTab(notepadDom){
        const t = document.querySelector('.template-notepad');
        const tmpl = document.importNode(t.content, true);
        this.#notepadTabDom = tmpl.querySelector('.notepadTab');
        this.#notepadTabDom.classList.add(`Tab${this.TAB_COUNT}`);
        this.#notepadTabDom.setAttribute('name', `${this.TAB_COUNT++}`);
        notepadDom.appendChild(this.#notepadTabDom);
    }

    changeTab(notepadDom, target){
        const click = target.getAttribute('name');
        const sectionNodes = notepadDom.childNodes;   // 홀수
        const navNodes = notepadDom.childNodes;       // 짝수
        console.log(navNodes);

        for(let i = 1; i<sectionNodes.length; i+=2){
            if(click === sectionNodes[i].getAttribute('name')){
                sectionNodes[i].style.visibility = 'visible';
            } else {
                sectionNodes[i].style.visibility = 'hidden';
            }
        }
        for(let i = 2; i<navNodes.length;i+=2){
            if(click === navNodes[i].getAttribute('name')){
                navNodes[i].style.visibility = 'visible';
            }else{
                navNodes[i].style.visibility = 'hidden';
            }
        }
    }
}