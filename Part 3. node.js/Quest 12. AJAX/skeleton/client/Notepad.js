class Notepad {
    #navButtonInstance
    #headerInstance
    #tabInstance

    #headerDom
    #headerContentDom

    #notepadDom

    TAB_COUNT
    TAB_LIMIT
    constructor(headerDom, notepadDom) {
        this.TAB_COUNT = 1;
        this.TAB_LIMIT = 5;
        this.#headerInstance = new Header();
        this.#navButtonInstance = new NavButton();
        this.#tabInstance = new Tab();

        this.#headerContentDom = this.#headerInstance.getHeaderDom();
        this.#headerDom = headerDom;
        this.#notepadDom = notepadDom;
        this.makeHeader(this.#headerInstance);
        this.makeNotepad();
        this.makeNavigation();
        this.addNotepadTab();
        this.changeTab();
    }

    makeHeader(){
        this.#headerInstance.addHeader(this.#headerDom);
    }

    makeNotepad(){
        this.#tabInstance.addTab(this.#notepadDom);
    }

    makeNavigation(){
        this.#navButtonInstance.addNav(this.#notepadDom);
    }

    addNotepadTab(){
        const addTab = this.#headerInstance.getAddTabButtonDom();
        addTab.addEventListener('click', ()=>{
            if(!(this.TAB_COUNT >= this.TAB_LIMIT + 1)){
                this.#tabInstance.addTab(this.#notepadDom);
                this.#navButtonInstance.addNav(this.#notepadDom);
            }
        });
    }

    changeTab(){
        const changeTab = this.#headerInstance.getHeaderTabList();
        changeTab.addEventListener('click', (e)=>{
            this.#tabInstance.changeTab(this.#notepadDom, e.target);
        });
    }
}