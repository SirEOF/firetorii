// app/routes/application.js
import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
      return this.get('session').fetch().catch(() => {});
    },

    actions: {
      signIn: function(provider) {
        this.get('session').open('firebase', { provider: provider }).then((data) => {
          let user = data.currentUser;
  		// Do whatever with user
        });
    },

    signOut: function() {
      this.get('session').close();
    },
  },
});
