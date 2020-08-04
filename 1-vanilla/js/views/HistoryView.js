import View from '../views/View.js';

const tag = '[History View]';

const HistoryView = Object.create(View);

HistoryView.setup = function (el) {
    this.init(el);
    return this;
};

HistoryView.render = function (data) {
    this.el.innerHTML = this.getHistoryListHtml(data);
    this.bindClickEvent();
};

HistoryView.getHistoryListHtml = function (data) {
    return data.reduce((html, val) => {
        html += `
            <li data-keyword="${val.keyword}">
                <span class="date">${val.date}</span>
                ${val.keyword}
                <button class="btn-remove"></button>
            </li>
        ` ;
         return html;
    }, '');
};

HistoryView.bindClickEvent = function () {
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.addEventListener('click', e => this.clickHistory(e))
        li.querySelector('button').addEventListener('click', e => this.removeHistory(e))
    })
};

HistoryView.clickHistory = function (e) {
    const { keyword } = e.target.dataset;
    keyword && this.emit('@click', {input: keyword})
};

HistoryView.removeHistory = function (e) {
    this.emit('@remove', {target: e.target})
};

export default HistoryView;
