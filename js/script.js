//define player class
    //life = 3
    //size
    //shape?
    //collision method?
//define alien class
    //life =  1, 2, 3
    //points = 20, 30, 50
    //size
    //shape
    //collision method
//define barrier class
    //life = 4
    //size
//define projectile class
    //size
    //collision
    //movement method?
//define player movement function
//define alien movement function
//define collision class
//define game loop
    //game starts
    //countdown
    //aliens begin moving left to right
        //they move down when they reach the edge of their threshold
        //every time they move down, speed increases
    //at random intervals random aliens launch projectiles straight down
        //if barrier is hit, one point is removed
            //barrier width shrinks
        //if player is hit
    //player moves
    //player shoots
        //if an alien is struck, one life is removed
        //if alien's life reaches 0, it dies
            //aliens' life totals in array?
        //if an alien dies, appropriate points are rewarded

        // we're setting up height and width variables BASED ON computed style
// that means we're using setAttribute in conjunction with getComputedStyle
// game.setAttribute('width', getComputedStyle(game)['width'])
// game.setAttribute('height', getComputedStyle(game)['height'])
// check out the varying attributes width and height!
// console.log('current game width', game.width)
// console.log('current game height', game.height)

// now we need to get the game's context so we can add to it, draw on it, create animations etc
// we do this with the built in canvas method, getContext
// we need to get our canvas, save it to a variable, so we can access it(and utilize it)
const game = document.getElementById('canvas')
// another thing we'll do here, is get the movement tracker
const aliensRemaining = document.getElementById('aliensRemaining')
const ctx = game.getContext('2d')

function Player(x, y, color, width, height, life) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.life = life
    this.alive = true
    this.render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    this.move = function (key) {
        switch (key) {
            case (' '):
            //     shoot
                shootMissile()
                break
            case ('a' || 'ArrowLeft'):
                // moves left
                player.x -= 5
                break
            // case ('s'):
            //     move down
            //     useSpecial()
            //     break
            case ('d' || 'ArrowRight'):
                // move right
                player.x += 5
                break
        }
    }
}

function Alien(x, y, color, width, height, life) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.life = life
    this.alive = true

    this.render = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = color
        ctx.fill()
    }

    this.move = function () {
        setInterval( () => {
            if (alienFleet[0].x <= 160) {
                for (i = 0; i < alienFleet.length; i++) {
                    alienFleet[i].x++
                }
            }
        }, 4000)
    }
}

const detectAlienHit = () => {
    missiles.forEach((missile) => {
        alienFleet.forEach((alien) => {
            if (
                missile.x < alien.x + alien.width &&
                missile.x + missile.width > alien.x &&
                missile.y < alien.y + alien.height &&
                missile.y + missile.height > alien.y
            ) {
                console.log('Hit!')
            }
        })
    })
}

function Missile(x, y, width, height) {
    this.x = x
    this.y = y
    this.color = 'white'
    this.width = width
    this.height = height
    this.render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.fill()
    }
    this.update = function () {
        this.y = this.y - 3
    }
}
let missile
let missiles = []
const shootMissile = () => {
    console.log(player.x)
    console.log(missiles)
    console.log(alienFleet)
    missile = new Missile(player.x + 4.5, player.y, 1, 5)
    missiles.push(missile)
    
}
let player = new Player(150, 140, 'cyan', 10, 5)

let alien
let alienFleet = []
const createAlienSquad = (y, color, life) => {
    for (i = 1; i < 11; i++) {
        let x = (i * 8) + 95
        alien = new Alien(x, y, color, 9, 7, life)
        alienFleet.push(alien)
    }
}

const createFleet = () => {
    createAlienSquad(50, 'purple', 1)
    createAlienSquad(42, 'purple', 1)
    createAlienSquad(34, 'yellow', 2)
    createAlienSquad(26, 'magenta', 3)
}

// we're going to set up our game loop, to be used in our timing function
// set up gameLoop function, declaring what happens when our game is running

const animate = () => {
    requestAnimationFrame(animate)
    // clear the canvas
    ctx.clearRect(0, 0, game.width, game.height)
    // display relevant game state(player movement) in our movement display
    // render our player
    player.render()
    if (alienFleet.length <= 39) {
        createFleet()
    } else {
        for (i = 0; i < alienFleet.length; i++){
            alienFleet[i].render()
        }
    }
    aliensRemaining.innerText = alienFleet.length
    alien.move()
    missiles.forEach((missile) => {
        missile.render()
        missile.update()
    })
    detectAlienHit()
}

// we also need to declare a function that will stop our animation loop
let stopGameLoop = () => {clearInterval(gameInterval)}

// add event listener for player movement
document.addEventListener('keydown', (event) => player.move(event.key))
// the timing function will determine how and when our game animates
// let gameInterval = setInterval(gameLoop, 70)
animate()