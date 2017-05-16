import Ember from 'ember';
import $ from 'jquery';

var LIST_SELECTOR = "[data-chat='message-list']";

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
    drawMessage(event.data);
  },
  actions: {
    sendButtonPressed: function(message) {
      const socket = this.get('websockets').socketFor('ws://localhost:3001/');
      socket.send(message);
      this.set('message', '');
    }

  }
});

function drawMessage(message) {
  let $messageRow = $('<li>', {
    'class': 'message-row'
  });

  /*
  if (this.username === u) {
    $messageRow.addClass('me');
  }
  */

  let $message = $('<p>');

  $message.append($('<span>', {
    'class': 'message-message',
    text: message
  }));

  $messageRow.append($message);
  $(LIST_SELECTOR).append($messageRow);
  $messageRow.get(0).scrollIntoView();
}
