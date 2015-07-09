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
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var successfulSolutions = {};

  var testSolution = function(startRow, startColumn) {
    var piecesCount = 0;
    var board = new Board({'n': n});
    board.rows().forEach(function(row, rowIndex){
      row.forEach(function(val, valIndex){
        // toggle piece on current element
        if (rowIndex !== startRow || valIndex >= startColumn) {
          board.togglePiece(rowIndex, valIndex);
          piecesCount++;
          // see if any conflicts
          if (board.hasAnyRooksConflicts()) {
            // if so, remove piece
            board.togglePiece(rowIndex, valIndex);
            piecesCount--;
          }
        }
      });
    });

    if (piecesCount === n) {
      var matrix = JSON.stringify(board.rows());
      console.log(matrix);
      if (!successfulSolutions.hasOwnProperty(matrix)) {//This should be in parens, not square brackets.
        successfulSolutions[matrix] = 1;
        return true;
      }
    }

    return false;
  };

  _.range(n).forEach(function(row){
    _.range(n).forEach(function(col){
      if (testSolution(row, col)) {
        solutionCount++;
      }
    });
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
