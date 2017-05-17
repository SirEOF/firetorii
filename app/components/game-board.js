import Ember from 'ember';


export default Ember.Component.extend({
  /* to talk to the server */
  player: '',
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
  //handler that handles incoming messages from server
  myMessageHandler: function(event) {
    var recvMessage = JSON.parse(event.data);
    var player = recvMessage.playerTurn;
    this.set('player', player);
    this.updateTheBoard(JSON.parse(recvMessage.serverBoard));
  },
  updateTheBoard: function(board) {
    console.log("updating from server : " + board)
    this.get('connect4').setBoard(board);
    for (var y = 0; y <= 5; y++) {
      for (var x = 0; x <= 6; x++) {
        if (board[y][x] != 0) {
          var cell = this.$("tr:eq(" + y + ")").find('td').eq(x);
          cell.children('button').addClass(board[y][x]);
        }
      }
    }
    this.checkWin();
  },
  checkWin: function(){
        if (this.get('connect4').checkVertical() || this.get('connect4').checkHorizontal() || this.get('connect4').checkDiagonal()) {
          var winningPlayer = '';
          if (this.get('player') == 'red')
            winningPlayer = 'YELLOW';
          else
            winningPlayer = 'RED';
          Ember.$(':button').prop('disabled', true);
          Ember.$('#player').text(winningPlayer + " WINS").css({
            "font-weight": "bold",
            "color": "pink"
          });
      }
  },
  connect4: Ember.inject.service(),
  actions: {
    dothis: function() {
      let element = this.$(event.target);
      let ycord = this.$('.board tr').index(element.closest('tr'));
      let xcord = element.closest('tr').find('td').index(element.closest('td'));
      ycord = this.get('connect4').checkOpenPos(xcord, ycord);

      //if the button clicked is already taken then dont do anything
      if (this.get('connect4').checkIfTaken(xcord, ycord)) {
        alert('This position is taken already');
        return;
      }

      //update the local board in local storage
      this.get('connect4').updateBoard(xcord, ycord, this.get('player'));

      var socket = this.get('websockets').socketFor('ws://localhost:3001/');
      var sendboard = this.get('connect4').getState();
      sendboard = JSON.stringify(sendboard);
      socket.send(sendboard);
    }
  }
});
