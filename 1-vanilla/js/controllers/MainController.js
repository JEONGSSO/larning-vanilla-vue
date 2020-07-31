import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import TabView from '../views/TabView.js';

import SearchModel from "../models/SearchModel.js";

const tag = '[Main contorller]';

export default {
  init() {
    this.renderView();
  },

  renderView() {
    const formEl = document.querySelector('form');
    FormView.setup(formEl)
        .on('@submit', (e) => this.onSubmit(e.detail.input))
        .on('@reset', (e) => this.onFormReset())

    const searchListEl = document.querySelector('.search-list');
    ResultView.setup(searchListEl);

    const tabEl = document.querySelector('.tabs');
    TabView.setup(tabEl)
        .on('@click', (e) => this.onTabRemove(e))

  },

  onTabRemove(e) {

  },

  search (qry) {
    const getSearch = SearchModel.list(qry);
    getSearch.then(data => {
      this.searchResultRender(data)
    })
  },
  searchResultRender (data) {
    ResultView.show();
    ResultView.render(data)
  },
  onFormReset () {
    ResultView.hide();
  },
  onSubmit (value) {
    this.search()
  },
};
