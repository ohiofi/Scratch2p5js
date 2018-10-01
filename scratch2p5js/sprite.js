/*global radians,tint,push,pop,scale,keyIsPressed,img,frameCount,createCanvas,color,translate,triangle,frameRate,beginShape,endShape,curveVertex,shuffle,sin,cos,floor,rotate,textAlign,LEFT,RIGHT,CENTER,text,textSize,stroke,noStroke,strokeWeight,keyCode,keyIsDown,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,DOWN_ARROW,mouseIsPressed,fill,noFill,mouseX,mouseY,line,ellipse,background,displayWidth,displayHeight,windowWidth,windowHeight,height,width,dist,loadSound,loadImage,image,random,angleMode,RADIANS,DEGREES*/

class Sprite {
  constructor(animationArray, x, y, radius, width, height){
    if(arguments.length === 0) {
      alert("Oof! You goofed! All sprites require one argument (an array of one or more images). Use loadImage() in the preload function, then pass the image(s) as an array argument.");
      return
    }
    
    // defaults true in all cases
    this.debugMode = false;
    this.animationArray = animationArray;
    this.animationSpeed = random(0.2,0.5);
    this.animationCounter = 0;
    this.currentFrame = this.animationArray[0];
    this.direction = 1;
    this.flashEnabled = false;
    this.isSpriteVisible = true;
    this.rotation = 0;
    
    switch (arguments.length) {
      case 1:
      case 2:
        // Sprite([animationArray])
        this.x = width / 2;
        this.y = height / 2;
        this.radius = this.animationArray[0].width / 2;
        this.width = this.animationArray[0].width;
        this.height = this.animationArray[0].height;
        this.imageScale = this.width / this.animationArray[0].width;
        break
      case 3:
        // Sprite([animationArray], x, y)
        this.x = x;
        this.y = y;
        this.radius = this.animationArray[0].width / 2;
        this.width = this.animationArray[0].width;
        this.height = this.animationArray[0].height;
        this.imageScale = this.width / this.animationArray[0].width;
        break
      case 4:
        // Sprite([animationArray], x, y, radius)
        // use radius to set the imageScale, collider height, and collider width
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.width = radius * 2;
        this.height = radius * 2;
        this.imageScale = radius * 2 / this.animationArray[0].width;
        break
      case 5:
        // Sprite([animationArray], x, y, width, height)
        this.x = x;
        this.y = y;
        this.radius = width / 2;
        this.width = width;
        this.height = height;
        this.imageScale = this.width / this.animationArray[0].width;
        break
      default:
        // fail safe
        this.x = x;
        this.y = y;
        this.radius = this.animationArray[0].width / 2;
        this.width = this.animationArray[0].width;
        this.height = this.animationArray[0].height;
        this.imageScale = this.width / this.animationArray[0].width;
    }
  }
}


