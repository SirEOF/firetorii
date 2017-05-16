import Ember from 'ember';

let player = 'red';
let board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

export default Ember.Service.extend({
  websockets: Ember.inject.service(),
  checkYCord: function(xcord, ycord) {
    for (var y = 5; y > ycord; y--) {
      if (board[y][xcord] === 0)
        return y;
    }
    return ycord;
  },
  checkOpenPos: function(xcord, ycord) {
    for (var y = 5; y > ycord; y--) {
      if (board[y][xcord] === 0)
        return y;
    }
    return ycord;
  },
  checkIfTaken: function(xcord, ycord) {
    //return false true if its taken
    if (board[ycord][xcord] === 0) {
      return false;
    } else {
      return true;
    }
  },
  updateBoard: function(xcord, ycord) {
    board[ycord][xcord] = player;
  },
  getState: function() {
    return board;
  },
  changeColor: function() {
    if (player === 'red') {
      player = 'yellow';
    } else {
      player = 'red';
    }
  },
  checkVertical: function() {
    var currval = null;
    var preval = 0;
    var score = 0;

    for (var x = 0; x <= 6; x++) {
      for (var y = 0; y <= 5; y++) {
        currval = board[y][x];
        if (currval === preval && currval !== 0) {
          score += 1;
        } else {
          score = 0;
        }
        if (score == 3) {
          return true;
        }
        preval = currval;
      }
      score = 0;
      preval = currval;
    }
    return false;
  },
  checkHorizontal: function() {
    var currval = null;
    var preval = 0;
    var score = 0;

    for (var y = 0; y <= 5; y++) {
      for (var x = 0; x <= 6; x++) {
        currval = board[y][x];
        if (currval === preval && currval !== 0) {
          score += 1;
        } else {
          score = 0;
        }
        if (score == 3) {
          return true;
        }
        preval = currval;
      }
      score = 0;
      preval = currval;
    }
    return false;
  },
  checkDiagonal: function() {
    var x = null,
      y = null,
      xtemp = null,
      ytemp = null,
      currval = null,
      preval = 0,
      score = 0;

    // Test for down-right diagonals across the top.
    for (x = 0; x <= 6; x++) {
      xtemp = x;
      ytemp = 0;

      while (xtemp <= 6 && ytemp <= 5) {
        currval = board[ytemp][xtemp];
        if (currval === preval && currval !== 0) {
          score += 1;
        } else {
          // Reset the score if you find a gap.
          score = 0;
        }
        if (score === 3) {
          return true;
        }
        preval = currval;

        // Shift down-right one diagonal index.
        xtemp++;
        ytemp++;
      }
      // Reset the score and previous value when changing diagonals.
      score = 0;
      preval = 0;
    }

    // Test for down-left diagonals across the top.
    for (x = 0; x <= 6; x++) {
      xtemp = x;
      ytemp = 0;

      while (0 <= xtemp && ytemp <= 5) {
        currval = board[ytemp][xtemp];
        if (currval === preval && currval !== 0) {
          score += 1;
        } else {
          // Reset the score if you find a gap.
          score = 0;
        }
        if (score === 3) {
          return true;
        }
        preval = currval;

        // Shift down-left one diagonal index.
        xtemp--;
        ytemp++;
      }
      // Reset the score and previous value when changing diagonals.
      score = 0;
      preval = 0;
    }

    // Test for down-right diagonals down the left side.
    for (y = 0; y <= 5; y++) {
      xtemp = 0;
      ytemp = y;

      while (xtemp <= 6 && ytemp <= 5) {
        currval = board[ytemp][xtemp];
        if (currval === preval && currval !== 0) {
          score += 1;
        } else {
          // Reset the score if you find a gap.
          score = 0;
        }
        if (score === 3) {
          return true;
        }
        preval = currval;

        // Shift down-right one diagonal index.
        xtemp++;
        ytemp++;
      }
      // Reset the score and previous value when changing diagonals.
      score = 0;
      preval = 0;
    }

    // Test for down-left diagonals down the right side.
    for (y = 0; y <= 5; y++) {
      xtemp = 6;
      ytemp = y;

      while (0 <= xtemp && ytemp <= 5) {
        currval = board[ytemp][xtemp];
        if (currval === preval && currval !== 0) {
          score += 1;
        } else {
          // Reset the score if you find a gap.
          score = 0;
        }
        if (score === 3) {
          return true;
        }
        preval = currval;

        // Shift down-left one diagonal index.
        xtemp--;
        ytemp++;
      }
      // Reset the score and previous value when changing diagonals.
      score = 0;
      preval = 0;
    }

    // No diagonal wins found. Return false.
    return false;
  }
});
