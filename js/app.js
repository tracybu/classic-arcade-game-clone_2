// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = Math.random() * 384;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    if (this.x >= 505) {
            this.x = 0;
    }
    checkCollision(this);
};


var checkCollision = function(anEnemy) {
// check for collision between enemy and player. 
// If player get hit by enemy, player position reset to original positon
    if (
    player.y + 131 >= anEnemy.y + 90
    && player.x + 25 <= anEnemy.x + 88
    && player.y + 73 <= anEnemy.y + 135
    && player.x + 76 >= anEnemy.x + 11) {
        console.log('collided');
        player.x = 202;
        player.y = 405;
    };
// check for player reaching water. 
//If so, reset player position.
    if (player.y + 83 <= 83) {
        player.x = 202;
        player.y = 405;
        youWin = true;
    };

// check if player reaching to canvas borders
// make sure player stay within canvas

    if (player.y > 405 ) {
        player.y = 405;
    };
    if (player.x > 402.5) {
        player.x = 402.5;
    };
    if (player.x < 2.5) {
        player.x = 2.5;
    };
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-cat-girl.png';
};

//Update player's position
Player.prototype.update = function() {
};

//Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Move the player with click of arrow buttons
Player.prototype.handleInput = function(click) {
    if (click == 'up'){
        player.y -= 83;
    };
    if (click == 'down'){
        player.y += 83;
    };
    if (click == 'left'){
        player.x -= 101;
    };
    if (click == 'right'){
        player.x += 101;
    };
    console.log('click is: ' + click);

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(202, 405, 50);
for (var i = 1; i < 4; i++) {
    var enemy = new Enemy(0,i * 84 - 20, Math.random() * 250);
    allEnemies.push(enemy);
};

var youWin = false;

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

