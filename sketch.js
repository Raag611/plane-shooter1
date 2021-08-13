var PLAY = 1;
var END = 0;
var gameState = PLAY;

var plane1_IMG,plane1,plane1_collided
var BG_IMG,BG;

var cloudsGroup, cloudImage;
var asteroid,asteroidGroup, asteroid1,asteroid2,asteroid3,asteroid4;
var Ammo,AmmoIMG,AmmoGroup
var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  plane1_IMG =   loadAnimation("images/plane2.png");
  plane1_collided = loadAnimation("images/boom.png")
  
  BG_IMG = loadImage("spaceBG.jpg");
  
  AmmoIMG = loadImage("ammo2.png")

  asteroid1 = loadImage("asteroid1.png");
  asteroid2 = loadImage("asteroid2.png");
  asteroid3 = loadImage("asteroid3.png");
  asteroid4 = loadImage("images/asteroid4.png");
  
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1300, 700);

  plane1 = createSprite(50,560,20,50);
  
  plane1.addAnimation("running", plane1_IMG);
  plane1.addAnimation("collided", plane1_collided);
  plane1.scale = 0.5;

  gameOver = createSprite(500,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(500,240);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.3;

  gameOver.visible = false;
  restart.visible = false;
  
  //invisibleGround = createSprite(200,190,400,10);
  //invisibleGround.visible = false;
  
  //cloudsGroup = new Group();
  
  asteroidGroup = new Group();
  AmmoGroup = new Group();
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(BG_IMG);
  
  text("Score: "+ score, 700,90);

  if (keyDown("space")) {
   createAmmo()
  }
  
  
  if (gameState===PLAY){
   
    
  plane1.scale=1
  plane1.x = mouseX
  plane1.debug = true;
    spawnAsteroids();
   
         
  if(asteroidGroup.isTouching(AmmoGroup)){
    asteroidGroup.destroyEach();
    AmmoGroup.destroyEach();
    score=score+1;}
    

    if(asteroidGroup.isTouching(plane1)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    plane1.velocityX = 0;
    asteroidGroup.setVelocityXEach(0);
    
    
    //change the trex animation
    plane1.changeAnimation("collided",plane1_collided);
    plane1.scale=0.9
    //set lifetime of the game objects so that they are never destroyed
    asteroidGroup.setLifetimeEach(-1);
    ;
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}



function spawnAsteroids() {
  if(frameCount % 120 === 0) {
   
    var asteroid = createSprite(Math.round(random(1300, 10)),30, 10, 10)
    asteroid.debug = true;
    asteroid.velocityY = (6 + 3*score/100);
    
    
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: asteroid.addImage(asteroid1);
              break;
      case 2: asteroid.addImage(asteroid2);
              break;
      case 3: asteroid.addImage(asteroid3);
              break;
      case 4: asteroid.addImage(asteroid4);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    asteroid.scale = 0.3;
    asteroid.lifetime = 300;
    //add each obstacle to the group
    asteroidGroup.add(asteroid);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  asteroidGroup.destroyEach();
  

  plane1.changeAnimation("running",plane1_IMG);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
 console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}
function createAmmo() {
  var Ammo = createSprite(100, 415, 60, 10);
  Ammo.addImage(AmmoIMG);
  Ammo.x = 360;
  Ammo.x=plane1.x;
  Ammo.velocityY = -9;
  Ammo.lifetime = 150;
  Ammo.scale = 0.3;

  AmmoGroup.add(Ammo);
  
}
