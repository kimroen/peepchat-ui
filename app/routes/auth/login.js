import Ember from 'ember';

const { Route, inject } = Ember;

export default Route.extend({
  session: inject.service(),

  model() {
    return {
      email: '',
      password: ''
    };
  },

  actions: {
    doLogin() {
      const user = this.get('currentModel');
      this.get('session')
        .authenticate(
          'authenticator:peepchat', user.email, user.password
        );
    }
  }
});
