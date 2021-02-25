class NavButton {
    #navDom
    #saveBT
    #loadBT
    #TAB_COUNT
    constructor(count) {
        this.#TAB_COUNT = count;
        this.prepareDom();
        this.setElementAttribute();
    }

    prepareDom(){
        const t = document.querySelector('.template-nav');
        const tmpl = document.importNode(t.content, true);
        this.#navDom = tmpl.querySelector('.notepad-nav');
        this.#loadBT = this.#navDom.querySelector('.loadBT');
        this.#saveBT = this.#navDom.querySelector('.saveBT');
    }

    getDom(){
        return this.#navDom;
    }

    setElementAttribute(){
        this.#navDom.setAttribute('name', this.#TAB_COUNT);
    }

    //
    // addNav(notepadDom) {
    //     const t = document.querySelector('.template-button');
    //     const tmpl = document.importNode(t.content, true);
    //
    //     this.#navDom = tmpl.querySelector('.notepad-nav');
    //     this.#navDom.classList.add(`nav${this.TAB_COUNT}`);
    //     this.#navDom.setAttribute('name', `${this.TAB_COUNT}`);
    //
    //     this.#saveDom = this.#navDom.querySelector('.saveBT');
    //     this.#saveDom.innerHTML = `저장(Tab${this.TAB_COUNT})`;
    //     this.#saveDom.setAttribute('name', `${this.TAB_COUNT}`);
    //
    //     this.#loadDom = this.#navDom.querySelector('.loadBT');
    //     this.#loadDom.setAttribute('name', `${this.TAB_COUNT++}`);
    //
    //     notepadDom.appendChild(this.#navDom);
    //     this.navButtonEvent();
    // }
    //
    // // TODO : 저장시에 탭 이름 제목으로
    // navButtonEvent() {
    //     this.#navDom.addEventListener('click', (e) => {
    //         console.log(e.target.getAttribute('class'));
    //         if (e.target.classList.contains('loadBT')) {
    //         } else if (e.target.classList.contains('saveBT')) {
    //             const notepadList = document.querySelector('.notepad-section').childNodes;
    //             const tabTitleList = document.querySelector('.tabList').childNodes;
    //
    //             // Title, Memo 추출
    //             for (let i = 1; i < notepadList.length; i+=2) {
    //                 if(e.target.getAttribute('name') ===
    //                 notepadList[i].getAttribute('name')) {
    //                     this.#title = notepadList[i].querySelector('.notepadTitle').value;
    //                     this.#memo = notepadList[i].querySelector('.notepadMemo').value;
    //                 }
    //             }
    //
    //             // 탭 제목 변경
    //             for(let i=1;i<tabTitleList.length; i++){
    //                 if(e.target.getAttribute('name') ===
    //                 tabTitleList[i].getAttribute('name')){
    //                     tabTitleList[i].innerHTML =
    //                         `<button class="tabBT-bt" name=${i}>${this.#title}</button>`;
    //                 }
    //             }
    //         }
    //     });
    // }

}