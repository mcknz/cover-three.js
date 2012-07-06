/*global c3 */

c3.ui = (function(app, board, game) {
  "use strict";
  var $;

  function Core($) {
    this.app = app;
    this.board = board;
    this.game = game;
  }

  Core.prototype.getSquare = function(squareId){};
  Core.prototype.getSquareContent = function(squareId){};
  Core.prototype.setSquareContent = function(squareId, content){};
  Core.prototype.getBoardPiece = function(piece){};
  Core.prototype.setBoardSquare = function(squareId, pieceSize, playerId) {
      board.setSquarePiece(squareId, app.piece(pieceSize, playerId), game);
  };
  Core.prototype.paintSquare function paintSquare(squareId, piece) {
      set
      var square = document.getElementById("s" + squareId),
              content;

          if (app.isNone(newPiece.size)) {
            content = "&nbsp;";
          } else {
            content = '<img src="images/piece' + newPiece.size + '_player' + newPiece.playerId + '.svg" />';
          }
          $.setInnerHTML(square, content);
    }
    function disableSquare(squareId) {}
    function disableBoard() {}
    function setMessage(msg) {}
    function changePlayerTurn(playerId) {}
    function hitSquare(squareId) {}
    function setup() {}
  };

  function init(lib, sub) {
    var ui = new core()
    $ = lib;

  }

}(c3, c3.board, c3.game));

