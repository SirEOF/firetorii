import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.authenticatedRoute('test', function() {});

  this.route('test', function() {
    this.route('test');
  });
});

export default Router;
