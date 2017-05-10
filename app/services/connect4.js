import Ember from 'ember';

let player = 'red';
let board = [[0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0]];

export default Ember.Service.extend({
  checkYCord: function(xcord, ycord) {
    for(var y = 5; y > ycord; y--) {
      if(board[y][xcord] === 0)
        return y;
    }
    return ycord;
  },
  checkOpenPos: function(xcord, ycord){
    for(var y = 5; y > ycord; y--)
    {
      if(board[y][xcord] === 0)
        return y;
    }
    return ycord;
  },
  checkIfTaken: function(xcord, ycord){
    //return false true if its taken
    if(board[ycord][xcord] === 0)
    {
      return false;
    }
    else {
      return true;
    }
  },
  updateBoard: function(xcord, ycord)
  {
    board[ycord][xcord] = player;
  },
  getState: function(){
    return board;
  },
  changeColor: function(){
    if (player === 'red'){
      player = 'yellow';
    }else {
      player = 'red';
    }

  }

});
