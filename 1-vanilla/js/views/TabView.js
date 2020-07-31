import View from '../views/View.js';

const tag = '[Tab View]';

const TabView = Object.create(View);

TabView.setup = function (el) {
    this.init(el);
    this.removeBtnEl = document.querySelectorAll('.btn-remove');
    this.eventBinder();
    return this;
};

TabView.eventBinder = function () {
    Array.from(this.removeBtnEl).forEach( e =>
        console.log(e)
    )
    // this.removeBtn.addEventListener('click', e => this.removeItem(e))
};

TabView.setActiveTab = function (tabName) {
    Array.from(this.el.querySelectorAll('li')).forEach(li =>
        li.className === tabName ? 'active' : ''
    );
};

TabView.removeItem = function (e) {
  this.emit('@click', {target: e.target});
};



export default TabView;
