//Global Constant Variables
var LVL = 1,
ROW = [45,140,220];
/* This function will set up Convenient Inheritance;
 * This function is by Gavin Kistner, it can be found at
 * http://phrogz.net/js/classes/OOPinJS2.html
 */
 Function.prototype.inheritsFrom = function(parentClassOrObject){
    if(parentClassOrObject.constructor == Function){
        //Normal Inheritance
        this.prototype = new parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject.prototype;
    }else{
        //Pure Virtual Inheritance
        this.prototype = parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject;
    }
    return this;
 }
 /*This is the sprite Superclass that every object that is
  * rendered on the screen.
  */
function Sprite(x,y){
    this.x = x;
    this.y = y;
}
Sprite.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Enemies our player must avoid
function Enemy(x,y,speed){
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
}
Enemy.inheritsFrom(Sprite);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x < ctx.canvas.width) {
        this.x += (this.speed * dt);
    }else{
        this.x = randNum(-100,-250);
        this.row = randNum(-1,3);
        this.y = ROW[this.row];
        this.speed = speed = 50 + randNum(50,150);
    }
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    this.parent.render.call(this);
    }
//Collisions detection for enemy
Enemy.prototype.collision = function(){
   var ePos = {
        x: this.x,
        y: this.y,
        width: 50,
        height: 70
    };
    return ePos;
}
/* The Player class that sets up our player, watches for winning,
 *  tracks score, lives and user input.
 */
function Player(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';

}
Player.inheritsFrom(Sprite);
//Player update function
Player.prototype.update = function(dt) {
    if(this.y <= 50){
        GFNC.winner = true;
        GFNC.paused = true;
        this.score += 10;
    }
}
//Player render method for drawing on the canvas
Player.prototype.render =function() {
    this.parent.render.call(this);
}
//Player input method
Player.prototype.handleInput = function(e) {
   var vert = 83,
   horz = 103;
   if(e == 'up'){
    this.y -= vert;
   }
   else if(e == 'down' && this.y < 400){
    this.y += vert;
   }
   else if(e == 'left' && this.x >= 0){
    this.x -= horz;
   }
   else if(e == 'right' && this.x < 400){
    this.x += horz;
   }
}
//Collisions detection position for Player
Player.prototype.collision = function(){
    var pPos = {
        x: this.x,
        y: this.y,
        width: 80,
        height: 50
    }
    return pPos;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//Enemy objects
var allEnemies = [],
maxEnemy = (LVL + 3);
for(i=0;i<maxEnemy; i++){
    var x = randNum(0,250);
    var y = randNum(-1,3);
    var speed = 50 + randNum(0,150);
    allEnemies.push(new Enemy(x,y,speed));
}
//Player Objects
var player = new Player(202,320);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
//Class to handle game pause and winner booleans.
var GFNC = function(paused,winner){
    this.paused = true;
    this.winner = false;
};
//Number Generator
function randNum(start,end){
   var num = Math.floor(Math.random() * (start - end + 1) + end);
   return num;
}