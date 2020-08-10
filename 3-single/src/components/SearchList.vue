<template id="search-list">
    <ul class="search-list" v-if="itemList.length">
        <li v-for="item in itemList" :key="item.id">
            <img :src="item.image" :alt="item.name" />
            <span>{{item.name}}</span>
        </li>
    </ul>
</template>

<script>
    export default {
        props: ['list'],
        data() {
            return {
            }
        },
        methods: {

        },
        computed: {
            itemList: function () {
                return this.list;
            }
        }
    }
</script>
