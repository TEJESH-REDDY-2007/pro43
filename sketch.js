var backImage,backgr;
var player, player_running;
var ground,ground_img;
var FoodGroup, obstaclesGroup;
var bananaImage, obstacleImage, gameimg, gameovr;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  gameimg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  player.debug = true
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;

  gameovr = createSprite(400, 200);
  gameovr.addImage(gameimg);
  gameovr.scale = 0.6;
  gameovr.visible = false;

  FoodGroup = new Group();
  obstaclesGroup = new Group;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -20;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score = score + 2 ;
      player.scale += +0.01
    }

    if(obstaclesGroup.isTouching(player)){
      gameState = END;
    }
  }else if(gameState === END){

    backgr.velocityX = 0;
    player.visible = false;
    ground.visible = false;

    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    gameovr.visible = true
  }

  spawnFood();
  obstacles();

  drawSprites();
}


function spawnFood(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(900, 250, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
    banana.debug = true
  }
}


function obstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(900, 315, 60, 60);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;

    obstacle.lifetime = 300
    player.depth = obstacle.depth +1;
    obstaclesGroup.add(obstacle)
    obstacle.debug = true
  }
}