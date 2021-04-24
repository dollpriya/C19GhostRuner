var tower, towerImg;
var door, doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost,ghostImg;
var invBlk,invBlkGroup;
var gameState="play";
var score=0;






function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav")
}


function setup(){
  createCanvas(600,600)
  
  spookySound.loop();
  
  tower= createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  
  
  doorsGroup=new Group()
  climbersGroup=new Group()
  invBlkGroup=new Group()
  
  
  ghost= createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
}



function draw(){
  background(0);
  
  if(gameState==="play"){
    
    score+=Math.round(getFrameRate()/60);
    
    if(tower.y > 400){
    tower.y=300;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.6;
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invBlkGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  
  
  
  
  spawnDoors();
  
  drawSprites();
  fill("red");
  text("SCORE-"+score,tower.width/2,tower.height/2-50);
    
  }
  
  if(gameState==="end"){
    spookySound.stop();
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER",230,250);
    
  }
  
  
  
  
  
  
  
  
  
  
  
  
}

function spawnDoors(){
  if (frameCount%240===0){
    var door= createSprite(200,-50);
    door.addImage("door",doorImg);
    
    var climber= createSprite(200,10);
    climber.addImage("climber",climberImg);
    
    var invBlk= createSprite(200,15);
    invBlk.width=climber.width;
    invBlk.height=2;
    
    
    
    
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    
    climber.x=door.x;
    climber.velocityY=1;
    
    invBlk.x=door.x;
    invBlk.velocityY=1;
    
    
    
    
    door.lifetime=800;
    
    climber.lifetime=800;
    
    invBlk.lifetime=800;
    
    
    ghost.depth=door.depth;
    ghost.depth+=1;
    
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invBlk.debug=true;
    invBlkGroup.add(invBlk);
    
    
  }
}
