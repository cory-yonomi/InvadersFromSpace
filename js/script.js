// we need to get our canvas, save it to a variable, so we can access it(and utilize it)
const game = document.getElementById('canvas')
// another thing we'll do here, is get the movement tracker
const moveDisplay = document.getElementById('movement')

//define movement
    //A - left
    //D - right
    //W - shoot
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
const ctx = game.getContext('2d')

function Character(x, y, color, width, height, life) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.life = life
    this.alive = true
    // then we declare the same type of render method
    this.render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

let player = new Character(150, 140, 'cyan', 10, 5)
let alien = undefined


player.render()
// alien.render()


//render 40 aliens
let alienFleet = []
const createAlienSquad = (y, color, life) => {
    for (i = 1; i < 11; i++) {
        let x = (i * 12) + 80
        alien = new Character(x, y, color, 9, 7, life)
        alienFleet.push(alien.life)
        alien.render()
    }
}

const createFleet = () => {
    createAlienSquad(50, 'purple', 1)
    createAlienSquad(40, 'purple', 1)
    createAlienSquad(30, 'yellow', 2)
    createAlienSquad(20, 'magenta', 3)
}

createFleet()
console.log(alienFleet)