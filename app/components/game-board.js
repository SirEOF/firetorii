import Ember from 'ember';
import $ from 'jquery';


export default Ember.Component.extend({
  message: { board: '' },
  /* to talk to the server */
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
  },
  didInsertElement: function(){
    /*
    Ember.$('body').on('mousemove', function(e){
      Ember.$("#follow").css({
        left: e.pageX,
        top: e.pageY
      });
    });
    */
  },
  player1: true,
  connect4: Ember.inject.service(),
  actions: {
    dothis: function() {
      let element = this.$(event.target);
      let ycord = this.$('.board tr').index(element.closest('tr'));
      let xcord = element.closest('tr').find('td').index(element.closest('td'));
      //element.addClass("yellow");
      console.log("x-coordinate ", xcord);
      console.log("y-coordinate ", ycord);

      ycord = this.get('connect4').checkOpenPos(xcord,ycord);
      console.log("drop in ", ycord);

      //if the button clicked is already taken then dont do anything
      if(this.get('connect4').checkIfTaken(xcord, ycord)){
        alert('This position is taken already');
        return;
      }

      this.get('connect4').updateBoard(xcord, ycord);

      if(this.get('player1'))
      {
        this.set('player1', false);
      }
      else{
        this.set('player1', true);
      }
      //make new board
      var board = this.get('connect4').getState();
      for(var y = 0; y<=5; y++) {
        for(var x = 0; x <=6; x++){
          if (board[y][x] != 0){
            var cell = this.$("tr:eq(" + y +")").find('td').eq(x);
            cell.children('button').addClass(board[y][x]);
          }
        }
      }
      this.get('connect4').changeColor();
      var socket = this.get('websockets').socketFor('ws://localhost:3001/');
      socket.send(this.get('connect4').getState());
      //this.$("#follow > button").attr('', 'yellow');
    },
    sendButtonPressed: function(message) {
      var socket = this.get('websockets').socketFor('ws://localhost:3001/');
      socket.send(message);
      this.set('message', '');
    }
  }
});
