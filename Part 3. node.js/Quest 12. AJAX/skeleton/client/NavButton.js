class NavButton {
    #navDom
    #saveBT
    #loadBT
    #TAB_COUNT
    #saveData
    #loadData


    constructor(count) {
        this.#TAB_COUNT = count;
        this.prepareDom();
        this.setElementAttribute();
        this.changeTitle();
        this.loadNotepad();
    }

    prepareDom() {
        const t = document.querySelector('.template-nav');
        const tmpl = document.importNode(t.content, true);
        this.#navDom = tmpl.querySelector('.notepad-nav');
        this.#loadBT = this.#navDom.querySelector('.loadBT');
        this.#saveBT = this.#navDom.querySelector('.saveBT');
    }

    getDom() {
        return this.#navDom;
    }

    setElementAttribute() {
        this.#navDom.setAttribute('name', this.#TAB_COUNT);
    }

    changeTitle() {
        this.#saveBT.addEventListener('click', (e) => {
            e.target.dispatchEvent(new CustomEvent('changeTitle', {
                bubbles: true,
                detail: e.target.parentNode.getAttribute('name')
            }));
        });
    }

    loadNotepad(){
        let xhr = new XMLHttpRequest();
        this.#loadBT.addEventListener('click', (e)=>{
            xhr.onload = function(){
                if(xhr.status === 200 || xhr.status === 201){
                    console.log(xhr.responseText);
                }else{
                    console.error(xhr.responseText);
                }
            }
            console.log("Load Notepad!!");
            xhr.open('GET', 'http://localhost:8080/load');
            xhr.send();
        });

        // 비동기 처리
        xhr.addEventListener('load',()=>{
            console.log("받은 데이터 :", xhr.responseText);
            this.#loadData = JSON.parse(xhr.responseText);
            console.log("JSON 변환! : ", this.#loadData);
        })
    }

    saveEvent(data){
        this.#saveData = data;
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status === 200 || xhr.status === 201){
                console.log(xhr.responseText);
            }else{
                console.error(xhr.responseText);
            }
        };
        xhr.open('POST','http://localhost:8080/save');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(this.#saveData));

        // fetch("http://localhost:8080/save", {
        //     method: "POST",
        //     headers:{
        //         'Content-Type': 'application/json',
        //         'Accept' : 'application/json',
        //     },
        //     data: {
        //         title:this.#data.title,
        //         memo: this.#data.memo
        //     },
        // }).then((response)=>
        //     console.log(response)
        // )
    }
}