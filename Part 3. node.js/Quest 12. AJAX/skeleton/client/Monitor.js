/*
1개의 monitor 는 1개의 Header 를 가질 수 있음
 */

class Monitor {
    #monitorDom
    #tab
    #nav
    #headerDom
    #tabsDom
    #navButtonDom
    constructor(monitorDom) {
        this.#monitorDom = monitorDom;
        this.#tab = this.#monitorDom.querySelector('.tab');
        this.#nav = this.#monitorDom.querySelector('.nav');
        this.#headerDom = new Header();
        this.makeHeader(this.#headerDom);
        this.makeTabs();
        this.makeNav();
        this.changeTab();
    }

    makeHeader(header){
        this.#monitorDom.appendChild(header.getDom());
    }

    makeTabs(){
        this.#monitorDom.addEventListener('addTabs', (e)=>{
            this.#tabsDom = new Tabs(e.detail);
            this.#tab.appendChild(this.#tabsDom.getDom());
        });
    }

    makeNav(){
        this.#monitorDom.addEventListener('addNavs',(e)=>{
            console.log("Nav 생성");
            this.#navButtonDom = new NavButton(e.detail);
            this.#nav.appendChild(this.#navButtonDom.getDom());
        });
    }

    changeTab(){
        document.addEventListener('changeTab', (e)=>{
            const tabNodes = this.#tab.childNodes;
            const navNodes = this.#nav.childNodes;
            console.log(tabNodes);

            for(let i=1;i<tabNodes.length;i++){
                if(e.detail === tabNodes[i].getAttribute('name')){
                    tabNodes[i].style.visibility = 'visible';
                }else{
                    tabNodes[i].style.visibility = 'hidden';
                }
            }

            for(let i=1;i<navNodes.length;i++){
                if(e.detail === navNodes[i].getAttribute('name')){
                    navNodes[i].style.visibility = 'visible';
                }else{
                    navNodes[i].style.visibility = 'hidden';
                }
            }

        })
    }

    // makeHeader(){
    //     this.#headerInstance.addHeader(this.#headerDom);
    // }
    //
    // makeNotepad(){
    //     this.#tabInstance.addTab(this.#notepadDom);
    // }
    //
    // makeNavigation(){
    //     this.#navButtonInstance.addNav(this.#notepadDom);
    // }
    //
    // addNotepadTab(){
    //     const addTab = this.#headerInstance.getAddTabButtonDom();
    //     addTab.addEventListener('click', ()=>{
    //         if(!(this.TAB_COUNT >= this.TAB_LIMIT + 1)){
    //             this.#tabInstance.addTab(this.#notepadDom);
    //             this.#navButtonInstance.addNav(this.#notepadDom);
    //         }
    //     });
    // }
    //
    // changeTab(){
    //     const changeTab = this.#headerInstance.getHeaderTabList();
    //     changeTab.addEventListener('click', (e)=>{
    //         this.#tabInstance.changeTab(this.#notepadDom, e.target);
    //     });
    // }
}