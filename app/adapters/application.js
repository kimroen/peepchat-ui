import JSONAPIAdapter from 'ember-data/adapters/json-api';
import config from '../config/environment';

export default JSONAPIAdapter.extend({
  host: config.DS.host,
  namespace: config.DS.namespace
});
