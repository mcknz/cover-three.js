/*global jasmine, c3, describe, it, expect, beforeEach, loadFixtures, $ */
var help;
describe("App", function () {
  "use strict";
  it("runs", function () {
    expect(2 + 2).toBe(4);
  });
});

describe("piece", function () {
  "use strict";
  it("has no playerId when no piece", function () {
    expect(c3.isNone(help.getNoPiece().playerId)).toBe(true);
  });
  it("has correct playerId when player 1 piece", function () {
    expect(help.getPlayer1SmallPiece().playerId).toBe(c3.player1);
  });
  it("has correct playerId when player 2 piece", function () {
    expect(help.getPlayer2SmallPiece().playerId).toBe(c3.player2);
  });
  it("has small size when small piece", function () {
    expect(help.getPlayer1SmallPiece().size).toBe(c3.smallPiece);
  });
  it("has large size when large piece", function () {
    expect(help.getPlayer1LargePiece().size).toBe(c3.largePiece);
  });
  it("equals player 1 small piece when player 1 small piece", function () {
    expect(help.getPlayer1SmallPiece().equals(help.getPlayer1SmallPiece())).toBeTruthy();
  });
  it("equals player 2 small piece when player 2 small piece", function () {
    expect(help.getPlayer2SmallPiece().equals(help.getPlayer2SmallPiece())).toBeTruthy();
  });
  it("equals player 1 large piece when player 1 large piece", function () {
    expect(help.getPlayer1LargePiece().equals(help.getPlayer1LargePiece())).toBeTruthy();
  });
  it("equals player 2 large piece when player 2 large piece", function () {
    expect(help.getPlayer2LargePiece().equals(help.getPlayer2LargePiece())).toBeTruthy();
  });
});

describe("playerId", function () {
  "use strict";
  it("has player one id when created as player one", function () {
    expect(help.getPlayer1SmallPiece().playerId).toBe(c3.player1);
  });
  it("has player two id when created as player two", function () {
    expect(help.getPlayer2SmallPiece().playerId).toBe(c3.player2);
  });
});

describe("board", function () {
  "use strict";
  beforeEach(function () {
    c3.init(c3.game.getNew());
  });
  it("has square one empty on start", function () {
    expect(c3.board.getSquarePiece(0).equals(help.getNoPiece())).toBeTruthy();
  });
  it("can set square", function () {
    c3.board.setSquarePiece(0, help.getPlayer1SmallPiece(), c3.game);
    expect(help.boardSquareHasPiece(0, help.getPlayer1SmallPiece())).toBeTruthy();
  });
  it("can be restored", function () {
    c3.board.setSquarePiece(0, help.getPlayer1SmallPiece(), c3.game);
    var state = c3.game.get();
    c3.board.setSquarePiece(0, help.getPlayer2LargePiece(), c3.game);
    c3.game.set(state);
    expect(help.boardSquareHasPiece(0, help.getPlayer1SmallPiece())).toBeTruthy();
  });
});

help = (function () {
  "use strict";
  function getNoPiece() {
    return c3.piece(c3.none, c3.none);
  }

  function getPlayer1SmallPiece() {
    return c3.piece(c3.smallPiece, c3.player1);
  }

  function getPlayer2SmallPiece() {
    return c3.piece(c3.smallPiece, c3.player2);
  }

  function getPlayer1LargePiece() {
    return c3.piece(c3.largePiece, c3.player1);
  }

  function getPlayer2LargePiece() {
    return c3.piece(c3.largePiece, c3.player2);
  }

  function boardSquareHasPiece(index, piece) {
    return c3.board.getSquarePiece(index).equals(piece);
  }

  return {
    getPlayer1SmallPiece:getPlayer1SmallPiece,
    getPlayer2SmallPiece:getPlayer2SmallPiece,
    getPlayer1LargePiece:getPlayer1LargePiece,
    getPlayer2LargePiece:getPlayer2LargePiece,
    boardSquareHasPiece:boardSquareHasPiece,
    getNoPiece:getNoPiece
  };
}());


