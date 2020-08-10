<template id="search-form">
    <form @submit.prevent="submit">
        <input type="text" v-model="value" @keyup="keyUp" placeholder="검색어" />
        <input type="reset" v-show="value" @click="reset" class="btn-reset" value="X" />
    </form>
</template>

<script>

import { eventBus } from "../main";

export default {
    props: ['onSubmit', 'onReset', 'onKeyUp'],
    data() {
        return {
            value: '',
        }
    },
    methods: {
        submit() {
            const qry = this.value;
            this.onSubmit(qry);
        },
        reset() {
            this.onReset();
        },
        keyUp() {
            if (this.value) return;
            this.onKeyUp();
        }
    },
    created() {
        eventBus.$on('@sync', val => {
            this.value = val;
        })
    }
}
</script>
