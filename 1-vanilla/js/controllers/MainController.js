import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import TabView from '../views/TabView.js';
import KeywordView from '../views/KeywordView.js';
import HistoryView from '../views/HistoryView.js';

import SearchModel from "../models/SearchModel.js";
import KeywordModel from "../models/KeywordModel.js";
import HistoryModel from "../models/HistoryModel.js";

const tag = '[Main contorller]';

export default {
  init() {
    const formEl = document.querySelector('form');
    FormView.setup(formEl)
        .on('@submit', (e) => this.onSubmit(e.detail.input))
        .on('@reset', () => this.onFormReset())

    const searchListEl = document.querySelector('.search-list');
    ResultView.setup(searchListEl);

    const tabEl = document.querySelector('.tabs');
    TabView.setup(tabEl)
        .on('@change', () => this.renderView())

    const KeywordListEl = document.querySelector('.list');
    KeywordView.setup(KeywordListEl)
        .on('@click', e => this.searchKeyword(e));

    const historyListEl = document.querySelector('.history');
    HistoryView.setup(historyListEl)
        .on('@click', e => this.searchHisroty(e))
        .on('@remove', e => this.removeHistory(e))

    TabView.setActiveTab('최근 검색어');
    this.renderView();
  },

  renderView() {
    if (TabView.activeTab === '추천 검색어') {
      const keywordResult = KeywordModel.list();
      keywordResult.then(data => KeywordView.render(data));
      HistoryView.hide();
      KeywordView.show();
    } else {
      const historyResult = HistoryModel.list();
      historyResult.then(data => HistoryView.render(data));
      KeywordView.hide();
      HistoryView.show();
    }
    TabView.show();
  },

  removeHistory(e) {
    e.detail.target.closest('li').style.display = 'none';
    const { keyword } = e.detail.target.closest('li').dataset;
    HistoryModel.remove(keyword)
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
    this.search(val);
    HistoryModel.add(val)
  },
  searchKeyword(data) {
    const { input } = data.detail;
    this.search(input)
  },
  searchHisroty(data) {
    const { input } = data.detail;
    this.search(input)
  },
  searchSubmit() {
    TabView.hide();
    KeywordView.hide();
    HistoryView.hide();
  },
};
