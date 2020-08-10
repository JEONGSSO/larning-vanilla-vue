<template>
  <div id="app" class="container">
    <SearchForm
      :onSubmit="onSubmit"
      :onReset="onReset"
      :onKeyUp="onKeyUp"
    ></SearchForm>
    <div class="tab_wrap" v-show="!isSearch">
      <ul class="tabs">
        <li class="ad" @click="switchTab" :class="{ active : activeTab === 'ad'}">추천 검색어</li>
        <li class="recent" @click="switchTab" :class="{ active : activeTab === 'recent'}">최근 검색어</li>
      </ul>
      <TabList v-show="!isSearch"
        :tab="activeTab"
        :list="activeTab === 'ad' ? keywordList : historyList"
        :cs="clickSearch"
        :onRemove="onRemove"
      ></TabList>
    </div>
    <SearchList v-show="isSearch"
      :list="list"
    ></SearchList>
  </div>
</template>

<script>
import SearchForm from './components/SearchForm'
import SearchList from './components/SearchList'
import TabList from './components/TabList'

import SearchModel from "./model/SearchModel";
import HistoryModel from "./model/HistoryModel";
import KeywordModel from "./model/KeywordModel";

import { eventBus } from "./main";

export default {
  name: 'App',
  components: {
    SearchForm,
    SearchList,
    TabList,
  },
  data() {
    return {
      query : '',
      list: [],
      isSearch: false,
      activeTab: 'ad',
      keywordList: [],
      historyList: [],
    }
  },
  methods: {
    onSubmit(qry) {
      this.search(qry);
      this.query = qry;
      this.isSearch = true;
    },
    search(qry = this.query) {
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
      eventBus.$emit('@sync', this.query)
      this.isSearch = true;
      this.search();
    },
    onReset() {
      this.query = '';
      this.list = [];
      this.isSearch = false;
    },
    onKeyUp() {
      this.isSearch = false;
    },
  },
  mounted() {
    KeywordModel.list().then(val => this.keywordList = val);
    HistoryModel.list().then(val => this.historyList = val);
  },
}
</script>

<style src="@/assets/css/app.css"></style>
