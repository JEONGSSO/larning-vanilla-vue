import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import TabView from '../views/TabView.js';
import KeywordView from '../views/KeywordView.js';

import SearchModel from "../models/SearchModel.js";
import KeywordModel from "../models/KeywordModel.js";
import HistoryModel from "../models/HistoryModel.js";

const tag = '[Main contorller]';

export default {
  init() {
    const formEl = document.querySelector('form');
    FormView.setup(formEl)
        .on('@submit', (e) => this.onSubmit(e.detail.input))
        .on('@reset', (e) => this.onFormReset())

    const searchListEl = document.querySelector('.search-list');
    ResultView.setup(searchListEl);

    const tabEl = document.querySelector('.tabs');
    TabView.setup(tabEl)
        .on('@click', (e) => this.onTabRemove(e))

    const KeywordListEl = document.querySelector('.list');
    KeywordView.setup(KeywordListEl)
        .on('@click', e => this.searchKeyword(e));

    TabView.setActiveTab('추천 검색어');
    this.renderView();
  },



  renderView() {
    if (TabView.activeTab === '추천 검색어') {
      const keywordResult = KeywordModel.list();
      keywordResult.then(data => KeywordView.render(data));
    } else {

    }
    TabView.show();
    KeywordView.show();
  },

  onTabRemove(e) {
    e.detail.target.closest('li').style.display = 'none';
  },

  search (qry) {
    this.searchSubmit();
    FormView.setValue(qry);
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
    this.renderView();
  },
  onSubmit (val) {
    this.search(val)
  },
  searchKeyword(data) {
    const { input } = data.detail;
    this.search(input)
  },
  searchSubmit() {
    TabView.hide();
    KeywordView.hide();
  },
};
