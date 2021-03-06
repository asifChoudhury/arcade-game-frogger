const CHARACTER_WIDTH = 101;
const CHARACTER_HEIGHT = 72;
const CANVAS_BORDER = 650;
const OFFSET_X = 100;
const OFFSET_Y = 83;
const OFFSET_SCORE = 100;
const NUM_ROWS = 5;
const PLAYER_LIVES = 3;
const OFFSET_ENEMY = 22;
/*
 * Enemy Class.
 */
var Enemy = function(x, y, speed) {
    // The image/sprite for our enemies.
    this.sprite = 'images/enemy-bug.png';
    // setting enemy dimensions.
    this.width = CHARACTER_WIDTH;
    this.height = CHARACTER_HEIGHT;
    // Setting the Enemy initial location.
    this.x = x;
    this.y = y;
    //save the co-ordinates so the enemy position can be reset.
    this.originalX = x;
    this.originalY = y;
    // Setting the Enemy speed.
    this.speed = speed;
};

/*
 * Multiply any movement by the dt parameter which will ensure
 * the game runs at the same speed for all computers.
 * Parameter: dt, a time delta between ticks.
 */
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    // When the enemies hit the canvas border ..reset their position.
    if (this.x >= CANVAS_BORDER) {
        this.x = this.originalX;
        this.y = this.originalY;
    }

    // If there's a collision, reset the player.
    if (this.checkCollisions()) {
        // If there's a collision, player looses a life.
        player.lives--;

        // When there's a collision player should not get points for moving into the tile.
        // So the added score is removed and updated.
        player.score -= OFFSET_SCORE;

        // When player has no lives left..display game over message and reset the lives and the score.
        if(player.lives === 0) {
            alert("Out of lives!\n\n" + "Score: " + player.score);
            document.location.reload();
            player.lives = PLAYER_LIVES;
            player.score = 0;
        }

        // Reset the player to initial position.
        player.reset();
    }
};

/*
 * Check for collisions.
 * Return true if there's a collision.
 */
Enemy.prototype.checkCollisions = function() {
    if (this.x + this.width - OFFSET_ENEMY >= player.x &&
        this.x + OFFSET_ENEMY <= player.x + player.width &&
        this.y + this.height >= player.y &&
        this.y <= player.y + player.height) {

        return true;
    }
    return false;
};

/*
 * Draw the enemy on the screen.
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
 * Player class.
 */
var Player = function(x, y) {
    this.sprite = 'images/char-horn-girl.png';

    // Setting player dimensions.
    this.width = CHARACTER_WIDTH;
    this.height = CHARACTER_HEIGHT;

    // Set player position.
    this.x = x;
    this.y = y;

    //save the co-ordinates so the player position can be reset.
    this.originalX = x;
    this.originalY = y;

    // Setting score.
    this.row = NUM_ROWS;
    this.score = 0;

    //Setting lives for player.
    this.lives = PLAYER_LIVES;
};

/*
 * If player reaches the top, reset the player.
 */
Player.prototype.update = function(dt) {
    if (this.y < 60) {
        this.reset();
    }
};

/*
 * Reset the player to original location.
 */
Player.prototype.reset = function() {
    this.x = this.originalX;
    this.y = this.originalY;
    this.row = NUM_ROWS;
};

/*
 * Draw the player and the score.
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    // Draw score.
    var gradient = ctx.createLinearGradient(0, 0, 500, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");

    // Fill with gradient.
    ctx.fillStyle = gradient;
    ctx.font = '30pt Impact';
    ctx.fillText("Score: " + this.score, 295, 110);

    // Draw lives.
    ctx.fillStyle = '#E47474';
    ctx.fillText("Lives: " + this.lives, 15, 110);
};

/*
 * Handle user input and uodate player position.
 * Also update..on which row the player is..per user input.
 */
Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > 0) {
        this.x -= OFFSET_X;

        //Update the score.
        this.scoreUpdate();
    } else if (key === 'right' && this.x < 301){
        this.x += OFFSET_X;

        //Update the score.
        this.scoreUpdate();
    } else if (key === 'up' && this.y > 60){
        this.y -= OFFSET_Y;
        this.row--;

        //Update the score.
        this.scoreUpdate();
    } else if (key === 'down' && this.y < 320){
        this.y += OFFSET_Y;
        this.row++;

        //Update the score.
        this.scoreUpdate();
    }
};

/*
 * Updates the score when the player is on the stone pavement and moves.
 */
Player.prototype.scoreUpdate = function() {
    if (this.row > 0 && this.row < 4) {
        this.score += OFFSET_SCORE;
    }
};

// Instantiate enemies.
var enemy1 = new Enemy(-100, 60, 20);
var enemy2 = new Enemy(-100, 60, 120);
var enemy3 = new Enemy(-100, 60, 180);
var enemy4 = new Enemy(-100, 145, 140);
var enemy5 = new Enemy(-100, 145, 190);
var enemy6 = new Enemy(-100, 230, 100);
var enemy7 = new Enemy(-100, 230, 170);

//Create an array of enemies.
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7];

//Instantiate player.
var player = new Player(200, 400);

/*
 * Listens for key presses and sends the keys to
 * player.handleInout() method and
 * player.scoreUpdate() method.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // Handle the key presses.
    player.handleInput(allowedKeys[e.keyCode]);
});
