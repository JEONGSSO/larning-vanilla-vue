<template id="search-form">
    <form @submit.prevent="submit">
        <input type="text" v-model="inputValue" @keyUp="keyUp" placeholder="검색어">
        <input type="reset" v-show="inputValue" @click="reset" class="btn-reset" value="X">
    </form>
</template>

<script>
export default {
    props: ['value'],
    data() {
        return {
            inputValue: this.value,
        }
    },
    methods: {
        // submit() {
        //     this.$emit('form-submit', this.inputValue);
        // },
        // reset() {
        //     this.inputValue = '';
        //     this.$emit('form-reset');
        // },
        // keyUp(e) {
        //     if (e.target.value) return;
        //     this.$emit('form-keyup');
        // }
    },
}
</script>
