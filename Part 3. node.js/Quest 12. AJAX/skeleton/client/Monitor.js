
class Monitor {
    #monitorDom
    #tab
    #nav
    #headerDom
    #tabsDom
    #tabs
    #navs
    #navButtonDom
    constructor(monitorDom) {
        this.#monitorDom = monitorDom;
        this.#tab = this.#monitorDom.querySelector('.tab');
        this.#nav = this.#monitorDom.querySelector('.nav');
        this.#headerDom = new Header();
        this.#tabs = []
        this.#navs = []
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
            this.#tabs.push(this.#tabsDom.getDom());
        });
    }

    makeNav(){
        this.#monitorDom.addEventListener('addNavs',(e)=>{
            this.#navButtonDom = new NavButton(e.detail);
            this.#nav.appendChild(this.#navButtonDom.getDom());
            this.#navs.push(this.#navButtonDom.getDom());
            this.loadTab();
        });
    }

    // TODO : 아래 메소드들 배열을 이용하여 관련 클래스에서 수행되도록 수정
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
        });
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
                    this.#headerDom.changeTitle(tabList[i].getAttribute('name') ,data);
                    this.#navButtonDom.saveEvent(data);
                }
            }
        });
    }

    loadTab(){
        this.#navButtonDom.getDom().addEventListener('loadTab', (e)=>{
            const index = e.detail.targetNode.getAttribute('name');
            console.log(index);
            this.#tabsDom.changeNotepad(e.detail.result, e.detail.targetNode, this.#tabs);
        });
    }
}