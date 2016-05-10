// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Setting the Enemy initial location
    this.x = x;
    this.y = y;
    //save the co-ordinates so the enemy position can be reset
    this.originalX = x;
    this.originalY = y;
    // Setting the Enemy speed
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x >= 650) {
        this.x = this.originalX;
        this.y = this.originalY;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';

    //set player position
    this.x = x;
    this.y = y;

};

Player.prototype.update = function (dt) {
    //handle collision
   //if won display win message and reset the player


   //temporary..if won reset player to starting position
   if (this.y === -20) {
        this.x = 200;
        this.y = 395;
   }
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (key) {

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-100, 60, 40);
var enemy2 = new Enemy(-100, 60, 180);
var enemy3 = new Enemy(-100, 145, 140);
var enemy4 = new Enemy(-100, 230, 80)

var allEnemies = [enemy1, enemy2, enemy3, enemy4];

var player = new Player(200, 395);


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
