// app/routes/application.js
import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get('session').fetch().catch(() => {});
  },
  actions: {
    accessDenied: function() {
      this.transitionTo('connect4');
    },
    signIn: function(provider) {
      this.get('session').open('firebase', {
        provider: provider
      }).then((data) => {
        let user = data.currentUser;
        console.log(user);
        // Do whatever with user
      });
    },
    signOut: function() {
      this.get('session').close();
      this.transitionTo('connect4')
    },
  },
});
