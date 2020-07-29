import View from '../views/View.js';

const tag = '[Form View]';

const FormView = Object.create(View);

FormView.setup = function (el) {
  this.init(el);
  this.inputEl = el.querySelector('input[type=text]');
  this.resetEl = el.querySelector('.btn-reset');
  this.showResetBtn(false);
  this.inputKeyUp();

  return this;
};

FormView.showResetBtn = function (show = true) {
  this.resetEl.style.display = show ? 'block' : 'none';
};

FormView.inputKeyUp = function () {
  this.on('submit', (e) => e.preventDefault());
  this.inputEl.addEventListener('keyup', (e) => this.onkeyUp(e));
  this.resetEl.addEventListener('click', (e) => this.clickReset());
};

FormView.onkeyUp = function (e) {
  const enter = e.code === 'Enter';
  const inputEmpty = !e.target.value.length;
  this.showResetBtn(!inputEmpty);
  inputEmpty && this.emit('@reset');
  if (!enter) return;
  this.emit('@submit', { input: this.inputEl.value });
};

FormView.clickReset = function () {
  this.emit('@reset');
  this.showResetBtn(false);
};

export default FormView;
