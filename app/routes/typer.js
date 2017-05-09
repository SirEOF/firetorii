import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get('session').fetch().catch(() => {});
  },
  model() {
    //var randNum = Math.floor((Math.random() * 7) + 1);
    /*return this.get('store').findAll('paragraphs').data;*/
  }
});
