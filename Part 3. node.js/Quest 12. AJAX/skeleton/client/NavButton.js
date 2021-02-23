class NavButton {
    #notepadInstance
    #navDom
    #loadDom
    #saveDom

    TAB_COUNT
    TAB_LIMIT

    constructor() {
        this.TAB_COUNT = 1;
        this.TAB_LIMIT = 5;

    }

    addNav(notepadDom) {
        const t = document.querySelector('.template-button');
        const tmpl = document.importNode(t.content, true);
        this.#navDom = tmpl.querySelector('.notepad-nav');
        this.#navDom.classList.add(`nav${this.TAB_COUNT}`);
        this.#navDom.setAttribute('name', `${this.TAB_COUNT}`);
        this.#saveDom = this.#navDom.querySelector('.saveBT');
        this.#saveDom.innerHTML = `저장(Tab${this.TAB_COUNT++})`;
        this.#loadDom = this.#navDom.querySelector('.loadBT');
        notepadDom.appendChild(this.#navDom);
        // 중첩 적용 되면서 이벤트가 마지막으로 가나?
        // this.saveButtonEvent();
        // this.loadButtonEvent();
        this.navButtonEvent();
    }

    navButtonEvent() {
        this.#navDom.addEventListener('click', (e) => {
            console.log(e.target.getAttribute('class'));
            if (e.target.classList.contains('loadBT')) {
                console.log(e.target);
            } else if (e.target.classList.contains('saveBT')) {
                console.log(e.target);
                const a = "test"
                $.ajax({
                    url: '/save',
                    dataType: 'json',
                    type: 'POST',
                    data: {data: a},
                    success: function (result) {
                        if (result) {
                            alert(`제목 '${result}' 의 저장이 완료되었습니다.`);
                        }
                    }
                });
            }
        });
    }


}