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

  function init() {
    c3.game.addResetNotification(c3.board.reset);
    c3.game.addResetNotification(c3.ui.run);
    c3.game.reset();
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
