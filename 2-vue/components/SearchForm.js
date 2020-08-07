export default {
    template: '#search-form',
    props: ['value'],
    data() {
        return {
            inputValue: this.value,
        }
    },
    methods: {
        submit() {
            this.$emit('form-submit', this.inputValue);
        },
        reset() {
            this.inputValue = '';
            this.$emit('form-reset');
        },
        keyUp(e) {
            if (e.target.value) return;
            this.$emit('form-keyup');
        }
    },
}
