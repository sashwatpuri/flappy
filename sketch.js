var flappy ,flappyImage , flappystop ;
var pipe , pipe1a , pipe1b , pipe2a , pipe2b , pipe3a , pipe3b , pipe4a , pipe4b , pipe5a , pipe5b ; 
var bg , startbg ; 
var ground ; 
var GameState = 0 ;
var title , playButton ,play ; 
var getready ; 
var pipegroup  ;
var score = 0 ;
var GameOver ; 

function preload(){
     bg = loadImage('Images/bg.png');
     startbg = loadImage('Images/startbg.png');
     title = loadImage('Images/title.png');
     playButton = loadImage('Images/PLAY_BUTTON.png');
     flappyImage = loadAnimation('Images/flappy1.png','Images/flappy2.png','Images/flappy3.png','Images/flappy4.png');
     flappystop = loadAnimation('Images/flappy4.png');
     pipe1a = loadImage('Images/pipe1a.png');
     pipe1b = loadImage('Images/pipe1b.png');
     pipe2a = loadImage('Images/pipe2a.png');
     pipe2b = loadImage('Images/pipe2b.png');
     pipe3a  = loadImage('Images/pipe3a.png');
     pipe3b = loadImage('Images/pipe3b.png');
     pipe4a = loadImage('Images/pipe4a.png');
     pipe4b = loadImage('Images/pipe4b.png');
     pipe5a = loadImage('Images/pipe5a.png');
     pipe5b  = loadImage('Images/pipe5b.png');
     GameOver = loadImage("Images/Game_Over.png");

    getready = loadImage('Images/getready.png');

    }

function setup(){
    createCanvas(displayWidth - 50 ,displayHeight - 200);

    ground = createSprite(width,height/2,2*width,height);
    ground.addImage(bg);
    ground.visible = false ; 

    play = createSprite(width/2,height-200);
    play.visible = false ; 

    flappy = createSprite(200,height/2);
    flappy.visible = false ; 
    flappy.addAnimation("running",flappyImage);
    flappy.addAnimation("stop",flappystop);
    flappy.scale = 0.35 ; 
    flappy.debug = true ;
    flappy.setCollider("rectangle",0,0,100,100) ;

    pipegroup = new Group();

    



}

function draw (){ 

    if(GameState == 0 ){
        background(startbg);
        imageMode(CENTER);
        image(title,width/2,125,500,100);

        image(getready,width/2,height/2,500,100);

        play.visible = true ; 
        play.addImage(playButton);
        play.scale = 2 ;  

        if(mousePressedOver(play)){
             GameState = 1 ; 
             play.visible = false ; 
             getready.visible = false ; 
        }
        
    }

    else if(GameState == 1 ){
        background("white");
        ground.visible = true ; 
        ground.velocityX = -3 ; 

        if(ground.x < 0){
            ground.x = ground.width/2 ; 
        }

        flappy.visible = true ; 

        if(mousePressedOver(ground)){
            flappy.velocityY = -5 ; 
        }
        flappy.velocityY -= -0.5

        pipes();
    
        score = score + Math.round(getFrameRate()/60);

        if(pipegroup.isTouching(flappy)){
            GameState = 2
        }
    }

    else if(GameState == 2){
        imageMode(CENTER);
        image(GameOver,width/2,height/2,500,150);
        //background('white');
        ground.velocityX = 0 ; 
        flappy.velocityY = 0 ;
        pipegroup.setVelocityXEach(0);
        pipegroup.setLifetimeEach(-1);
        flappy.changeAnimation("stop");
    }

    drawSprites();
    if(GameState == 1 || GameState == 2){
    textSize(32);
    fill("black");
    textFont("Arabian");
    text("Score : "+score,100,50);
    }
}

function pipes(){
    if(frameCount % 100 == 0){
        var pipeA = createSprite(width,height/4);
        var pipeB = createSprite(width,height-100);
        var choose = Math.round(random(1,5));
        

        switch(choose){
            case 1 :pipeA.y = 170 ;pipeB.y = height- 120 ; 
             pipeA.addImage(pipe1a);
             pipeB.addImage(pipe1b);
            break ; 

            case 2 :pipeA.y = 190 ;pipeB.y = height- 40 ; 
                pipeA.addImage(pipe2a);
            pipeB.addImage(pipe2b);
            break;

            case 3 :pipeA.y = 40 ;pipeB.y = height-190 ; 
                pipeA.addImage(pipe3a);
            pipeB.addImage(pipe3b);
            break ; 

            case 4 :pipeA.y = 215 ;pipeB.y = height-70 ; 
                pipeA.addImage(pipe4a);
            pipeB.addImage(pipe4b);
            break;

            case 5 :pipeA.y = 40 ;pipeB.y = height - 215 ; 
                pipeA.addImage(pipe5a);
            pipeB.addImage(pipe5b);
            break;
        }

        pipeA.velocityX = -3 ; 
        pipeA.lifetime = Math.round(width/3);
        pipeA.scale = 1.1 ; 
        pipeA.debug = true ; 
        pipeB.velocityX = -3 ; 
        pipeB.lifetime = Math.round(width/3);
        pipeB.scale = 1.1 ; 
        pipeB.debug = true ;

        pipegroup.add(pipeA);
        pipegroup.add(pipeB);
    }
}
