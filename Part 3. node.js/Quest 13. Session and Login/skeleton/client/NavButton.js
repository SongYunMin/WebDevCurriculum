class NavButton {
    #navDom
    #saveBT
    #loadBT
    #TAB_COUNT

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
            const mouseTarget = {
                x : e.clientX,
                y : e.clientY
            }
            e.target.dispatchEvent(new CustomEvent('custom-changeTitle', {
                bubbles: true,
                detail: {
                    index : e.target.parentNode.getAttribute('name'),
                    mouse : mouseTarget
                }
            }));
        });
    }

    paintNotepad() {
        this.loadNotepad(function (result, index, target) {
            const Nodes = document.querySelector('.nav').childNodes;
            let targetNode;
            for (let i = 1; i < Nodes.length; i++) {
                if (index === Nodes[i].getAttribute('name')) {
                    targetNode = Nodes[i];
                }
            }
            const data = {
                result: result,
                targetNode: targetNode
            }
            target.dispatchEvent(new CustomEvent('custom-loadTab', {
                bubbles: true,
                detail: data
            }))
        });
    }

    loadNotepad(callback) {
        this.#loadBT.addEventListener('click', async (e) => {
            const index = e.target.parentNode.getAttribute('name');
            const search = prompt("불러올 메모의 제목을 입력하세요.");
            const response = await fetch(`http://localhost:8080/load?name=${search}`);
            if (response.status === 200) {
                const result = await response.json();
                callback(result, index, e.target);
            } else {
                alert("Title not Found");
            }
        });
    }

    async saveEvent(data) {
        const response = await fetch("http://localhost:8080/save-notepad", {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                notepad : data.tab,
                mouse : data.mouse,
                count : data.count,
                activeIndex : data.activeIndex
            })
        });
        if(response.status === 200){
            console.log(await response.text());
            return response.body;
        }
    }
}