// TabList, Tab 들을 가지고 있음
class Tabs {
    #counter
    #dom
    #tabList
    #selectedTab

    constructor(dom) {
        this.#counter = 0;
        this.#dom = dom;
        this.#tabList = [];
        this.#selectedTab = null;
        this.#prepareDom();
        this.#bindEvents();
    }

    #prepareDom() {
        const t = document.querySelector('.template-tabs');
        const tmpl = document.importNode(t.content, true);
        this.#dom.appendChild(tmpl);
    }

    init(initData){
        console.log(initData);
        for(let i=0;i<initData.notepad.length;i++){
            this.#tabList[initData.notepad[i].index].setName(initData.notepad[i].name);
            this.#tabList[initData.notepad[i].index].setMemo(initData.notepad[i].memo);
        }
        this.select(this.#tabList[initData.activeIndex]);
    }

    addTab() {
        const newTab = new Tab(this.#dom, this.#counter++);
        this.#tabList.push(newTab);
        return newTab;
    }

    loadTab({name, memo}) {
        const newTab = new Tab(this.#dom, this.#counter++);
        newTab.setName(name);
        newTab.setMemo(memo);
        this.#tabList.push(newTab);
        return newTab;
    }

    save(data) {
        for (let i = 0; i < this.#tabList.length; i++) {
            if (this.#tabList[i].getIndex() === this.#selectedTab.getIndex()) {
                this.#selectedTab.setName(data.name);
                this.#selectedTab.setMemo(data.memo);
            }
        }
    }

    select(tab) {
        this.#selectedTab = tab;
    }

    getIndex(){
        return this.#selectedTab.getIndex();
    }

    getCount(){
        return this.#counter;
    }

    #bindEvents() {
        this.#dom.addEventListener('closeTab', async (e) => {
            let i;
            for (i = 0; i < this.#tabList.length; i++) {
                if (this.#tabList[i].getIndex() === e.detail.index) {
                    break;
                }
            }
            const data = {
                count : --this.#counter,
                notepad : this.#tabList[i].getInfo(),
                index : this.#tabList[i].getIndex()
            }
            this.#tabList.splice(i, 1);

            const response = await fetch(`http://localhost:8080/delete?data=${JSON.stringify(data)}`,{
                method: "GET",
                headers: {"Content-Type" : "application/json"},
            });
            if(response.status === 200){
                const result = await response.json();
                if(result.err){
                    alert("Delete Error!");
                    return -1;
                }
            }
            this.#dom.dispatchEvent(new CustomEvent('hideEditor',{
                bubbles:true
            }));
            console.log("삭제 후 : ", this.#tabList);

            // if (this.#selectedTab !== null &&
            //     this.#selectedTab.getIndex() === this.#tabList[i].getIndex()) {
            //     this.#selectedTab = null;
            //
            //     if (this.#tabList.length === 1) {
            //         this.#dom.dispatchEvent(new CustomEvent('hideEditor', {
            //             bubbles: true
            //         }));
            //     } else if (i !== 0) {
            //         this.#tabList[0].show();
            //         this.select(this.#tabList[0]);
            //     } else {
            //         this.#tabList[1].show();
            //         this.select(this.#tabList[1]);
            //     }
            // }
            // this.#tabList.splice(i, 1);
            // console.log("삭제 후 : ", this.#tabList);
        });
    }
}