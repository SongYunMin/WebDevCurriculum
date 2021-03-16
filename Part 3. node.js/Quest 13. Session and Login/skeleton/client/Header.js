class Header {
    #dom

    constructor(dom) {
        this.#dom = dom;
        this.#prepareDom();
        this.#bindEvents();
    }

    #prepareDom() {
        const t = document.querySelector('.template-header');
        const tmpl = document.importNode(t.content, true);
        this.#dom.appendChild(tmpl);
    }

    #bindEvents() {
        this.#dom.querySelector('.load').addEventListener('click', async () => {
            const search = prompt("불러올 메모의 제목을 입력하세요.");
            const response = await fetch(`http://localhost:8080/load?name=${search}`);
            if (response.status === 200) {
                const result = await response.json();
                this.#dom.dispatchEvent(new CustomEvent('loadTab', {
                    bubbles: true,
                    detail: {
                        name: result.name,
                        memo: result.memo
                    }
                }));
            } else {
                alert("Title not Found");
            }
        });

        this.#dom.querySelector('.save').addEventListener('click', async () => {
            console.info('save');
            this.#dom.dispatchEvent(new CustomEvent('saveTab', {
                bubbles: true
            }));

        });

        this.#dom.querySelector('.addTabBT').addEventListener('click', () => {
            this.#dom.dispatchEvent(new CustomEvent('addTab', {
                bubbles: true
            }));
        });

        this.#dom.querySelector('.logout').addEventListener('click', async () => {
            const response = await fetch("http://localhost:8080/logout");
            if (response.status === 200) {
                const result = await response.text();
                if (result === 'OK') {
                    alert("로그아웃 되었습니다.");
                    location.href = "Login.html";
                } else {
                    alert("Error!");
                }
            }
        });
    }

    async saveRequest(data){
        const response = await fetch(`http://localhost:8080/save-notepad`, {
            method: "POST",
            headers : {"Content-Type" : "application/json"},
            body:JSON.stringify({
                name:data.name,
                memo:data.memo,
                count:data.count,
                activeIndex:data.activeIndex
            })
        });
    }
}
