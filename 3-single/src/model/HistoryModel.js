export default {
  data: [
    { keyword: '검색기록2', date: '12.03' },
    { keyword: '검색기록1', date: '12.02'},
    { keyword: '검색기록0', date: '12.01' },
  ],

  list() {
    return Promise.resolve(this.data)
  },

  add(keyword = '') {
    if (!keyword) return;
    if (this.data.some(val => val.keyword === keyword)) return;

    const date = '12.31';
    this.data.push({keyword, date})
  },

  remove(keyword) {
    this.data = this.data.filter(item => item.keyword !== keyword)
  }
}
