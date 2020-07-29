import FormView from "../views/FormView.js";

const tag = '[Main contorller]'

export default {
    init() {
        const formEl = document.querySelector('form');
        FormView.setup(formEl)
            .on('@submit', e => console.log(e))
    },

}


