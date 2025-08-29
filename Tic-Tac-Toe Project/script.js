document.addEventListener('DOMContentLoaded', () => {
  const cells = Array.from(document.querySelectorAll('.cell'));
  const statusText = document.getElementById('status');
  const resetBtn =
    document.getElementById('resetBtn') || document.getElementById('reset');
  let currentPlayer = 'X';
  let board = Array(9).fill('');
  let running = true;
  const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  cells.forEach(c => c.addEventListener('click', onCellClick));
  if (resetBtn) resetBtn.addEventListener('click', resetGame);
  if (statusText) statusText.textContent = `Player ${currentPlayer}'s turn`;
  function onCellClick(e) {
    const i = +e.currentTarget.dataset.index;
    if (!running || board[i]) return;

    board[i] = currentPlayer;
    e.currentTarget.textContent = currentPlayer;
    checkWinner();
  }
  function checkWinner() {
    let won = false;
    for (const [a,b,c] of winConditions) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        won = true;
        highlight([a,b,c]);
        break;
      }
    }
    if (won) {
      running = false;
      if (statusText) statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
      return;
    }
    if (!board.includes('')) {
      running = false;
      if (statusText) statusText.textContent = `😐 It's a draw!`;
      return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (statusText) statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
  function highlight(idxs) {
    idxs.forEach(i => {
      cells[i].style.background = 'rgba(70,194,169,0.7)';
      cells[i].style.animation = 'strike 0.5s infinite alternate';
    });
  }
  function resetGame() {
    board.fill('');
    running = true;
    currentPlayer = 'X';
    if (statusText) statusText.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(c => {
      c.textContent = '';
      c.style.background = 'rgba(255,255,255,0.1)';
      c.style.animation = 'none';
    });
    const strike = document.getElementById('strike');
    if (strike && strike.getContext) {
      const ctx = strike.getContext('2d');
      ctx.clearRect(0, 0, strike.width, strike.height);
    }
  }
});
