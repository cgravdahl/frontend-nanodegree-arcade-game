//Global Constant Variables
var LVL = 1;
var ROW = [50,150,225];
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = ROW[y];
    this.speed = speed;
    
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
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
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//Collisions detection for enemy
Enemy.prototype.collision = function(){
    var left = this.x;
    var right = this.x + 100;
    return {
        left: left,
        right: right
    };
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';

}
//Player update function
Player.prototype.update = function(dt) {   
    if(this.y <= 50){
     
    }
    
}
//Player render method for drawing on the canvas
Player.prototype.render =function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//Player input method
Player.prototype.handleInput = function(e) {
   var vert = 83;
   var horz = 103;

   if(e == 'up'){
    this.y -= vert;
   }
   else if(e == 'down'){
    this.y += vert;
   }
   else if(e == 'left'){
    this.x -= horz;
   }
   else if(e == 'right'){
    this.x += horz;
   }
}
//Collisions detection for Player
Player.prototype.collision = function(){
    var left = this.x;
    var right = this.x + 75;
    return {
        left: left,
        right: right
    };
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Enemy objects
var allEnemies = [];
var maxEnemy = (LVL + 3);
for(i=0;i<maxEnemy; i++){
    var x = randNum(0,250);
    var y = randNum(-1,3);
    var speed = 50 + randNum(0,150);
    allEnemies.push(new Enemy(x,y,speed));

}

//Player Objects
var bill = new Player(202,300);
var player = bill;


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
//Class to handle game pause and instruction functions.
var GFNC = function(paused,focus){
    this.paused = true;
    this.focus = false;
}
//Number Generator
function randNum(start,end){
   var num = Math.floor(Math.random() * (start - end + 1) + end);
   return num;
}




