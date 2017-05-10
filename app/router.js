import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  /*
  this.authenticatedRoute('typer', function() {});

  this.route('typer', function() {
    this.route('typer');
  });
  */
  this.route('connect4');
  this.authenticatedRoute('chat');
});

export default Router;
