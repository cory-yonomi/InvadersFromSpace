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

//make canvas accessible
const game = document.getElementById('canvas')
//context variable
const ctx = game.getContext('2d')
let counter = 0
//define player object
function Player(x, y, color, width, height, life) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.life = life
    this.alive = true
    this.points = 0
    this.win = false
    //how to draw player
    this.render = function () {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    //player moves
    this.move = function (key) {
        switch (key) {
            case (' '):
            //shoot
                shootMissile(player)
                break
            case ('a'):
                // move left
                if (player.x > 80) { player.x -= 3 }
                break
            // case ('s'):
            //     move down
            //     useSpecial()
            //     break
            case ('d'):
                // move right
                if (player.x < 215){ player.x += 3 } 
                break
        }
    }
}
//create player
let player = new Player(150, 140, 'cyan', 10, 5, 3)
//define alien object
function Alien(x, y, color, width, height, life, points) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.life = life
    this.alive = true
    this.points = points
    this.dx = .10
    this.direction = {
        left: false,
        right: true
    }
    //alien appearance
    this.render = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4  , 0, 2 * Math.PI);
        ctx.fillStyle = color
        ctx.fill()
    }
    //check and set direction
    this.setDirection = function (low, high) {
        if (high > 225) {
            this.direction.right = false
            this.direction.left = true
            for (i = 0; i < alienFleet.length; i++) {
                alienFleet[i].y += 3
                alienFleet[i].dx += .05
            }
        }
        if (low < 80) {
            this.direction.right = true
            this.direction.left = false
            for (i = 0; i < alienFleet.length; i++) {
                alienFleet[i].y += 3
                alienFleet[i].dx += .05
            }
        }
    }
    //move alien fleet
    this.move = function () {
        alien.setDirection(getLowestX(), getHighest())
        if (this.direction.right) {
            for (i = 0; i < alienFleet.length; i++) {
                alienFleet[i].x += this.dx
            }
        } else if (this.direction.left) {
            for (i = 0; i < alienFleet.length; i++) {
                alienFleet[i].x -= this.dx
            }
        }
    }
    //fire a missile
    this.shoot = function () {
        let randomAlien = Math.floor(Math.random() * alienFleet.length)
        if (counter % 250 === 0) {
            console.log(counter)
            shootMissile(alienFleet[randomAlien])
        }
        if (counter % 302 === 0) {
            console.log(counter)
            shootMissile(alienFleet[randomAlien])
        }
    }
}
//filter for lowest x on existing aliens
const getLowestX = () => {
    let currentLowest = alienFleet[0].x
    for (i = 0; i < alienFleet.length; i++){
        if (alienFleet[i].x < currentLowest) {
            currentLowest = alienFleet[i].x
        }
    }
    return currentLowest
}

const getHighest = () => {
    let currentHighest = 0   
    for (i = 0; i < alienFleet.length; i++){
        if (alienFleet[i].x > currentHighest) {
            currentHighest = alienFleet[i].x
        }
    }
    return currentHighest
}

// const detectAlienHit = () => {

// }

let alien
let alienFleet = []
//make alien counter accesible
const aliensRemaining = document.getElementById('aliensRemaining')
//function for creating a row of aliens
const createAlienSquad = (y, color, life, points) => {
    for (i = 1; i < 11; i++) {
        let x = (i * 10) + 70
        alien = new Alien(x, y, color, 9, 7, life, points)
        alienFleet.push(alien)
    }
}
//create 40 aliens
const createFleet = () => {
    createAlienSquad(35, 'purple', 1, 10)
    createAlienSquad(25, 'purple', 1, 10)
    createAlienSquad(15, 'yellow', 2, 25)
    createAlienSquad(5, 'magenta', 3, 50)
}

