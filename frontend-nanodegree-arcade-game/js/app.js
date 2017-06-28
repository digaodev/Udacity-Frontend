// Function used to return a random number for the speed
var randomSpeed = function () {
    return Math.floor(Math.random() * 100) + 1;
};

// Enemies our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = randomSpeed();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    // console.log(this.x);
    if (this.x >= 505) {
        this.speed = randomSpeed();
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Function for creating the Player class
var Player = function () {
    this.x = 200;
    this.y = 380;
    this.sprite = 'images/char-boy.png';
};

// Function that handles the user keyboard inputs for the Player
Player.prototype.handleInput = function (keyPress) {
    if (keyPress === 'left') {
        if (this.x - 100 >= 0) {
            this.x -= 100;
        }
    }
    if (keyPress === 'up') {
        if (this.y - 60 >= 0) {
            this.y -= 80;
        }
    }
    if (keyPress === 'right') {
        if (this.x + 100 <= 400) {
            this.x += 100;
        }
    }
    if (keyPress === 'down') {
        if (this.y + 80 <= 400) {
            this.y += 80;
        }
    }
};

// Update the player's position, required method for game
// Controls the collision for the player and the winning condition
// Parameter: dt, a time delta between ticks
Player.prototype.update = function () {
    var player = this;

    if (player.y < 0) {
        alert("You won!");
        reset();
    }

    allEnemies.forEach(function (enemy) {
        if (enemy.y === player.y) {
            if (enemy.x >= player.x - 40 && enemy.x <= player.x + 40) {
                alert("You lost!");
                reset();
            }
        }
    });
};

// draw player to the screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
var enemy1;
var enemy2;
var enemy3;
var allEnemies = [];
// Place the player object in a variable called player
var player;

// Reset the player and the enemies on the board
var reset = function () {
    // Now instantiate your objects.
    enemy1 = new Enemy(0, 60);
    enemy2 = new Enemy(10, 140);
    enemy3 = new Enemy(20, 220);
    // Place all enemy objects in an array called allEnemies
    allEnemies = [];
    allEnemies.push(enemy1);
    allEnemies.push(enemy2);
    allEnemies.push(enemy3);
    // console.log(allEnemies);
    player = new Player();
};

reset();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});