//scoreboard element
var scoreBoard = document.getElementById('score')
var score = 0
var time = 30
gameOver = false

//timer function
setInterval(function timer(){
  time --
  if (time <= 0) {
    gameOver = true
  } else {
    }
}, 1000)

function newGame() {
  score = 0
  //add one second because 1 sec is used to reset
  time = 31
  gameOver = false
}


function setup() {
  //numbers in paratheses width and height of canvas
  var can = createCanvas(800, 550);
  //numbers in paratheses distance from (left,top)
  // and size of sprite(50x50)
  square = createSprite(500, 500, 50, 50);
  rectangle = createSprite(300,75,20,100);
  rectangle2 = createSprite(400,200,100,20);
  rectangle3 = createSprite(500,75,20,100);
  littleSquare = createSprite(600,300,25,25);
  littleSquare2 = createSprite(200,300,25,25);
}

function draw() {
  //.rectangle3.shapeColor = 'color'
  background(0, 10, 0);
  //new game on any key pressed after game over
  if (mouseIsPressed && gameOver) {
    console.log('mouse');
    newGame()
  }
  //either game over message or normal play depending on timer/gameover
  if (gameOver) {
    fill(51, 51, 255);
    textAlign(CENTER)
    textSize(30)
    text('Game Over Final Score: '+score+' => Click mouse to play again', 400, 200);

  } else {
    //scoreboard
    fill(51, 51, 255);
    textAlign(CENTER)
    textSize(20)
    text('Current Score is: '+score+' Time Left: '+time, 400, 20);

    //keeps player velocity/speed from getting too high
    square.maxSpeed = 3

    //movement functions
    //left key
    if(keyDown(37))
    {
      square.addSpeed(-1, 0)
    }
    //right key
    if(keyDown(39))
    {
      square.addSpeed(1, 0)
    }
    //down key
    if(keyDown(38))
    {
      square.addSpeed(-1, 90)
    }
    //up key
    if(keyDown(40))
    {
      square.addSpeed(1, 90)
    }

    //makes square bounce off edges of canvas
    if(square.position.x<0) {
      square.position.x = 1;
      square.velocity.x = abs(square.velocity.x);
    }

    if(square.position.x>width) {
      square.position.x = width-1;
      square.velocity.x = -abs(square.velocity.x);
      }

    if(square.position.y<0) {
        square.position.y = 1;
        square.velocity.y = abs(square.velocity.y);
      }

    if(square.position.y>height) {
        square.position.y = height-1;
        square.velocity.y = -abs(square.velocity.y);
      }

    //makes rectangles solid to square
    square.collide(rectangle);
    square.collide(rectangle2);
    square.collide(rectangle3);

    //gets new coordinates for littleSquares after they are hit
    function updateCoordinates() {
      littleSquare.position.y = floor(random(10, (width - 100) / 10)) * 10;
      littleSquare.position.x = floor(random(10, (height - 100) / 10)) * 10;
    }
    function updateCoordinates2() {
      littleSquare2.position.y = floor(random(10, (width - 100) / 10)) * 10;
      littleSquare2.position.x = floor(random(10, (height - 100) / 10)) * 10;
    }

    //if littleSquares random position places them outside of the canvas it will update again
    if(littleSquare.position.x<0 || littleSquare.position.x>width ||  littleSquare.position.y<0 || littleSquare.position.y>height) {
        updateCoordinates()
      }
    if(littleSquare2.position.x<0 || littleSquare2.position.x>width ||  littleSquare2.position.y<0 || littleSquare2.position.y>height) {
        updateCoordinates2()
      }

    //if square collides add point and move littlesquare to new spot
    if (square.collide(littleSquare) == true) {
      score ++
      updateCoordinates()
    }
    if (square.collide(littleSquare2) == true) {
      score ++
      updateCoordinates2()
    }

  //end of draw function-creates sprites
    drawSprites();
  }
}

//example of adding image to sprite circle.addImage(loadImage("assets/plain_circle.png"));
