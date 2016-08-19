import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant2';
import config from '../config/environment';

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: `${config.DS.host}/${config.DS.namespace}/token`
});
