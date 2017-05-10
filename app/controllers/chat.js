import Ember from 'ember';

export default Ember.Controller.extend({
  message: '',

  init: function() {
    this._super();
    var socket = this.get('websockets').socketFor('ws://localhost:3001/');
    socket.on('open', this.myOpenHandler, this);
    socket.on('message', this.myMessageHandler, this);
    socket.on('close', function(event) {
        console.log('closed');
    }, this);
  },

  myOpenHandler: function(event) {
    console.log('On open event has been called: ' + event);
  },

  myMessageHandler: function(event) {
    console.log('Message: ' + event.data);
    //this.set('message',event.data);
  },

  actions: {
    sendButtonPressed: function(message) {
      var socket = this.get('websockets').socketFor('ws://localhost:3001/');
      socket.send(message);
      this.set('message', '');
    }

  }
});
