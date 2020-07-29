const tag = '[Main contorller]'

import View from "../views/View.js"

const FormView = Object.create(View)

FormView.setup = function (el) {
    this.init(el);
    this.inputEl = el.querySelector('input[type=text]')
    this.resetEl = el.querySelector('.btn-reset')
    this.showResetBtn(false);
    this.inputKeyUp();

    return this
}

FormView.showResetBtn = function (show = true) {
    this.resetEl.style.display = show ? 'block' : 'none'
}

FormView.inputKeyUp = function () {
    this.on('submit', e => e.preventDefault())
    this.inputEl.addEventListener('keyup', e => this.onkeyUp(e))

}

FormView.onkeyUp = function (e) {
    const enter = e.code === 'Enter'
    this.showResetBtn(e.target.value.length)
    if (!enter) return
    this.emit('@submit', {input: this.inputEl.value})
}

export default FormView

// 엔터를 입력하면 검색결과가 보인다 (컨트롤러에게 위임)

