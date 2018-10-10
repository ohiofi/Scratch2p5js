/*global ADD,CENTER,DEGREES,DOWN_ARROW,LEFT,LEFT_ARROW,RADIANS,RIGHT,RIGHT_ARROW,UP_ARROW,angleMode,background,beginShape,blendMode,color,cos,createCanvas,curveVertex,displayHeight,displayWidth,dist,ellipse,endShape,fill,floor,frameCount,frameRate,height,image,img,keyCode,keyIsDown,keyIsPressed,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,pop,push,radians,random,rect,rotate,round,scale,shuffle,sin,stroke,strokeWeight,text,textAlign,textSize,tint,translate,triangle,width,windowHeight,windowWidth */

class Sprite {
	/*
	    constructor with optional arguments. uses scratch cat if user doesn't specify an animation array.
	*/
  constructor(animationArray, x, y, radius, width, height) {
    if(arguments.length == 0) {
      let defaultImage = loadImage("https://cdn.glitch.com/451167f6-8c0d-4827-a377-0db8f3a22dd1%2FScratch_Cat.png?1538584014149")
      animationArray = [defaultImage]
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
        this.x = windowWidth / 2;
        this.y = windowHeight / 2;
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
      case 0:
      default:
        // fail safe, sets image to cat?
        this.debugMode = true;
        this.x = windowWidth / 2;
        this.y = windowHeight / 2;
        this.radius = 50;
        this.width = 100;
        this.height = 100;
        this.imageScale = this.width / 600;
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
    /*
    Will flash the sprite at a given rate, once every someFlashSpeed frames.
    Arguments optional, will default to once every 5 frames if no arguments.
    */
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
	returns the collider height
  */
  getHeight() {
    return (this.height)
  }
  /*
	returns the scaled image height
  */
  getImageHeight() {
    return (this.animationArray[0].height * this.imageScale)
  }
  /*
	returns the scaled image width
  */
  getImageWidth() {
    return (this.animationArray[0].width * this.imageScale)
  }
  /*
	returns the collider radius
  */
  getRadius() {
    return (this.radius)
  }
  /*
	returns the collider width
  */
  getWidth() {
    return (this.width)
  }
  /*
	returns x coordinate
  */
  getX() {
    return (this.x)
  }
  /*
	returns y coordinate
  */
  getY() {
    return (this.y)
  }
  /*
	makes sprite invisible
  */
  hideSprite() {
    this.isSpriteVisible = false;
  }
  /*
	increase animationCounter and switchCostume 
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
	set a new animationSpeed
  */
  setAnimationSpeed(newSpeed) {
    this.animationSpeed = newSpeed
  }
  /*
	set debugMode to either true or false
  */
  setDebug(trueOrFalse) {
    this.debugMode= trueOrFalse;
  }
  /*
	set debugMode to false
  */
  setDebugOff() {
    this.debugMode= false;
  }
  /*
	set debugMode to true
  */
  setDebugOn() {
    this.debugMode= true;
  }
  /*
	set the sprite direct to 1 (facing right) or -1 (facing left)
  */
  setDirection(oneOrNegativeOne) {
    if(oneOrNegativeOne === 1 || oneOrNegativeOne === -1){ // only allow 1 or -1
      this.direction = oneOrNegativeOne;
    }
  }
  /*
	set the collider width
    does NOT change the collider height, collider radius, image height, or image width
  */
  setHeight(someNumber) {
    this.height = someNumber
  }
  /*
	set the image height
    also changes the image width
    does NOT change the collider height, collider radius, or collider width
  */
  setImageHeight(someNumber) {
    this.imageScale = someNumber / this.animationArray[0].height;
  }
  /*
	set the image width
    also changes the image height
    does NOT change the collider height, collider radius, or collider width
  */
  setImageWidth(someNumber) {
    this.imageScale = someNumber / this.animationArray[0].height;
  }
  /*
	set the sprite's size to specified % of original image size
    sets the image scale, collider height, collider radius, and collider width
    setSizeTo(50) will set the size to 50 percent
  */
  setSizeTo(somePercent) {
    this.imageScale = (1 + somePercent / 100);
    this.setHeight(this.height * this.imageScale);
    this.setRadius(this.radius * this.imageScale);
    this.setWidth(this.width * this.imageScale);
  }
  /*
	set the collider radius
    also sets the collider height and collider width
    does NOT change the image height or image width
  */
  setRadius(someNumber) {
    this.radius = someNumber
    this.setHeight(this.radius * 2);
    this.setWidth(this.radius * 2);
  }
  /*
	set the collider width
    also sets the collider radius
    does NOT change the collider width, image height, or image width
  */
  setWidth(someNumber) {
    this.width = someNumber
    this.radius = this.width / 2;
  }
  /*
	sets x to some number
  */
  setX(someNumber) {
      this.x = someNumber;
  }
  /*
	sets y to some number
  */
  setY(someNumber) {
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
    this.currentFrame = this.animationArray[floor(someNumber) % this.animationArray.length];
  }

}
