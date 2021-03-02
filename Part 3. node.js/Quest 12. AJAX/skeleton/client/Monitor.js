class Monitor {
    #monitorDom
    #tabsDom
    #navsDom
    #headerDom
    #tabDom
    #navDom
    #tabsArray
    #navsArray

    constructor(monitorDom) {
        this.#monitorDom = monitorDom;
        this.#tabsDom = this.#monitorDom.querySelector('.tab');
        this.#navsDom = this.#monitorDom.querySelector('.nav');
        this.#headerDom = new Header();
        this.#tabsArray = []
        this.#navsArray = []
        this.makeHeader(this.#headerDom);
        this.makeTabs();
        this.makeNav();
        this.changeTab();
        this.changeTitle();
    }

    makeHeader(header) {
        this.#monitorDom.appendChild(header.getDom());
    }

    makeTabs() {
        this.#monitorDom.addEventListener('custom-addTabs', (e) => {
            this.#tabDom = new Tabs(e.detail);
            this.#tabsDom.appendChild(this.#tabDom.getDom());
            this.#tabsArray.push(this.#tabDom.getDom());
        });
    }

    makeNav() {
        this.#monitorDom.addEventListener('custom-addNavs', (e) => {
            this.#navDom = new NavButton(e.detail);
            this.#navsDom.appendChild(this.#navDom.getDom());
            this.#navsArray.push(this.#navDom.getDom());
            this.loadTab();
        });
    }

    changeTab() {
        document.addEventListener('custom-changeTab', (e) => {
            this.#tabDom.changeTab(e.detail, this.#tabsArray, this.#navsArray);
        });
    }

    changeTitle() {
        document.addEventListener('custom-changeTitle', (e) => {
            const data = this.#tabDom.changeTabTitle(e.detail, this.#tabsArray);
            this.#headerDom.changeTitle(e.detail, data);
            this.#navDom.saveEvent(data);
        });
    }

    loadTab() {
        this.#navDom.getDom().addEventListener('custom-loadTab', (e) => {
            const index = e.detail.targetNode.getAttribute('name');
            this.#tabDom.changeNotepad(e.detail.result, e.detail.targetNode, this.#tabsArray);
        });
    }
}