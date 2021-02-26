
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
        this.changeTitle();
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
            this.#navButtonDom = new NavButton(e.detail);
            this.#nav.appendChild(this.#navButtonDom.getDom());
        });
    }

    changeTab(){
        document.addEventListener('changeTab', (e)=>{
            const tabNodes = this.#tab.childNodes;
            const navNodes = this.#nav.childNodes;
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

    changeTitle(){
        document.addEventListener('changeTitle', (e)=>{
            const tabList = this.#tab.childNodes
            for(let i=1;i<tabList.length;i++){
                if(e.detail === tabList[i].getAttribute('name')) {
                    const titleNode = tabList[i].querySelector('.notepadTitle');
                    const memoNode = tabList[i].querySelector('.notepadMemo');
                    const title = titleNode.value;
                    const memo = memoNode.value;
                    let data = {
                        title : title,
                        memo : memo
                    }
                    this.#headerDom.changeTitle(tabList[i].getAttribute('name'),data);
                    this.#navButtonDom.saveEvent(data);
                }
            }
        });
    }
}