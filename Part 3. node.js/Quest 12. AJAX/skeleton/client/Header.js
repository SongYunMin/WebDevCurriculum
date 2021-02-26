class Header {
    #headerDom
    #headerAddBT
    #headerTabList
    #TAB_COUNT
    #TAB_LIMIT
    constructor() {
        this.#TAB_COUNT = 1;
        this.#TAB_LIMIT = 5;
        this.prepareDom();
        this.makeTab();
    }

    prepareDom() {
        const t = document.querySelector('.template-header');
        const tmpl = document.importNode(t.content, true);
        this.#headerDom = tmpl.querySelector('.main-header');
        this.#headerAddBT = this.#headerDom.querySelector('.addTabBT');
        this.#headerTabList = this.#headerDom.querySelector('.tabList');
    }

    // 탭 추가 버튼 이벤트
    makeTab(){
        this.#headerAddBT.addEventListener('click', (e)=>{
            if(this.#TAB_COUNT >= this.#TAB_LIMIT+1){
                alert("탭은 다섯개 이상 생성할 수 없습니다.");
            } else {
                const tabButton = new TabButton(this.#TAB_COUNT);
                this.#headerTabList.appendChild(tabButton.getDom());
                this.#headerAddBT.dispatchEvent(new CustomEvent('addTabs', {
                    bubbles: true,
                    detail: this.#TAB_COUNT
                }));
                this.#headerAddBT.dispatchEvent(new CustomEvent('addNavs', {
                    bubbles: true,
                    detail: this.#TAB_COUNT
                }))
                this.#TAB_COUNT++;
            }
        });
    }

    changeTitle(index, data){
        const tabList = this.#headerTabList.childNodes;
        for(let i=1;i<tabList.length;i++){
            if(index === tabList[i].getAttribute('name')){
                const titleBT = tabList[i].querySelector('.tabBT-bt');
                titleBT.innerHTML = `${data.title}`;
            }
        }
    }

    getDom(){
        return this.#headerDom;
    }
}
