/*global c3 */

c3.ui = {};

c3.ui = (function(app, board, game) {
  "use strict";
  var $;
  function getSquare(squareId){}
  function getSquareContent(squareId){}
  function setSquareContent(squareId, content){}
  function getBoardPiece(piece){}
  function setBoardSquare(squareId, pieceSize, playerId) {
    board.setSquarePiece(squareId, app.piece(pieceSize, playerId), game);
  }
  function paintSquare(squareId, piece) {
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

  function init(obj) {
    var copy = new obj.constructor(),
        attr;
    for (attr in ) {
      if (obj.hasOwnProperty(attr)) {
        this[attr] = obj[attr];
      }
            }
            return copy;
  }
    return {
        type:"square",
        playerId:playerId,
        size:size
    };
}(c3, c3.board, c3.game));
