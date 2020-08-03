import View from '../views/View.js';

const tag = '[Keyword View]';

const KeywordView = Object.create(View);

KeywordView.setup = function (el) {
    this.init(el);
    return this;
};

KeywordView.render = function (data) {
    this.el.innerHTML = this.getKeywordListHtml(data);
    this.bindClickEvent();
};

KeywordView.getKeywordListHtml = function (data) {
    return data.reduce((html, val, i) => {
        html += `
            <li data-keyword="${val.keyword}">
                <span class="number">${i + 1}</span>
                ${val.keyword}
            </li>
        ` ;
         return html;
    }, '');
};

KeywordView.bindClickEvent = function () {
    Array.from(this.el.querySelectorAll('li')).forEach(li =>
        li.addEventListener('click', e => this.clickKeyword(e))
    )
};

KeywordView.clickKeyword = function (e) {
    const { keyword } = e.target.dataset;
    this.emit('@click', {input: keyword })
};

export default KeywordView;
