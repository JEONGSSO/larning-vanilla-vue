import View from '../views/View.js';

const tag = '[Search Result]';

const ResultView = Object.create(View);

ResultView.setup = function (el) {
  this.init(el);
  return this;
};

ResultView.message = {
  NO_RESULT : "검색결과가 없습니다."
};

ResultView.render = function (data = []) {
  this.el.innerHTML = data.length
      ? this.getSearchResultHtml(data)
      : this.message.NO_RESULT
};

ResultView.getSearchResultHtml = function (data) {
  return data.reduce((html, val) => {
    return html += `
      <li>
        <img src="${val.image}" alt="img"> 
        <p>${val.name}</p>
      </li>
    `
  }, '')
};


export default ResultView;
