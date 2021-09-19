var car,carImg;
var block,blockImg;
var coin,coinImg;
var track,trackImg;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
carImg = loadImage("car.png");
blockImg = loadImage("block.png");
coinImg = loadImage("coin.png");
trackImg = loadImage("track.png");
}

function setup() {
 createCanvas(500,700);

 track = createSprite(250,50);
 track.addImage(trackImg);
 track.velocityY = -15;
 track.scale = 3;

 car = createSprite(257,100,250,250);
 car.addImage(carImg);
 car.scale = 0.3;

 coinGroup = new Group();
 blockGroup = new Group();

 car.setCollider("rectangle",0,0,250,450);
 car.debug = false;

 score = 0;
}

function draw() {
 background("blue");

 if(gameState === PLAY){
     if(track.y<0){
         track.y = track.width/2;
     }
 }
 if(keyDown("right_arrow")){
     car.x = car.x+7;
 }
 if(keyDown("left_arrow")){
     car.x = car.x + -7;
 }
 if(car.isTouching(coinGroup)){
     coinGroup.destroyEach();
     score = score+1;
 }
 spawnCoins();
 spawnBlocks();

 if(car.isTouching(blockGroup)){
     coinGroup.destroyEach();
     blockGroup.destroyEach();
     track.velocityX = 0;
     gameState = END;
 }
 else if(gameState === END){
     score = 0;

     stroke("black");
     fill("red");
     textSize(50);
     text("GAME OVER-YOU TRIED YOUR BEST",110,345);
 }
 drawSprites();

 stroke("black");
  fill("white");
  textSize(15);
  text("Score: "+ score, 100,50);
}

function spawnCoins(){
    if(frameCount % 150 === 0){
        var coin = createSprite(300,545,10,10);

        coin.x = Math.round(random(250,500));
        coin.y = Math.round(random(250,500));
        coin.addImage(coinImg);
        coin.scale = 0.1;
        coin.velocityY = -5;

        coin.lifetime = 250;

        coinGroup.add(coin);
    }
}

function spawnBlocks(){
    if(frameCount % 200 === 0){
        var block = createSprite(450,600,10,40);

        block.x = Math.round(random(300,400));
        block.y = Math.round(random(300,500));
        block.velocityY = -4;
        block.addImage(blockImg);

        block.scale = 0.2;
        block.lifetime = 250;
        
        blockGroup.add(block);
    }
}