class Monitor {
    #monitorDom
    #tabsDom
    #navsDom
    #headerDom
    #tab
    #nav
    #tabsArray
    #navsArray
    #initData

    constructor(monitorDom) {
        this.#monitorDom = monitorDom;
        this.checkSessionResult();
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

    checkSessionResult() {
        this.#initData = this.checkSessionRequest(async function (result) {
            if (result === 'False') {
                alert("비정상 접근입니다. 다시 로그인 해주세요.");
                location.href = "Login.html";
            } else {
                console.log("정상 접근");
            }
        });
    }

    async checkSessionRequest(callback){
        const data = (async function() {
            const response = await fetch("http://localhost:8080/Notepad");
            if(response.status === 200){
                const result = await response.text();
                callback(result);
                return result;
            }
        })();
        try{
            this.#initData = JSON.parse(await data);
            this.initialize();
        }catch{
            console.log("데아터 없음");
        }
    }

    initialize(){
        this.#headerDom.init(this.#initData);
        document.dispatchEvent(new CustomEvent('custom-changeTab', {
            detail: String(this.#initData.activeIndex)
        }));
        this.#headerDom.changeTitle(String(this.#initData.activeIndex), this.#initData.notepad);
        this.#tab.initNotepad(this.#initData.notepad, this.#initData.activeIndex, this.#tabsArray);

    }

    makeHeader(header) {
        this.#monitorDom.appendChild(header.getDom());
    }

    makeTabs() {
        this.#monitorDom.addEventListener('custom-addTabs', (e) => {
            this.#tab = new Tabs(e.detail);
            this.#tabsDom.appendChild(this.#tab.getDom());
            this.#tabsArray.push(this.#tab.getDom());
        });
    }

    makeNav() {
        this.#monitorDom.addEventListener('custom-addNavs', (e) => {
            this.#nav = new NavButton(e.detail);
            this.#navsDom.appendChild(this.#nav.getDom());
            this.#navsArray.push(this.#nav.getDom());
            this.loadTab();
        });
    }

    changeTab() {
        document.addEventListener('custom-changeTab', (e) => {
            this.#tab.changeTab(e.detail, this.#tabsArray, this.#navsArray);
        });
    }

    changeTitle() {
        document.addEventListener('custom-changeTitle', (e) => {
            const data = {
                tab : this.#tab.changeTabTitle(e.detail.index, this.#tabsArray),
                mouse : e.detail.mouse,
                count : this.#tab.getTabCount(),
                activeIndex : this.#tab.getActiveIndex()
            };
            this.#headerDom.changeTitle(e.detail.index, data.tab);

            this.#nav.saveEvent(data).then(r => {
                console.log(r);
            });
        });
    }

    loadTab() {
        this.#nav.getDom().addEventListener('custom-loadTab', (e) => {
            this.#tab.changeNotepad(e.detail.result, e.detail.targetNode, this.#tabsArray);
        });
    }
}