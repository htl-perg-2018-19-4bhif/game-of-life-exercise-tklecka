window.onload = () => {
  const boardSize = 800;
  const entitySize = 4;
  const initPercent = 3;
  const gun = false;
  const entitiesPerLine = boardSize / entitySize;

  // Get reference to canvas
  const canvas = <HTMLCanvasElement>document.getElementById("canvas");
  canvas.width = canvas.height = boardSize;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(0, 0, 0, 1)";

  let gameArray = new Array(boardSize);
  create2DArray();
  generateInit();
  drawInitSituation();

  // Call 'draw' function whenever browser renders a frame on the screen
  window.requestAnimationFrame(draw);

  function play() {
    for (let i = 0; i < gameArray.length; i++) {
      for (let j = 0; j < gameArray.length; j++) {
        let canLive = canCellLive(i, j);
        if (canLive) {
          drawCell(i, j);
        }
      }
    }
  }

  function canCellLive(y: number, x: number) {
    const neighbours = numNeighbours(x, y);
    const cellAlive = gameArray[y][x];

    if (cellAlive && (neighbours < 2 || neighbours > 3)) {
      return false;
    }
    if (cellAlive && (neighbours === 2 || neighbours === 3)) {
      return true;
    }
    if (!cellAlive && neighbours === 3) {
      return true;
    }
  }

  function numNeighbours(x: number, y: number) {
    let num: number = 0;
    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; i <= x + 1; j++) {
        if ((x !== j || y !== i) && gameArray[i][j] === true) {
          num += 1;
        }
      }
    }
    return num;
  }

  function drawInitSituation() {
    for (let i = 0; i < gameArray.length; i++) {
      for (let j = 0; j < gameArray.length; j++) {
        drawCell(i, j);
      }
    }
  }

  function create2DArray() {
    for (let i = 0; i < entitiesPerLine; i++) {
      gameArray[i] = new Array(boardSize);
      for (let j = 0; j < entitiesPerLine; j++) {
        gameArray[i][j] = false;
      }
    }
  }

  function generateInit() {
    if (!gun) {
      let numEntities = entitiesPerLine * (initPercent / 100);
      let placedEntities = 0;
      while (placedEntities < numEntities) {
        let x = Math.floor(Math.random() * entitiesPerLine - 1);
        let y = Math.floor(Math.random() * entitiesPerLine - 1);
        if (gameArray[y][x] === false) {
          gameArray[y][x] = true;
          placedEntities++;
        }
      }
    } else {
      gameArray[1][5] = true;
      gameArray[1][6] = true;
      gameArray[2][5] = true;
      gameArray[2][6] = true;
      gameArray[11][5] = true;
      gameArray[11][6] = true;
      gameArray[11][7] = true;
      gameArray[12][4] = true;
      gameArray[12][8] = true;
      gameArray[13][3] = true;
      gameArray[13][9] = true;
      gameArray[14][3] = true;
      gameArray[14][9] = true;
      gameArray[15][6] = true;
      gameArray[16][4] = true;
      gameArray[16][8] = true;
      gameArray[17][5] = true;
      gameArray[17][6] = true;
      gameArray[17][7] = true;
      gameArray[18][6] = true;
      gameArray[21][3] = true;
      gameArray[21][4] = true;
      gameArray[21][5] = true;
      gameArray[22][3] = true;
      gameArray[22][4] = true;
      gameArray[22][5] = true;
      gameArray[23][2] = true;
      gameArray[23][6] = true;
      gameArray[25][1] = true;
      gameArray[25][2] = true;
      gameArray[25][6] = true;
      gameArray[25][7] = true;
      gameArray[35][3] = true;
      gameArray[35][4] = true;
      gameArray[36][3] = true;
      gameArray[36][4] = true;
    }
  }

  function drawCell(y: number, x: number) {
    ctx.fillRect(x * entitySize, y * entitySize, entitySize, entitySize);
  }

  function draw() {
    ctx.clearRect(0, 0, boardSize, boardSize);
    play();
    window.requestAnimationFrame(draw);
  }
};