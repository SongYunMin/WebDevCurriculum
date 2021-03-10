class Header {
    #headerDom
    #headerAddBT
    #headerLogoutBT
    #headerTabList
    #TAB_COUNT
    #TAB_LIMIT
    constructor() {
        this.#TAB_COUNT = 1;
        this.#TAB_LIMIT = 5;
        this.prepareDom();
        this.makeTab();
        this.logoutResult();
    }

    prepareDom() {
        const t = document.querySelector('.template-header');
        const tmpl = document.importNode(t.content, true);
        this.#headerDom = tmpl.querySelector('.main-header');
        this.#headerAddBT = this.#headerDom.querySelector('.addTabBT');
        this.#headerLogoutBT = this.#headerDom.querySelector('.logout');
        this.#headerTabList = this.#headerDom.querySelector('.tabList');
    }

    makeTab(){
        this.#headerAddBT.addEventListener('click', ()=>{
            if(this.#TAB_COUNT >= this.#TAB_LIMIT+1){
                alert("탭은 다섯개 이상 생성할 수 없습니다.");
            } else {
                const tabButton = new TabButton(this.#TAB_COUNT);
                this.#headerTabList.appendChild(tabButton.getDom());
                this.#headerAddBT.dispatchEvent(new CustomEvent('custom-addTabs', {
                    bubbles: true,
                    detail: this.#TAB_COUNT
                }));
                this.#headerAddBT.dispatchEvent(new CustomEvent('custom-addNavs', {
                    bubbles: true,
                    detail: this.#TAB_COUNT
                }))
                this.#TAB_COUNT++;
            }
        });
    }

    init(initData){
        for(let i=0;i<initData.count;i++) {
            this.#headerAddBT.dispatchEvent(new Event('click'));
        }

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

    logoutResult(){
        this.logoutRequest(function(result){
            if(result === 'OK'){
                alert("로그아웃 되었습니다.");
                location.href = "Login.html";
            }else{
                alert("Error!");
            }
        });
    }

    logoutRequest(callback){
        this.#headerLogoutBT.addEventListener('click', async ()=>{
            const response = await fetch("http://localhost:8080/logout");
            if(response.status === 200){
                const result = await response.text();
                callback(result);
            }

        })
    }
}
