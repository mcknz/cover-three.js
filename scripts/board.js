/*global c3 */
/*jslint plusplus: true */

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
