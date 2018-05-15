function setup() {
  //numbers in paratheses width and height of canvas
  createCanvas(800,500);
  //numbers in paratheses distance from (left,top)
  // and size of sprite(50x50)
  square = createSprite(600, 100, 50, 50);
  rectangle = createSprite(500,100,100,50);
  rectangle2 = createSprite(500,100,50,100);
}

function draw() {
  background(195, 193, 242);
  square.maxSpeed = 3
  //left key
  if(keyDown(37))
  {
    square.addSpeed(-1, 0)
    console.log('left');
  }
  //right key
  if(keyDown(39))
  {
    square.addSpeed(1, 0)
    console.log('right');
  }
  //down key
  if(keyDown(38))
  {
    square.addSpeed(-1, 90)
    console.log('down');
  }
  //up key
  if(keyDown(40))
  {
    square.addSpeed(1, 90)
    console.log('up');
  }

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

    square.collide(rectangle);
    square.displace(rectangle2);

  //end of draw function-creates sprites
  drawSprites();
}

//example of adding image to sprite circle.addImage(loadImage("assets/plain_circle.png"));
