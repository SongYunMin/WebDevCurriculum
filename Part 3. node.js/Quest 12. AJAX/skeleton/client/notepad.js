class Notepad {
    #newNoteInstance
    #headerInstance

    #headerDom
    #headerContentDom

    #notepadDom
    #notepadTabDom
    #notepadNavDom

    eventHandler
    TAB_COUNT
    TAB_LIMIT

    constructor(headerDom, notepadDom) {
        this.TAB_COUNT = 1;
        this.TAB_LIMIT = 5;
        this.#headerInstance = new Header();
        this.#newNoteInstance = new NavButton();

        this.#headerContentDom = this.#headerInstance.getHeaderDom();
        this.#headerDom = headerDom;
        this.#notepadDom = notepadDom;
        this.eventHandler = new EventListener();
        this.makeHeader(this.#headerInstance);
        this.makeNotepad();
        this.addNotepadTab();
        this.changeTab();
    }


    makeNotepad(){
        const t = document.querySelector('.template-notepad');
        const tmpl = document.importNode(t.content, true);
        this.#notepadTabDom = tmpl.querySelector('.notepadTab');

        this.#notepadTabDom.classList.add(`Tab${this.TAB_COUNT}`);
        this.#notepadTabDom.setAttribute('name', `${this.TAB_COUNT++}`);
        this.#notepadDom.appendChild(this.#notepadTabDom);

    }

    makeHeader(header){
        this.#headerDom.appendChild(header.getHeaderDom());
    }

    addNotepadTab(){
        const addTab = this.#headerInstance.getAddTabButtonDom();
        this.eventHandler.addHeaderTab(addTab);
        addTab.addEventListener('click', ()=>{
            if(this.TAB_COUNT >= this.TAB_LIMIT + 1){
                console.log("Tab Maximum");
            }else {
                this.makeNotepad();
            }
        })
    }

    changeTab(){
        const changeTab = this.#headerInstance.getHeaderTabList();
        this.eventHandler.handleTabEvent(changeTab);
        changeTab.addEventListener('click', (e)=>{
            const click = e.target.getAttribute('name');
            const sectionNodes = this.#notepadDom.childNodes;
            console.log(sectionNodes);
            // TODO : 0 번째 node 가 element DOM 이 아니여서 오류
            // TODO : 'nav' 시멘틱이 추가되어 3부터 Loop
            for(let i = 3; i<sectionNodes.length;i++){
                if(click === sectionNodes[i].getAttribute('name')){
                    sectionNodes[i].style.visibility = 'visible';
                }else{
                    sectionNodes[i].style.visibility = 'hidden';
                }
            }

        });
    }


}