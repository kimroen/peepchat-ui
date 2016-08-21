import Ember from 'ember';

const { Route, inject } = Ember;

export default Route.extend({
  session: inject.service(),
  flashMessages: inject.service(),

  model() {
    return {
      email: '',
      password: ''
    };
  },

  actions: {
    doLogin() {
      const user = this.get('currentModel');
      const flashMessages = this.get('flashMessages');

      this.get('session')
        .authenticate(
          'authenticator:peepchat', user.email, user.password
        )
        .then(() => {
          flashMessages.success('Logged in!');
        })
        .catch((response) => {
          if (typeof response === 'undefined') {
            return flashMessages.danger('Are you sure you have an internet connection?');
          }

          const { errors } = response;

          // If there's a 401-error in there
          if (errors.mapBy('code').indexOf(401) >= 0) {
            flashMessages
              .danger('There was a problem with your username or password, please try again.');
          } else {
            flashMessages.danger('Server error');
          }
        });
    }
  }
});
