// Tab을 보여주는 Editor

class Editor {
    #dom

    constructor(dom) {
        this.#dom = dom;
        this.#prepareDom();
        this.saveData();
    }

    #prepareDom() {
        const t = document.querySelector('.template-editor');
        const tmpl = document.importNode(t.content, true);
        this.#dom.appendChild(tmpl);
    }

    hide() {
        this.#dom.querySelector('.editor-main').classList.remove('show');
    }

    show() {
        this.#dom.querySelector('.editor-main').classList.add('show');
    }

    render({ name, memo }) {
        this.show();
        this.#dom.querySelector('.name').value = name;
        this.#dom.querySelector('.memo').value = memo;
    }

    saveData(){
        const editor = this.#dom.querySelector('.editor-main');
        return {
            name: editor.querySelector('.name').value,
            memo: editor.querySelector('.memo').value
        }
    }
}