var tree,treeGroup
var treeImg
var skiguy
var score = 0
var gameState = "play"
var monster
var coin



function setup(){
  createCanvas(windowWidth/2,windowHeight)
  treeGroup = createGroup()
  monsterGroup= createGroup()
  coinGroup= createGroup()
  

for (var i = 0; i < windowWidth/2; i=i+150) {
  tree = createSprite(i, Math.round(random(windowHeight,0)),20,20);
  tree.velocityY=-2
  tree.addImage(treeImg)
  tree.scale=0.2
  tree.debug=false 
  
treeGroup.add(tree) 

  skiguy=createSprite(width/2,50)
  skiguy.addAnimation("1",playerImg)
  skiguy.addAnimation("2",playerLeftImg)
  skiguy.changeAnimation("1")
  skiguy.scale=0.3

 

 edges = createEdgeSprites()
  skiguy.debug=false
  skiguy.setCollider("circle",0,0,12)

}
}

function preload()
{
treeImg=loadImage("tree.png")
playerImg=loadAnimation("player.png")
playerLeftImg=loadAnimation("left.png")
coinImg=loadImage("coin.png")
monsterImg=loadImage("monster.png")
}


function draw() {
  background('white')
  drawSprites()
   // turn()
if(gameState==="play"){



  if(tree.y<windowHeight-400){
   for (var i = 0; i < windowWidth/2; i=i+150) {
 tree = createSprite(i, Math.round(random(windowHeight,0)),20,20);
 tree.velocityY=-2 
 tree.addImage(treeImg)
  tree.scale=0.2
  treeGroup.add(tree)
  



}


  }

  if(treeGroup.isTouching(skiguy)||monsterGroup.isTouching(skiguy)){

gameState="end"    
  }

  if(keyDown("space")){
    skiguy.x=skiguy.x-10
    skiguy.changeAnimation("2")
    
  }

  else{skiguy.changeAnimation("1")}
   
    skiguy.x=skiguy.x+5

    monsters()
    coins()
    
 score=score+Math.round(frameRate()/60)

skiguy.collide(edges)
}
if(gameState==="end"){
  treeGroup.setVelocityYEach(0)
  swal(
    {
      title: `Game Over!!!
       Thanks for playing!`,
      
      text: `Score: ${score}`,
  
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

if(frameCount===2000){
  treeGroup.setVelocityYEach(0)
  monsterGroup.setVelocityYEach(0)
  coinGroup.setVelocityYEach(0)
  
  swal(
    {
      title: `You Won!!!`,
      icon: "success",
      text: "Thanks for playing!!",
      
  
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );

}

text("SCORE: "+ score ,50,50)

}

function monsters(){
  if(frameCount%50===0){
    monster=createSprite(Math.round(random(100,500)),height)
    monster.addImage(monsterImg)
    monster.scale=0.2
    monster.velocityY=-10
    monsterGroup.add(monster)
   


  }

}

function coins(){
  if(frameCount%100===0){
    coin=createSprite(Math.round(random(100,500)),height)
    coin.addImage(coinImg)
    coin.scale=0.2
    coin.velocityY=-15
    coinGroup.add(coin)

   


  }
  if(coinGroup.isTouching(skiguy)){
    score=score+50
  }

}



