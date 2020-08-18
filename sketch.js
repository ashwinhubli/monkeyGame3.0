//Global Variables
var bananaImage,obstacleImage,GroundImage;
var obstacleGroup;
var background,score;
var gameState = "start";
var backImage,startIMG,finalIMG;
var bananaGroup;
function preload(){
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")

player_rest  = loadImage("Monkey_08.png");
  
  
  
  
  
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("OIP (1).png");
  GroundImage = loadImage("ground.jpg");
  startIMG = loadImage("OIP (2).jpg");  
  finalIMG = loadImage("best.jpg");
}
function setup() {
  createCanvas(1350,600);
  backG = createSprite(300,30,20,20);
  backG.addImage(backImage);

  backG.velocityX = -3.8;
  backG.scale = 1.7;
  
  player = createSprite(100,80,10,10);
  //player.velocityX = 3;
  player.addAnimation("running",player_running);
  player.scale = 0.12
  
  invisibleground = createSprite(90,550,30,5)
  invisibleground.visible = false;

  
  score = 0;
  
 bananaGroup = new Group();
 obstacleGroup = new Group(); 
  
}


function draw(){
  if(gameState === "start"){
    image(startIMG,15,20,1500,1000);
    textSize(35);
    fill("gold");
    text("welcome to the forest of life!!!",425,200);
    textSize(30);
    fill("red");
    text("press the space bar to start",485,260);
    fill("green");
    text("Collect 30 bananas to win!",485,340);
    text("and",640,385);
    text("avoid hitting rocks in a row!!",485,430);
  }
  
  if(gameState === "play"){
 background(255,10,200); 
  
  if(score>2){
    image(finalIMG,20,145,900,300);
    backG.destroy();
    player.destroy();
    backG.scale = 1.7;
    bananaGroup.destroyEach(); 
    obstacleGroup.destroyEach();
    gameState = "end";
    textSize(35);
    fill("blue");
    text("you won!!!",400,260);
    textSize(35);
    text("gameOver",385,310);
}
if(player.scale<0.075){
  
  image(finalIMG,20,145,900,300);
  backG.destroy();
  player.destroy();
  backG.scale = 1.7;
  bananaGroup.destroyEach(); 
  obstacleGroup.destroyEach();
  gameState = "finish";  
  textSize(30);
  fill("red");
  text("you lose!!!",400,260);
  textSize(35);
  text("gameOver",385,310);
}  
   if (backG.x < 350){
//  image(backImage,200,0,1600,400);
    backG.x = backG.width/2;
  }
   if(keyDown(UP_ARROW) && player.y >= 159){
    player.velocityY = -2 ;
  }
  
 
 
  
  
  player.velocityY = player.velocityY + 0.3; 
  
  
  player.collide(invisibleground);
    
  
  switch(score){
    case 10:player.scale=0.14;
            break;
    case 20:player.scale=0.16;
            break;
    case 30:player.scale=0.18;
            break;
    case 40:player.scale=0.2;
            break; 
    case 50:player.scale = 0.2;
            break;
  }
  spawnObstacles();
  for (var i = 0; i < obstacleGroup.maxDepth(); i++) {
  
    var obstacle = obstacleGroup.get(i);
    
    if (obstacle != null && obstacle.isTouching(player)) {
      obstacle.destroy();
       player.scale = player.scale - 0.015;
      
    
      obstacleGroup.velocityX = 0;
      }  
   }
   
  bananas();
   for (var i = 0; i < bananaGroup.maxDepth(); i++) {
  
  var banana = bananaGroup.get(i);
  
  if (banana != null && banana.isTouching(player)) {
    score = score + 1;
    player.scale = 0.15;
    banana.destroy();
    
  }  

  }
  camera.position.x = player.x+400;
 //camera.position.y = backG.y+140; 
 if(gameState === "end"){
  backG.scale = 0.1;
  //bananaGroup.visibility = false;
  //obstacleGroup.visibility = false;
}
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:  "+score,player.x-100,50);



  count = 0;
  if(player.x >= 7000){
    if(score<30){
      text("You win!!!!!",7300,200);
      player.velocityX = 2;
    }
    else{
      text("You Lose!!!!!",7300,200);
    player.velocityX = 0;
    }  
  }
  
}


}
function bananas(){

if (frameCount % 125 === 0) {
    var banana = createSprite(1350,120,40,10);
    banana.y = Math.round(random(100 ,600));

    banana.addImage("banana",bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
  
     
    
    bananaGroup.add(banana);
     
  }

}
function spawnObstacles(){
if(frameCount % 140 === 0){
   var obstacle = createSprite(1350,120,40,10)
    obstacle.y = Math.round(random(100 ,550));
    obstacle.scale = 0.2;
    obstacle.velocityX = -11;
    obstacle.addImage("obstacle",obstacleImage);
     //assign lifetime to the variable
     obstacle.setCollider("rectangle",0,0,15,15);
 //    obstacle.debug = true;
 //    obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
    
}
}
function keyPressed(){
  if(keyCode = 32){
    gameState = "play";
  }
}