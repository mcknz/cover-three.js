/*global c3 */
/*jslint plusplus: true */

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
