/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  console.time("Find " + n + " rooks");
  // create matrix
  var board = new Board({ 'n': n });
  // iterate over each row (once per row)
  board.rows().forEach(function(row, rowIndex){
    row.forEach(function(val, valIndex){
      // toggle piece on current element
      board.togglePiece(rowIndex, valIndex);
      // see if any conflicts
      if (board.hasAnyRooksConflicts()) {
        // if so, remove piece
        board.togglePiece(rowIndex, valIndex);
      }
    });
  });

  var solution = board.rows();
  console.timeEnd("Find " + n + " rooks");

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  console.time("Count " + n + " rooks");
  var solutionCount = 0;
  var successfulSolutions = {};
  var piecesCount = 0;
  var board = new Board({'n': n});

  var checkRow = function(rowIndex, startColumn) {
    startColumn = startColumn || 0;

    if (!board._isInBounds(rowIndex, 0)) {
      if (piecesCount === n) {
        var matrix = JSON.stringify(board.attributes);
        if (!successfulSolutions.hasOwnProperty(matrix)) {
          successfulSolutions[matrix] = 1;
          solutionCount++;
        }
      }
      return;
    }

    var row = board.get(rowIndex);

    if (!row) { return; }
    for (var i = 0; i < row.length; i++){
      if (i < startColumn) {
        continue;
      }

      board.togglePiece(rowIndex, i);

      if (rowIndex > 0 && board.hasAnyRooksConflicts()) {
        board.togglePiece(rowIndex, i);
        continue;
      }

      piecesCount++;
      checkRow(rowIndex + 1);

      piecesCount--;
      board.togglePiece(rowIndex, i);
    }
  };

    _.range(n).forEach(function(col){
      piecesCount = 0;
      checkRow(0, col);
    });
  console.timeEnd("Count " + n + " rooks");

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  console.time("Find " + n + " queens");
  var solution;
  var piecesCount = 0;
  var board = new Board({ 'n': n });
  if ( n === 0) { solution = board.rows(); }

  var checkRow = function(rowIndex, startColumn){
    if(solution) { return; }
    startColumn = startColumn || 0;

    if (!board._isInBounds(rowIndex, 0)) {
      if (piecesCount === n) {
        solution = board.rows();
      }
      return;
    }

    var row = board.get(rowIndex);

    for (var i = 0; i < row.length; i++){
      if (i < startColumn) {
        continue;
      }

      board.togglePiece(rowIndex, i);

      if (rowIndex > 0 && board.hasAnyQueenConflictsOn(rowIndex, i)) {
        board.togglePiece(rowIndex, i);
        continue;
      }

      piecesCount++;
      checkRow(rowIndex + 1);

      //In case of only one, don't remove it from the board.
      if (n === 1) { continue; }
      piecesCount--;
      board.togglePiece(rowIndex, i);
    }
  }

  _.range(n).forEach(function(col){
    if (solution) {return;}
    checkRow(0, col);
  });

  console.timeEnd("Find " + n + " queens");
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  console.time("Count " + n + " queens");
  var solutionCount = 0;
  var successfulSolutions = {};
  var piecesCount = 0;  //pull this outside of the function
  var board = new Board({'n': n}); //pull this outside of the function

  var checkRow = function(rowIndex, startColumn) {
    startColumn = startColumn || 0;

    if (!board._isInBounds(rowIndex, 0)) {
      if (piecesCount === n) {
        var matrix = JSON.stringify(board.attributes);
        if (!successfulSolutions.hasOwnProperty(matrix)) {
          successfulSolutions[matrix] = 1;
          solutionCount++;
        }
      }
      return;
    }

    var row = board.get(rowIndex);

    if (!row) { return; }
    for (var i = 0; i < row.length; i++){
      if (i < startColumn) {
        continue;
      }

      board.togglePiece(rowIndex, i);

      if (rowIndex > 0 && board.hasAnyQueensConflicts()) {
        board.togglePiece(rowIndex, i);
        continue;
      }

      piecesCount++;
      checkRow(rowIndex + 1);

      piecesCount--;
      board.togglePiece(rowIndex, i);
    }
  };

    _.range(n).forEach(function(col){
      piecesCount = 0;
      checkRow(0, col);
    });
  console.timeEnd("Count " + n + " queens");

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
