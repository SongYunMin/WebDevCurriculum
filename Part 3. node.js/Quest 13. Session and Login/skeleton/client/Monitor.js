class Monitor {
    #dom
    #header
    #tabs
    #editor
    #initData

    constructor(dom) {
        this.#dom = dom;
        this.#prepareDom();
        this.#header = new Header(this.#dom.querySelector('.header'));
        this.#tabs = new Tabs(this.#dom.querySelector('.tabs'));
        this.#editor = new Editor(this.#dom.querySelector('.editor'));
        this.#checkSessionRequest();
        this.#bindEvents();
    }

    #prepareDom () {
        const t = document.querySelector('.template-monitor');
        const tmpl = document.importNode(t.content, true);
        this.#dom.appendChild(tmpl);
    }

    #checkSessionRequest(){
        this.#initData = (async function() {
            const response = await fetch("http://localhost:8080/Notepad");
            if(response.status === 200){
                const result = await response.text();
                if (result === 'False') {
                    alert("비정상 접근입니다. 다시 로그인 해주세요.");
                    location.href = "Login.html";
                } else {
                    console.log("정상 접근");
                    return result;
                }
            }
        })();
        const res = this.#initialize();
    }

    async #initialize(){
        const init = JSON.parse(await this.#initData);
        if(init.DATA === "DATA_NOT_FOUND"){
            console.log("DATA NOT FOUND");
        }else {
            for (let i = 0; i < init.count; i++) {
                this.#dom.dispatchEvent(new CustomEvent('addTab'));
            }
            console.log(init);
            this.#tabs.init(init);
            this.#editor.render(init.notepad[init.notepad.length - 1]);
        }
    }

    #bindEvents () {
        // 탭 추가
        this.#dom.addEventListener('addTab', () => {
            const newTab = this.#tabs.addTab();
            this.#tabs.select(newTab);
            this.#editor.render(newTab.getInfo());
        });

        // 불러오기 (탭 추가 됨)
        this.#dom.addEventListener('loadTab', (e) => {
            const newTab = this.#tabs.loadTab(e.detail);
            this.#tabs.select(newTab);
            this.#editor.render(newTab.getInfo());
        });

        // 다른 탭 클릭 (현재 탭 데이터 Set 하고 가야 함)
        this.#dom.addEventListener('showTab', e => {
            const data = this.#editor.saveData();
            this.#tabs.save(data);          // TODO : 한번씩 밀려야 정상 -> 기존 데이터 저장
            this.#tabs.select(e.detail.tab)
            this.#editor.render({
                name: e.detail.name,
                memo: e.detail.memo
            })
        });

        this.#dom.addEventListener('saveTab', async () =>{
            const notepad= this.#editor.saveData();
            this.#tabs.save(notepad);
            const data = {
                name : notepad.name,
                memo : notepad.memo,
                count : this.#tabs.getCount(),
                activeIndex : this.#tabs.getIndex()
            }
            const response = await this.#header.saveRequest(data);
            if(response === 200) {
                // TODO : Async Response Callback
                console.log(response);
            }
        });

        this.#dom.addEventListener('hideEditor', () => {
            this.#editor.hide();
        });
    }
}
