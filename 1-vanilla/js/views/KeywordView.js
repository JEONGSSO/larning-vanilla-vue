import View from '../views/View.js';

const tag = '[Keyword View]';

const KeywordView = Object.create(View);

KeywordView.setup = function (el) {
    this.init(el);
    return this;
};

KeywordView.render = function (data) {
    this.el.innerHTML = this.getKeywordListHtml(data);
};

KeywordView.getKeywordListHtml = function (data) {
    return data.reduce((html, val, i) => {
        html += `
            <li>
                <span class="number">${i + 1}</span>
                ${val.keyword}
            </li>
        ` ;
         return html;
    }, '');
};

export default KeywordView;
