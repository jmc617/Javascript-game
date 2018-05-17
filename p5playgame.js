// starting score and time
var score = 0
var time = 30
gameOver = false

// timer function
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
  //player sprite
  square = createSprite(500, 500, 50, 50);
  //barrier sprites

  rectangle = createSprite(300,75,20,100);
  rectangle2 = createSprite(500,75,20,100);
  rectangle3 = createSprite(400,200,100,20);
  rectangle4 = createSprite(700,75,20,100);
  rectangle5 = createSprite(600,200,100,20);
  rectangle6 = createSprite(100,75,20,100);
  rectangle7 = createSprite(200,200,100,20);

  rectangle8 = createSprite(300,350,20,100);
  rectangle9 = createSprite(500,350,20,100);
  rectangle10 = createSprite(400,475,100,20);
  rectangle11 = createSprite(700,350,20,100);
  rectangle12 = createSprite(600,475,100,20);
  rectangle13 = createSprite(100,350,20,100);
  rectangle14 = createSprite(200,475,100,20);

  //point sprites
  littleSquare = createSprite(600,300,25,25);
  littleSquare2 = createSprite(200,300,25,25);
}

function draw() {
  square.shapeColor = 'teal'
  littleSquare.shapeColor = 'aqua'
  littleSquare2.shapeColor = 'aqua'
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
    textSize(18)
    text('Move square using arrow keys. Hit the tiny squares as many times as possible before time runs out' , 400, 540);

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
    square.collide(rectangle4);
    square.collide(rectangle5);
    square.collide(rectangle6);
    square.collide(rectangle7);
    square.collide(rectangle8);
    square.collide(rectangle9);
    square.collide(rectangle10);
    square.collide(rectangle11);
    square.collide(rectangle12);
    square.collide(rectangle13);
    square.collide(rectangle14);

    //gets new coordinates for littleSquares after they are hit
    function updateCoordinates() {
      littleSquare.position.y = floor(random(10, (width) / 10)) * 10;
      console.log(width);
      console.log(floor(random(10, (width - 100) / 10)) * 10);
      littleSquare.position.x = floor(random(10, (height) / 10)) * 10;
    }
    function updateCoordinates2() {
      littleSquare2.position.y = floor(random(10, (width) / 10)) * 10;
      console.log(floor(random(10, (width - 100) / 10)) * 10);
      littleSquare2.position.x = floor(random(10, (height) / 10)) * 10;
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
