<template id="tablist">
    <ul class="list" v-if="itemList">
        <li v-for="(item, index) in itemList" :key="index" >
            <span v-if="stab === 'ad'" class="number"> {{index + 1}} </span>
            <span class="keyword" @click="clickSearch">{{item.keyword}}</span>
            <span v-if="stab === 'recent'" class="date">{{item.date}}</span>
            <button v-if="stab === 'recent'" class="btn-remove" @click="remove(index)"></button>
        </li>
    </ul>
</template>

<script>
    export default {
        props: ['tab', 'list', 'cs', 'onRemove'],
        data() {
            return {

            }
        },
        methods: {
            clickSearch(e) {
                this.cs(e);
            },
            remove(idx) {
              this.onRemove(idx)
            },

        },
        computed: {
            itemList: function () {
                return this.list;
            },
            stab: function() {
                return this.tab;
            }
        }
    }
</script>
