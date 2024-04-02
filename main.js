// board
var blockSize = 25
var rows = 20
var cols = 20
var board
var context

// snake
var snakeX = blockSize * 5
var snakeY = blockSize * 5

var snakeBody = []

var velocityX = 0
var velocityY = 0

// food
var foodX
var foodY

var gameOver = false

window.onload = () => {
    board = document.getElementById('board')
    board.height = rows * blockSize
    board.width = cols * blockSize
    context = board.getContext("2d")

    randomPlaceFood()
    document.addEventListener('keydown', changeDirection)
    setInterval(update, 100);
}

function update() {
    if (gameOver) {
        return
    }

    context.fillStyle = 'black'
    context.fillRect(0, 0, board.width, board.height)

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        randomPlaceFood()
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    context.fillStyle = 'lime'
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize

    context.fillRect(snakeX, snakeY, blockSize, blockSize)

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    context.fillStyle = 'red'
    context.fillRect(foodX, foodY, blockSize, blockSize)

    if (snakeX < 0 || snakeX > blockSize * rows || snakeY < 0 || snakeY > blockSize * cols) {
        gameOver = true
        alert('Game Over')
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true
            alert('Game Over')
        }
    }
}

function randomPlaceFood() {
    foodX = Math.floor(Math.random() * rows) * blockSize
    foodY = Math.floor(Math.random() * cols) * blockSize
}

function changeDirection(e) {
    if (e.code == 'ArrowUp' && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    } else if (e.code == 'ArrowDown' && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    } else if (e.code == 'ArrowLeft' && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    } else if (e.code == 'ArrowRight' && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
}