//define missile object
function Missile(x, y, width, height, dy, from) {
    this.x = x
    this.y = y
    this.color = 'white'
    this.width = width
    this.height = height
    this.dy = dy
    this.from = ''
    this.render = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
        ctx.fillStyle = this.color
        ctx.fill()
    }

    this.update = function () {
        this.y = this.y + this.dy
    }
}
//make individual missiles and every one on screen accessible globally
let missile
let missiles = []
//create a missile and push it to the array
const shootMissile = (from) => {
    if (from === player) {
        missile = new Missile(from.x + 4.5, from.y, 2, 5, -3, from)
        missiles.push(missile)
    } else {
        missile = new Missile(from.x, from.y, 2, 5, .75, from)
        missiles.push(missile)
    }
}
//missile hit and edge detection logic
const detectMissileHit = () => {
    //identify which alien is hit
    missiles.forEach((missile, index) => {
        if (missile.dy < 0) {
            alienFleet.forEach((alien, fleetIndex) => {
                //missile hits
                if (
                    missile.x < alien.x + alien.width &&
                    missile.x + missile.width > alien.x &&
                    missile.y < alien.y + alien.height &&
                    missile.y + missile.height > alien.y
                ) {
                    missiles.splice(index, 1)
                    alien.life = alien.life - 1
                    //check for kill and points
                    if (alien.life === 0) {
                        alienFleet.splice(fleetIndex, 1)
                        player.points = player.points + alien.points
                        pointTotal.innerText = String(player.points).padStart(4, '0')
                    }
                    //missile edge detection
                } else if (missile.y <= 0) {
                    missiles.splice(index, 1)
                }
            })
        } else if (missile.dy > 0) {
            barriers.forEach((barrier, barrierIndex) => {
                //missile hits
                if (
                    missile.x < barrier.x + barrier.width &&
                    missile.x + missile.width > barrier.x &&
                    missile.y < barrier.y + barrier.height &&
                    missile.y + missile.height > barrier.y
                ) {
                    missiles.splice(index, 1)
                    barrier.life = barrier.life - 1
                    barrier.x += 1
                    barrier.width -= 2
                    console.log(barrier.life)
                    //check for kill and points
                    if (barrier.life === 0) {
                        barriers.splice(barrierIndex, 1)
                    }
                    
                }
            })
        }
    })
}

function Barrier(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = 'lime'
    this.life = 8
    this.render = function () {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

let barrier
let barriers = []


//function for displaying and ending the game upon player win
const displayWin = () => {
    document.getElementById('winDiv').classList.remove('hidden')
}
//function to call when game needs to start
// const startGame = (key) => {
//     if (key == ' ') {
//         document.getElementById('startDisplay').classList.add('hidden')
//         document.getElementById('container').classList.remove('hidden')
        
//     }
// }

let animationId
const animate = () => {
    
    animationId = requestAnimationFrame(animate)
    // clear the canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.clearRect(0, 0, game.width, game.height)
    // render our player
    for (i = 1; i < 5; i++){
        let x = (i * 40) + 40
        barrier = new Barrier(x, 110, 16, 5)
        barriers.push(barrier)
    }
    player.render()
    for (i = 0; i < barriers.length; i++){
        barriers[i].render()
    }
    if (alienFleet.length == 0 && player.points <= 0) {
        createFleet()
    } else if (alienFleet.length == 0 && player.points > 1) {
        player.win = true
        displayWin()
        cancelAnimationFrame(animationId)
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
    alien.shoot()
    detectMissileHit()
    counter++
}

const init = () => {
    container.classList.remove('hidden')
    startDisplay.classList.add('hidden')
    alienFleet = []
    missiles = []
    barriers = []
    player.points = 0
    counter = 0
}
// we also need to declare a function that will stop our animation loop
let stopGameLoop = () => {clearInterval(gameInterval)}
// add event listener for player movement
document.addEventListener('keydown', (event) => {
    event.preventDefault()
    player.move(event.key)
})
// document.addEventListener('keyup', (event) => shootMissile(event.key, player))
document.addEventListener('click', (event) => {
    if (event.target === document.getElementById('restartButton')) {
        winDiv.classList.add('hidden')
        init()
        animate()
    } else if (event.target === document.getElementById('startButton')) {
        init()
        animate()
    }   
})