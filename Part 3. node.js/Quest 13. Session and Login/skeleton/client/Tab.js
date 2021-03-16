// TabList의 요소, Tab 버튼과 close 버튼을 가지고 있음
class Tab {
    #signature
    #parentDom
    #dom
    #name
    #memo
    #index

    constructor(parentDom, index) {
        this.#signature = Number(new Date()) % 100000;
        this.#index = index;
        this.#parentDom = parentDom;
        this.#prepareDom();
        this.setName(`New Tab ${this.#signature}`);
        this.setMemo('');
        this.#bindEvents();
    }

    #prepareDom() {
        const t = document.querySelector('.template-tab');
        const tmpl = document.importNode(t.content, true);
        this.#dom = tmpl.querySelector('.tab-main');
        this.#parentDom.appendChild(this.#dom);
    }

    setName(newName) {
        this.#name = newName;
        this.#dom.querySelector('.tab-button').innerHTML = this.#name;
    }

    setMemo(newMemo) {
        this.#memo = newMemo;
    }

    getInfo() {
        return {
            name: this.#name,
            memo: this.#memo
        };
    }

    getIndex(){
        return this.#index;
    }

    show() {
        this.#dom.querySelector('.tab-button').dispatchEvent(new Event('click'));
    }


    #bindEvents() {
        this.#dom.querySelector('.tab-button').addEventListener('click', () => {
            console.log(this.#name, this.#memo);
            this.#dom.dispatchEvent(new CustomEvent('showTab', {
                bubbles: true,
                detail: {
                    tab: this,
                    name: this.#name,
                    memo: this.#memo
                }
            }));
        });

        this.#dom.querySelector('.close-button').addEventListener('click', () => {
            this.#dom.dispatchEvent(new CustomEvent('closeTab', {
                bubbles: true,
                detail: {
                    index: this.#index
                }
            }));
            this.#dom.parentNode.removeChild(this.#dom);
        });
    }
}
