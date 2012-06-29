var c3 = (function () {
  "use strict";
  var none = -1;

  function equals(one, other) {
    return one === other;
  }

  function isNone(value) {
    return equals(value, none);
  }

  function ensureType(type, obj) {
    if (type !== obj.type) {
      throw "invalid type: " +
          "expected '" + type + "', " +
          "received '" + obj.type + "'";
    }
  }

  function toInt(s) {
    return parseInt(s, 10);
  }

  function toSquare(piece) {
    ensureType("piece", piece);
    return c3.square(piece.size, piece.playerId);
  }

  function serialize(obj) {
    return JSON.stringify(obj);
  }

  function deserialize(s) {
    return JSON.parse(s);
  }

  function init(newGame) {
    c3.game.addResetNotification(c3.board.reset);
    c3.game.set(newGame);
  }

  return {
    none:none,
    player1:0,
    player2:1,
    smallPiece:0,
    largePiece:1,
    isNone:isNone,
    equals:equals,
    ensureType:ensureType,
    toInt:toInt,
    toSquare:toSquare,
    serialize:serialize,
    deserialize:deserialize,
    init:init
  };
}());




c3.board = (function (app) {
  "use strict";
  var pieces = [],
      rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

  function getWinningPlayerId(currentGame) {
    var rowCount = rows.length - 1,
        squares = currentGame.squares,
        playerId,
        rowDone;

    while (rowCount >= 0) {
      rowDone = false;
      while (!rowDone) {
        playerId = squares[rows[rowCount][0]].playerId;
        if (app.isNone(playerId)) {
          rowDone = true;
        } else {
          if (app.equals(playerId, squares[rows[rowCount][1]].playerId) &&
              app.equals(playerId, squares[rows[rowCount][2]].playerId)) {
            return playerId;
          } else {
            rowDone = true;
          }
        }
      }
      rowCount -= 1;
    }
    return app.none;
  }

  function getSquarePiece(index) {
    return pieces[index];
  }

  function setSquarePiece(index, piece, game) {
    pieces[index] = piece;
    game.saveSquare(index, app.toSquare(piece));
    game.saveCurrentPlayerId(
        app.equals(piece.playerId, app.player1) ? app.player2 : app.player1);
    game.saveWinningPlayerId(getWinningPlayerId(game.get()));
  }

  function toPiece(square) {
    app.ensureType("square", square);
    return app.piece(
        square.size,
        square.playerId
    );
  }

  function resetBoard(currentGame) {
    var squares = currentGame.squares,
        i;
    for (i = 0; i < 9; i += 1) {
      pieces[i] = toPiece(squares[i]);
    }
  }

  return {
    getSquarePiece:getSquarePiece,
    setSquarePiece:setSquarePiece,
    reset:resetBoard
  };
}(c3));




c3.game = (function (app) {
  "use strict";
  var type = "game",
      gameState = null,
      playerId = app.player1,
      squares = [],
      resetCallbacks = [],
      over = false,
      winningPlayerId = app.none;

  function updateState() {
    gameState = app.serialize({
      type:type,
      playerId:playerId,
      squares:squares,
      over:over,
      winningPlayerId:winningPlayerId
    });
  }

  function addResetNotification(callback) {
    resetCallbacks.push(callback);
  }

  function saveCurrentPlayerId(id) {
    playerId = id;
    updateState();
  }

  function saveSquare(index, square) {
    squares[index] = square;
    updateState();
  }

  function saveWinningPlayerId(playerId) {
    winningPlayerId = playerId;
    over = playerId !== app.none;
    updateState();
  }

  function getGame() {
    return app.deserialize(gameState);
  }

  function setGame(newGame) {
    var callbackCount = resetCallbacks.length - 1;
    app.ensureType(type, newGame);
    if (app.equals(gameState, app.serialize(newGame))) {
      return;
    }
    playerId = newGame.playerId;
    squares = newGame.squares;
    over = newGame.over;
    winningPlayerId = newGame.winningPlayerId;
    updateState();
    while (callbackCount >= 0) {
      resetCallbacks[callbackCount].call(null, newGame);
      callbackCount -= 1;
    }
  }

  function getNew() {
    var emptySquare = c3.square(app.none, app.none),
        i;

    for (i = 0; i < 9; i += 1) {
      squares[i] = emptySquare;
    }
    return {
      type:type,
      playerId:app.player1,
      squares:squares,
      over:false,
      winningPlayerId:c3.none
    };
  }

  return {
    get:getGame,
    set:setGame,
    getNew:getNew,
    saveCurrentPlayerId:saveCurrentPlayerId,
    saveSquare:saveSquare,
    addResetNotification:addResetNotification,
    saveWinningPlayerId:saveWinningPlayerId
  };
}(c3));



c3.piece = function (size, playerId) {
  "use strict";
  var type = "piece";

  function equals(other) {
    c3.ensureType(type, other);
    return c3.equals(size, other.size) &&
        c3.equals(playerId, other.playerId);
  }

  function getNextSize() {
    return size === c3.none ? c3.smallPiece : c3.largePiece;
  }

  return {
    type:type,
    size:size,
    playerId:playerId,
    equals:equals,
    getNextSize:getNextSize
  };
};



c3.player = function(id) {
  "use strict";
  var type = "player";

  function equals(other) {
    c3.ensureType(type, other);
    return c3.equals(id, other.id);
  }

  return {
    type:type,
    id:id,
    equals:equals
  };
};


c3.square = function(size, playerId) {
    "use strict";
    return {
        type:"square",
        playerId:playerId,
        size:size
    };
};