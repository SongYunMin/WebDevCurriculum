class NavButton {
    #navDom
    #saveBT
    #loadBT
    #TAB_COUNT
    #saveData

    constructor(count) {
        this.#TAB_COUNT = count;
        this.prepareDom();
        this.setElementAttribute();
        this.changeTitle();
        this.paintNotepad();
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

    paintNotepad(){
        this.loadNotepad(function(result, index, target){
            const Nodes = document.querySelector('.nav').childNodes;
            let targetNode;
            for(let i = 1; i < Nodes.length;i++){
                if(index === Nodes[i].getAttribute('name')){
                    targetNode = Nodes[i];
                    console.log(targetNode);
                }
            }
            const data = {
                result : result,
                targetNode : targetNode
            }
            // [Fix] Target을 이용하여 Index전달
            target.dispatchEvent(new CustomEvent('loadTab', {
                bubbles: true,
                detail: data
            }))
        });
    }

    loadNotepad(callback) {
        let xhr = new XMLHttpRequest();
        this.#loadBT.addEventListener('click', (e) => {
            const index = e.target.parentNode.getAttribute('name');
            const search = prompt("불러올 파일의 제목을 입력하세요.");
            xhr.onload = function () {
                if (xhr.status === 200 || xhr.status === 201) {
                    if (xhr.responseText === 'False') {
                        alert("저장된 제목이 없습니다.");
                        return -1;
                    } else {
                        alert("성공!");
                        callback(xhr.responseText, index, e.target);  // [FIX] Callback 을 이용하여 해결
                    }
                } else {
                    console.error(xhr.responseText);
                }
            }
            xhr.open('GET', `http://localhost:8080/load?name=${search}`);
            xhr.send();
        });
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
    }
}