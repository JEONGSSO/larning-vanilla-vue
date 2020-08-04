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
    Array.from(this.removeBtnEl).forEach(e =>
        e.addEventListener('click', e => this.removeItem(e))
    )
    Array.from(this.el.querySelectorAll('li')).forEach(li =>
        li.addEventListener('click', e => this.setActiveTab(e.target.innerHTML))
    );
};

TabView.setActiveTab = function (tabName) {
    this.activeTab = tabName;
    Array.from(this.el.querySelectorAll('li')).forEach(li =>
        li.className = li.innerHTML === tabName ? 'active' : ''
    );
    this.emit('@change', {name: tabName});
};

TabView.removeItem = function (e) {
  this.emit('@click', {target: e.target});
};



export default TabView;
