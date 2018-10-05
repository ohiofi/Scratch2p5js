/*global ADD,CENTER,DEGREES,DOWN_ARROW,LEFT,LEFT_ARROW,RADIANS,RIGHT,RIGHT_ARROW,UP_ARROW,angleMode,background,beginShape,blendMode,color,cos,createCanvas,curveVertex,displayHeight,displayWidth,dist,ellipse,endShape,fill,floor,frameCount,frameRate,height,image,img,keyCode,keyIsDown,keyIsPressed,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,pop,push,radians,random,rect,rotate,round,scale,shuffle,sin,stroke,strokeWeight,text,textAlign,textSize,tint,translate,triangle,width,windowHeight,windowWidth */

class Sprite {
	/*
	    constructor with optional arguments. need to add a base64 sprite if user doesn't specify an animation array.
	*/
  constructor(animationArray, x, y, radius, width, height) {
    if(arguments.length == 0) {
      // probably should just load a default base64 sprite (like Scratch cat) if the user forgot to specify an image
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
  /*
      animate(_startPosition,_endPosition)
      Loop through the images in the animation array
      Arguments optional
  */
  animate(_startPosition,_endPosition) {
    switch (arguments.length) {
      case 2:
        // loop through images from animationArray[startPosition] through animationArray[endPosition] inclusive
        // for example, mySprite.animate(3,5) will only loop through images 3, 4, and 5.
        this.animationCounter += this.animationSpeed;
        this.switchCostumeTo(floor(this.animationCounter) % (_endPosition - _startPosition) + _startPosition);
        break;
      case 1:
        // loop through images from animationArray[startPosition] through the end of the animationArray
        this.animationCounter += this.animationSpeed;
        this.switchCostumeTo(floor(this.animationCounter) % (this.animationArray.length - _startPosition) + _startPosition);
        break
      case 0:
      default:
        // loop through all images in the animationArray
        this.animationCounter += this.animationSpeed;
        this.switchCostumeTo(floor(this.animationCounter) % this.animationArray.length);
    }
  }
  /*
      blink(someFlashSpeed)
      Will flash the sprite at a given rate, once every someFlashSpeed frames.
      For example, blink(10) will flash the sprite every 10th frame.
      Arguments optional, will default to once every 5 frames if no arguments.
  */
  blink(someFlashSpeed) {
    switch (arguments.length) {
      case 0:
        someFlashSpeed = 5
    }
    if(frameCount % round(someFlashSpeed) < someFlashSpeed / 2){
      this.flash(0.01);
      this.flashEnabled = true;
      this.show()
      this.flashEnabled = false;
    }
  }
  /*
  	changeHeightBy(somePercent)
  	change the collider height by some percent
  */
  changeHeightBy(somePercent) {
    this.height *= (1 + somePercent / 100);
  }
  /*
  	changeRadiusBy(somePercent)
  	change the collider radius by some percent
  */
  changeRadiusBy(somePercent) {

    this.radius *= (1 + somePercent / 100);
  }
  /*
  	changeSizeBy(somePercent)
  	change the image scale, collider height, collider radius, and collider width by some percent
    changeSizeBy(10) will change the size by 10 percent
  */
  changeSizeBy(somePercent) {
    this.imageScale *= (1 + somePercent / 100);
    this.changeHeightBy(somePercent);
    this.changeRadiusBy(somePercent);
    this.changeWidthBy(somePercent);
  }
  /*
  	changeWidthBy(somePercent)
  	change the collider width by some percent
  */
  changeWidthBy(somePercent) {
    this.width *= (1 + somePercent / 100);
  }
  /*
  	flash()
  	set the blendMode to ADD, making the sprite bright white for 1 frame
  */
  flash() {
    this.flashEnabled = true;
    this.show()
    this.flashEnabled = false;
  }
  /*

  */
  getHeight() {
    return (this.height)
  }
  /*

  */
  getImageHeight() {
    // returns the scaled image height
    return (this.animationArray[0].height * this.imageScale)
  }
  /*

  */
  getImageWidth() {
    // returns the scaled image width
    return (this.animationArray[0].width * this.imageScale)
  }
  /*

  */
  getRadius() {
    return (this.radius)
  }
  /*

  */
  getWidth() {
    return (this.width)
  }
  /*

  */
  getX() {
    return (this.x)
  }
  /*

  */
  getY() {
    return (this.y)
  }
  /*

  */
  hideSprite() {
    this.isSpriteVisible = false;
  }
  /*

  */
  nextCostume() {
    this.animationCounter++;
    this.switchCostumeTo(this.animationArray[floor(this.animationCounter) % this.animationArray.length]);
  }
  /*

  */
  rotate(someAmount) {
    //?
  }
  /*

  */
  setAnimationSpeed(newSpeed) {
    //?
  }
  /*

  */
  setDebug(trueOrFalse) {
    this.debugMode= trueOrFalse;
  }
  /*

  */
  setDebugOff() {
    this.debugMode= false;
  }
  /*

  */
  setDebugOn() {
    this.debugMode= true;
  }
  /*

  */
  setDirection(oneOrNegativeOne) {
    if(oneOrNegativeOne === 1 || oneOrNegativeOne === -1){ // only allow 1 or -1
      this.direction = oneOrNegativeOne;
    }
  }
  /*

  */
  setHeight(someNumber) {
    /*
    set the collider width
    does NOT change the collider height, collider radius, image height, or image width
    */
    this.height = someNumber
  }
  /*

  */
  setImageHeight(someNumber) {
    /*
    set the image height
    also changes the image width
    does NOT change the collider height, collider radius, or collider width
    */
    this.imageScale = someNumber / this.animationArray[0].height;
  }
  /*

  */
  setImageWidth(someNumber) {
    /*
    set the image width
    also changes the image height
    does NOT change the collider height, collider radius, or collider width
    */
    this.imageScale = someNumber / this.animationArray[0].height;
  }
  /*

  */
  setSizeTo(somePercent) {
    /*
    set the sprite's size to specified % of original image size
    sets the image scale, collider height, collider radius, and collider width
    setSizeTo(50) will set the size to 50 percent
    */
    this.imageScale = (1 + somePercent / 100);
    this.setHeight(this.height * this.imageScale);
    this.setRadius(this.radius * this.imageScale);
    this.setWidth(this.width * this.imageScale);
  }
  /*

  */
  setRadius(someNumber) {
    /*
    set the collider radius
    also sets the collider height and collider width
    does NOT change the image height or image width
    */
    this.radius = someNumber
    this.setHeight(this.radius * 2);
    this.setWidth(this.radius * 2);

  }
  /*

  */
  setWidth(someNumber) {
    /*
    set the collider width
    also sets the collider radius
    does NOT change the collider width, image height, or image width
    */
    this.width = someNumber
    this.radius = this.width / 2;
  }
  /*

  */
  setX(someNumber) {
    //sets x to some number
      this.x = someNumber;
  }
  /*

  */
  setY(someNumber) {
    //sets y to some number
      this.y = someNumber;
  }
  /*

  */
  show() {
    if(this.showSprite) {
      push();
      translate(this.x,this.y);
      push();
      rotate(radians(this.rotation)); // convert degrees to radians
      scale(this.direction * this.imageScale, this.imageScale);
      if(this.flashEnabled) {
        blendMode(ADD);
        image(this.currentFrame, -(this.animationArray[0].width / 2), -(this.animationArray[0].height / 2));
      }
      image(this.currentFrame, -(this.animationArray[0].width / 2), -(this.animationArray[0].height / 2));
      if(this.debugMode) {
        pop(); // debug
        stroke("red"); // debug
        noFill(); // debug
        rect(-this.width / 2, -this.height / 2, this.width, this.height); // debug
        ellipse(0,0,2,2); // debug
        ellipse(0,0,this.width,this.width); // debug
        pop(); // debug
      } else {
        pop();
        pop();
      }
    }
  }
  /*

  */
  showSprite() {
    image(animate(_startPosition,_endPosition),this.x,this.y,this.height,this.width)
  }
  /*

  */
  switchCostumeTo(someNumber) {
    //?
  }
}