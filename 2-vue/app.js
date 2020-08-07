import SearchModel from './model/SearchModel.js';
import KeywordModel from './model/KeywordModel.js';
import HistoryModel from './model/HistoryModel.js';

import SearchForm from './components/SearchForm.js';
import SearchList from './components/SearchList.js';
import Keyword from './components/Keyword.js';
import History from './components/History.js';

new Vue({
    el: '#app',
    components: {
        SearchForm,
        SearchList,
        Keyword,
        History,
    },
    data: {
        query : '',
        list: [],
        isSearch: false,
        activeTab: 'ad',
        keywordList: [],
        historyList: [],
    },
    methods: {
        onSubmit(qry) {
            this.search(qry);
            this.query = qry;
            this.isSearch = true;
        },
        search() {
            const qry = this.query;
            SearchModel.list(qry).then(val => this.list = val)
            HistoryModel.add(qry);
            HistoryModel.list().then(val => this.historyList = val)
        },
        onRemove(index) {
            const item = this.historyList[index];
            HistoryModel.remove(item.keyword);
            this.historyList.splice(index, 1);
        },
        switchTab({ target }) {
            this.activeTab = target.classList[0];
        },
        clickSearch(e) {
            this.query = e.target.innerText;
            this.isSearch = true;
            this.search();
        },
        onReset(e) {
            this.query = '';
            this.list = [];
            this.isSearch = false;
        },
        onKeyUp() {
            this.isSearch = false;
        }
    },
    mounted () {
        KeywordModel.list().then(val => this.keywordList = val)
        HistoryModel.list().then(val => this.historyList = val)
    },
});
