/*global c3 */

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