import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route, inject } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  flashMessages: inject.service(),

  actions : {
    logout() {
      this.get('session').invalidate();

      // TODO: This is kind of pointless because the session
      // invalidation above refreshes the browser before we get here
      this.get('flashMessages').success('Logged out');
    }
  }
});
