// Function used to return a random number for the speed
var randomSpeed = function () {
    return Math.floor(Math.random() * 100) + 1;
};

// Enemies our player must avoid
// Parameters: x = position in the horizontal axis
//             y = position in the vertical axis
//             speed = the speed of the enemy (normally random via a call to randomSpeed function)
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
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

// Resets the enemy's position and speed when there is a collision or the player reaches the water
// Parameters: x = position in the horizontal axis
//             y = position in the vertical axis
//             speed = the speed of the enemy (normally random via a call to randomSpeed function)
Enemy.prototype.reset = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Function for creating the Player class
// Hardcode the position x and y so the player appears at the center bottom of the screen
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
    if (this.y < 0) {
        alert("You won!");
        stageReset();
    }

    allEnemies.forEach((enemy) => {
        if (enemy.y === this.y) {
            if (enemy.x >= this.x - 40 && enemy.x <= this.x + 40) {
                alert("You lost!");
                stageReset();
            }
        }
    });
};

// Resets the player's position and speed when there is a collision or the player reaches the water
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 380;
};

// draw player to the screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Instantiate 3 enemies in their respective positions for the 3 tiles of the board
var enemy1 = new Enemy(0, 60);
var enemy2 = new Enemy(10, 140);
var enemy3 = new Enemy(20, 220);
var allEnemies = [];
// Place the player object in a variable called player
var player = new Player();

// Reset the player and the enemies on the board
function stageReset() {
    // // Place all enemy objects in an array called allEnemies
    // console.log(allEnemies);
    player.reset();
    allEnemies = [];
    enemy1.reset(0, 60, randomSpeed());
    enemy2.reset(10, 140, randomSpeed());
    enemy3.reset(20, 220, randomSpeed());
    allEnemies.push(enemy1);
    allEnemies.push(enemy2);
    allEnemies.push(enemy3);
}

stageReset();

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