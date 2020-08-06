import SearchModel from './SearchModel.js';

new Vue({
    el: '#app',
    data: {
        query : '',
        list: [],
        activeTab: 'ad',
    },
    methods: {
        search() {
            const qry = this.query;
            SearchModel.list(qry).then(val => this.list = val)
        },
        onReset(e) {
            this.query = '';
            this.list = [];
        },
        onSubmit(e) {
            e.preventDefault();
            this.search();
        },
        switchTab({target}) {
            this.activeTab = target.classList[0];
        },
    },
});
