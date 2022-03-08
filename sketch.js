var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var shooterImg3;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var bullets = 70;

var gameState = "fight"

var score = 0

function preload(){
  
  heart1Img = loadImage("heart_1.png")
  heart2Img = loadImage("heart_2.png")
  heart3Img = loadImage("heart_3.png")

  shooterImg = loadImage("shooter_2.png")
  shooter_shooting = loadImage("shooter_3.png")
  shooterImg3 = loadImage("shooter_1.png")

  zombieImg = loadImage("zombie.png")

  bgImg = loadImage("bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = true
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-107,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating groups for zombies and bullets
    bulletGroup = new Group()
    zombieGroup = new Group()



}

function draw() {
  background(0); 


if(gameState == "fight"){

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(keyDown("RIGHT_ARROW")){
  player.x = player.x +30
}
if (keyDown("LEFT_ARROW")){
  player.x = player.x-30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(player.x,player.y-30,20,10)
  bullet.velocityX = 20
  
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

//go to gameState "bullet" when player runs out of bullets
if(bullets==0){
  gameState = "lost"
    
}

if (score > 400){
  gameState = "won"
}

//destroy the zombie when bullet touches it
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        score = score +20
        } 
  
  }
}

//destroy zombie when player touches it
if(zombieGroup.isTouching(player) && heart3.visible == true){

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player) && heart3.visible == true ){
       zombieGroup[i].destroy()

       heart3.visible = false
       heart2.visible = true
       heart1.visible = true
  }

 }
}

if(zombieGroup.isTouching(player) && heart2.visible == true){

  for(var i=0;i<zombieGroup.length;i++){     
       
   if(zombieGroup[i].isTouching(player) && heart2.visible == true ){
        zombieGroup[i].destroy()
 
        heart2.visible = false
        heart1.visible = true
   }
 
  }
 }

 if(zombieGroup.isTouching(player) && heart1.visible == true){

  for(var i=0;i<zombieGroup.length;i++){     
       
   if(zombieGroup[i].isTouching(player) && heart1.visible == true ){
        zombieGroup[i].destroy()
        player.addImage(shooterImg3)
        
        heart1.visible = false
   }
 
  }
 }
if (heart1.visible == false){
  gameState ="lost"
}

textSize(30)
text('Score - '+ score,windowWidth-200,100)

text('Bullets - '+ bullets,windowWidth-200,130)
//calling the function to spawn zombies
enemy();

drawSprites();
}



//destroy zombie and player and display a message in gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",windowWidth/2-250,windowHeight/2)
  zombieGroup.destroyEach();
  player.destroy();
  score = 0
}

//destroy zombie and player and display a message in gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",windowWidth/2-250,windowHeight/2)
  zombieGroup.destroyEach();
  player.destroy();

}

}


//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(windowWidth,random(600,850),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
