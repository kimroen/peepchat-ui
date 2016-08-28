import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    let parentComponent = this.get('_parentComponent');

    if (parentComponent && parentComponent._setupChildComponent) {
      parentComponent._setupChildComponent(this);
    }
  }
});
