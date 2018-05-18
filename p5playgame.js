// starting score and time
var score = 0
var time = 60
//for player to have same amount of time at reset need to account for 1 sec reset time
var resetTime = time+1
//bad squares starting speed
var speed = 1.4

gameOver = false

// timer function
setInterval(function timer(){
  time --
  if (time <= 0) {
    gameOver = true
  } else {
    }
}, 1000)

//new game function
function newGame() {
  //reloads the page
  window.location.reload();
}

function setup() {
  //numbers in paratheses width and height of canvas
  var can = createCanvas(800, 550);
  //numbers in paratheses distance from (left,top)
  // and size of sprite(50x50)
  //player sprite
  circle = createSprite(500, 450, 50, 50);
  //makes sprite a circle
  circle.draw = function() {
    //need first two zeros to center new circle over original sprite. second two numbers are size of new drawing
    ellipse(0,0,50,50,);
  }
  //sets collide detection shape to a circle shape instead of default square
  circle.setCollider('circle',0,0,25)
  //barrier sprites
   //row1
  rectangle = createSprite(300,75,20,100);
  rectangle2 = createSprite(500,75,20,100);
  rectangle3 = createSprite(400,200,100,20);
  rectangle4 = createSprite(700,75,20,100);
  rectangle5 = createSprite(600,200,100,20);
  rectangle6 = createSprite(100,75,20,100);
  rectangle7 = createSprite(200,200,100,20);
   //row2
  rectangle8 = createSprite(300,350,20,100);
  rectangle9 = createSprite(500,350,20,100);
  rectangle10 = createSprite(400,475,100,20);
  rectangle11 = createSprite(700,350,20,100);
  rectangle12 = createSprite(600,475,100,20);
  rectangle13 = createSprite(100,350,20,100);
  rectangle14 = createSprite(200,475,100,20);


  //point sprites
  littlesquare = createSprite(600,100,25,25);
  littlesquare2 = createSprite(200,300,25,25);

  //bad sprites
  bad = createSprite(600,300,50,50)
  bad2 = createSprite(200,100,50,50)
  bad3 = createSprite(600,100,50,50)
  bad4 = createSprite(200,300,50,50)
}

function draw() {
  //sprite colors
  circle.shapeColor = 'teal'
  littlesquare.shapeColor = 'aqua'
  littlesquare2.shapeColor = 'aqua'

  //canvas color
  background(0, 10, 0);

  bad.setSpeed(-(speed), 90)
  bad2.setSpeed(speed, 90)
  bad3.setSpeed(-(speed), 0)
  bad4.setSpeed(speed, 0)
  //new game on any key pressed after game over
  if (mouseIsPressed && gameOver) {
    newGame()
  }
  //either game over message or normal play depending on timer/gameover
  if (gameOver) {
    fill(51, 51, 255);
    textAlign(CENTER)
    textSize(30)
    text('Game Over! Final Score: '+score+' ~ Click mouse to play again', 400, 200);

  } else {
    //scoreboard
    fill(51, 51, 255);
    textAlign(CENTER)
    textSize(20)
    text('~ moving squares\' speed increases with points earned ~', 400, 20);
    text('current score is: '+score+'. time left: '+time, 400, 260);
    textSize(18)
    text('move using arrow keys ~ touch tiny squares (+1 point) ~ avoid moving squares (-1 point).' , 400, 540);

    //keeps player velocity/speed from getting too high
    circle.maxSpeed = 3

    //movement functions
    //left key
    if(keyDown(37))
    {
      circle.addSpeed(-1, 0)
    }
    //right key
    if(keyDown(39))
    {
      circle.addSpeed(1, 0)
    }
    //down key
    if(keyDown(38))
    {
      circle.addSpeed(-1, 90)
    }
    //up key
    if(keyDown(40))
    {
      circle.addSpeed(1, 90)
    }

    //makes circle bounce off edges of canvas
    if(circle.position.x<0) {
      circle.position.x = 1;
      circle.velocity.x = abs(circle.velocity.x);
    }

    if(circle.position.x>width) {
      circle.position.x = width-1;
      circle.velocity.x = -abs(circle.velocity.x);
      }

    if(circle.position.y<0) {
        circle.position.y = 1;
        circle.velocity.y = abs(circle.velocity.y);
      }

    if(circle.position.y>height) {
        circle.position.y = height-1;
        circle.velocity.y = -abs(circle.velocity.y);
      }

    //makes rectangles solid to circle
    circle.collide(rectangle);
    circle.collide(rectangle2);
    circle.collide(rectangle3);
    circle.collide(rectangle4);
    circle.collide(rectangle5);
    circle.collide(rectangle6);
    circle.collide(rectangle7);
    circle.collide(rectangle8);
    circle.collide(rectangle9);
    circle.collide(rectangle10);
    circle.collide(rectangle11);
    circle.collide(rectangle12);
    circle.collide(rectangle13);
    circle.collide(rectangle14);

    //gets new coordinates for littlesquares and bads after they are hit
    function updateCoordinates(name) {
      name.position.y = floor(random(10, (width) / 10)) * 10;
      name.position.x = floor(random(10, (height) / 10)) * 10;
    }

    //if littlesquares random position places them outside of the canvas it will update again
    if(littlesquare.position.x<0 || littlesquare.position.x>width ||  littlesquare.position.y<0 || littlesquare.position.y>height) {
        updateCoordinates(littlesquare)
      }
    if(littlesquare2.position.x<0 || littlesquare2.position.x>width ||  littlesquare2.position.y<0 || littlesquare2.position.y>height) {
        updateCoordinates(littlesquare2)
      }

    //when bads hit border they reappear at beginning
    if(bad.position.y<0){
      bad.position.y=height
    }
    if(bad2.position.y>height){
      bad2.position.y=0
    }
    if(bad4.position.x>width){
      bad4.position.x=0
    }
    if(bad3.position.x<0){
      bad3.position.x=width
    }

    //if circle collides add/remove points and move squares to new spot
    if (circle.collide(littlesquare) == true) {
      score ++
      //increase bad speed with each point
      speed += .2
      console.log(speed);
      updateCoordinates(littlesquare)
    }
    if (circle.collide(littlesquare2) == true) {
      score ++
      //increase bad speed with each point
      speed += .2
      console.log(speed);
      updateCoordinates(littlesquare2)
    }
    if (circle.collide(bad) == true) {
      score--
      updateCoordinates(bad)
    }
    if (circle.collide(bad2) == true) {
      score--
      updateCoordinates(bad2)
    }
    if (circle.collide(bad3) == true) {
      score--
      updateCoordinates(bad3)
    }
    if (circle.collide(bad4) == true) {
      score--
      updateCoordinates(bad4)
    }
  //end of draw function-creates sprites
    drawSprites();
  }
}
