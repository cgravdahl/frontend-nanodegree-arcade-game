// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  
    ++this.x*dt;
    if(this.x >= 600) {
        this.x = -15;
    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
    var vert = 83*dt; 

    if(this.y <= 50){
        console.log("winner");
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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Enemy objects
var bob = new Enemy(0,50);
var jane = new Enemy(-150, 150);
var jill = new Enemy(200, 225);

var allEnemies = [];
allEnemies.push(bob,jane,jill);

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
