/*global c3 */

c3.piece = function (size, playerId) {
  "use strict";
  var type = "piece",
      content;

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
