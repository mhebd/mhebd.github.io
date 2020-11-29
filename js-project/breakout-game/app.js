const dom = {
  canvas : document.getElementById('canvas'),
  rules : document.getElementById('rules'),
  rulesShow : document.getElementById('show-rules'),
  rulesHide : document.getElementById('close'),
};



const rulesFuntionality = (() => {
  dom.rulesShow.addEventListener('click', () => dom.rules.classList.add('show'));

  dom.rulesHide.addEventListener('click', () => dom.rules.classList.remove('show'));
})();




const gameFunctionality = ( () => {

  // Get context 
  const ctx = dom.canvas.getContext('2d');
  let score = 0;

  const brickRowCount = 9;
  const brickColumnCount = 5;

  // Ball material
  const ball = {
    x: dom.canvas.width / 2,
    y: dom.canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
  };

  // Drow ball 
  function drowBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
  };

  // Paddel material
  const paddel = {
    x: dom.canvas.width / 2 - 40,
    y: dom.canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
  }

  // Drow paddel 
  function drowPaddel() {
    ctx.beginPath();
    ctx.rect(paddel.x, paddel.y, paddel.w, paddel.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
  }

  // Drow Score
  function drowScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score ${score}`, dom.canvas.width - 100, 30);
  }

  // Get brick info
  const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visibility: true,
  }

  // Creats Bricks 
  const bricks = [];
  for(i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for(j = 0; j < brickColumnCount; j++) {
      const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
      const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;

      bricks[i][j] = { x, y, ...brickInfo}
    }
  }

  // Drow bricks on canvas
  function drowBricks() {
    bricks.forEach(column => {
      column.forEach(brick => {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.w, brick.h);
        ctx.fillStyle = brick.visibility ? '#0095dd': 'transparent';
        ctx.fill();
        ctx.closePath();
      })
    })
  };

  // Moving paddel
  function movePaddel() {
    paddel.x += paddel.dx;

    // paddel right wall boundary
    if(paddel.x + paddel.w > dom.canvas.width) {
      paddel.x = dom.canvas.width - paddel.w;
    };

    // paddel left boundary
    if(paddel.x < 0) {
      paddel.x = 0;
    }
  }

  // Moving ball 
  function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Left & right wall boundary for ball
    if(
      ball.x + ball.size > dom.canvas.width || ball.x - ball.size < 0
      ) {
      ball.dx *= -1;
    };

    // Top & bottom wall baoudary for ball
    if(
      ball.y + ball.size > dom.canvas.height || ball.y - ball.size < 0
      ) {
      ball.dy *= -1;
    };

    // Paddel collision
    if(
      ball.x - ball.size > paddel.x && 
      ball.x + ball.size < paddel.x + paddel.w && 
      ball.y + ball.size > paddel.y
      ) {
        ball.dy = - ball.speed;
    };

    // Brick collision
    bricks.forEach(column => {
      column.forEach(brick => {
        if(brick.visibility) {
          if(
            ball.x - ball.size > brick.x &&
            ball.x + ball.size < brick.x + brick.w && 
            ball.y + ball.size > brick.y && ball.y - ball.size < brick.y + brick.h 
          ) {
          ball.dy *= -1;
          brick.visibility = false;
          increaseScore();
        }
        }
      })
    });

    // If paddel not collision with ball
    if(ball.y + ball.size > dom.canvas.height) {
      showAllBricks();
      score = 0;
    }
  }

  // Increase Score 
  function increaseScore() {
    score++;

    if(score % (brickRowCount * brickColumnCount) === 0) {
      showAllBricks();
    }
  }

  // Show all bricks 
  function showAllBricks() {
    bricks.forEach(colume => {
      colume.forEach(brick => brick.visibility = true)
    });
  }



  function drowing() {
    // Clear canvas
    ctx.clearRect(0,0, dom.canvas.width, dom.canvas.height);

    drowBall();
    drowPaddel();
    drowScore();
    drowBricks();
  };
  
  function update() {
    movePaddel();
    moveBall();
    drowing();
    requestAnimationFrame(update);
  };
  update();




  // All eventListener goes to here
  //=================================
  const eventListeners = ( () => {

    // Key down events 
    function keyDown(e) {
      if(e.key === 'Right' || e.key === 'ArrowRight') {
        paddel.dx = paddel.speed;
      } else if(e.key === 'Left' || e.key === 'ArrowLeft') {
        paddel.dx = -paddel.speed;
      }
    }

    // Key up events 
    function keyUp(e) {
      if(e.key === 'Right' || e.key === 'Left' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        paddel.dx = 0;
      }
    }

    // move paddel on wheel
    function movePaddelByWheel(e) {
      if(e.deltaY > 0 ) {
        paddel.dx = paddel.speed;
        setTimeout(() => {
          paddel.dx = 0;
        }, 400)
      } else if(e.deltaY < 0 ) {
        paddel.dx = -paddel.speed;
        setTimeout(() => {
          paddel.dx = 0;
        }, 400)
      }
    }



    function events() {
      document.addEventListener('keydown', keyDown);
      document.addEventListener('keyup', keyUp);
      document.addEventListener('wheel', movePaddelByWheel);
    };
    events();

  })();

})();


document.addEventListener('wheel', (e) => {
  // console.log(e);
})