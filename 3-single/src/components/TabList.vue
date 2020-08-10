export default {
    template: '#tablist',
    props: ['stab', 'list'],
    data() {
        return {
            itemList: this.list,
        }
    },
    methods: {
        clickSearch(keyword) {
            this.cs(keyword);
        }

    },
}
