// ------------------------- // CONSTANTS

const player = document.getElementById('player');
const gameContainer = document.querySelector('.container');

// PLAYER DIRECTIONS
TOP = 'top';
BOTTOM = 'bottom';
RIGHT = 'right';
LEFT = 'left';

// NEAR BRICK POSITION
LEFT_TOP = 'left top';
RIGHT_TOP = 'right top';
LEFT_BOTTOM = 'left bottom';
RIGHT_BOTTOM = 'right bottom';
// ------------------------ //


// -------------------------------- // RENDERER
const renderer = {
    area: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    renderArea() {
        for (let i = 0; i < this.area.length; i++) {
            for (let j = 0; j < this.area[i].length; j++) {
                if (this.area[i][j] === 1) {
                    const brickWall = document.createElement('div');
                    brickWall.className = 'brick';
                    gameContainer.append(brickWall);
                }
                else if (this.area[i][j] === 0) {
                    const emptyBlock = document.createElement('div');
                    emptyBlock.className = 'emptyBlock';
                    gameContainer.append(emptyBlock);
                }
            }
        }
    }
}
// ------------------------ // 


// ----------------------------------------// FUNCTIONS

const movePlayer = (direction) => {
    const bricks = document.querySelectorAll('.brick');

    const nearBrick = [...bricks]
        .map(brick => getNearBrickLocation(brick))
        .filter(brickLocation => brickLocation !== undefined);

    switch (direction) {
        case LEFT:
            if (nearBrick.includes(LEFT_TOP) || nearBrick.includes(LEFT_BOTTOM)) return;
            player.style.left = player.offsetLeft - 20 + 'px';
            player.style.transform = 'rotate(-90deg)';
            break;
        case RIGHT:
            if (nearBrick.includes(RIGHT_TOP) || nearBrick.includes(RIGHT_BOTTOM)) return;
            player.style.left = player.offsetLeft + 20 + 'px';
            player.style.transform = 'rotate(90deg)';
            break;
        case TOP:
            if (nearBrick.includes(LEFT_TOP) || nearBrick.includes(RIGHT_TOP)) return;
            player.style.top = player.offsetTop - 30 + 'px';
            player.style.transform = 'rotate(0deg)';
            break;
        case BOTTOM:
            if (nearBrick.includes(LEFT_BOTTOM) || nearBrick.includes(RIGHT_BOTTOM)) return;
            player.style.top = player.offsetTop + 30 + 'px';
            player.style.transform = 'rotate(180deg)';
            break;
        default:
            return;
    }
};

const getPlayerDirection = () => {
    const transform = player.style.transform;
    const from = transform.indexOf('(');
    const to = transform.indexOf(')');
    const angleInDeg = transform.slice(from + 1, to);
    switch (angleInDeg) {
        case '0deg':
            return TOP;
        case '90deg':
            return RIGHT;
        case '180deg':
            return BOTTOM;
        case '-90deg':
            return LEFT;
    }
}

const getNearBrickLocation = (brick) => {
    const brickLeft = brick.offsetLeft - 10;
    const brickTop = brick.offsetTop - 10;
    const brickRight = brickLeft + brick.offsetWidth + 10;
    const brickBottom = brickTop + brick.offsetHeight + 10;

    const playerLeft = player.offsetLeft;
    const playerTop = player.offsetTop;
    const playerRight = playerLeft + player.offsetWidth;
    const playerBottom = playerTop + player.offsetHeight;

    if (playerTop <= brickBottom && playerTop >= brickTop && playerLeft <= brickRight && playerLeft >= brickLeft) {
        return LEFT_TOP;
    }
    else if (playerTop >= brickTop && playerTop <= brickBottom && playerRight >= brickLeft && playerRight <= brickRight) {
        return RIGHT_TOP;
    }
    else if (playerBottom >= brickTop && playerBottom <= brickBottom && playerRight >= brickLeft && playerRight <= brickRight) {
        return RIGHT_BOTTOM;
    }
    else if (playerBottom >= brickTop && playerBottom <= brickBottom && playerLeft >= brickLeft && playerLeft <= brickRight) {
        return LEFT_BOTTOM;
    }
    return
}

const shoot = () => {
    const direction = getPlayerDirection();
    const laser = document.createElement('div');
    laser.className = 'laser';

    if (direction === TOP) {
        laser.style.top = player.offsetTop - player.clientHeight + 'px';
        laser.style.left = player.offsetLeft + player.offsetWidth / 2 + 'px';
    } else if (direction === BOTTOM) {
        laser.style.top = player.offsetTop + player.offsetHeight + 20 + 'px';
        laser.style.left = player.offsetLeft + player.offsetWidth / 2 + 'px';
    }
    else if (direction === LEFT) {
        laser.style.transform = 'rotate(-90deg)';
        laser.style.top = player.offsetTop + player.offsetHeight / 2 - 25 + 'px';
        laser.style.left = player.offsetLeft - 40 + 'px';
    }
    else if (direction === RIGHT) {
        laser.style.transform = 'rotate(90deg)';
        laser.style.top = player.offsetTop + player.offsetHeight / 2 - 25 + 'px';
        laser.style.left = player.offsetLeft + player.offsetWidth + 30 + 'px';
    }
    gameContainer.append(laser);
    moveLaser(laser, direction);
}

const laserMovingAnimation = (laser, details) => {
    const moving = setInterval(details, 100);
    setTimeout(() => {
        clearInterval(moving);
        laser.remove();
    }, 2000);
}

const moveLaser = (laser, direction) => {
    let details;
    if (direction === TOP) {
        details = () => { laser.style.top = (parseInt(laser.style.top)) - 80 + 'px' };
    }
    if (direction === BOTTOM) {
        details = () => { laser.style.top = (parseInt(laser.style.top)) + 80 + 'px' };
    }
    if (direction === LEFT) {
        details = () => { laser.style.left = (parseInt(laser.style.left)) - 80 + 'px' };
    }
    if (direction === RIGHT) {
        details = () => { laser.style.left = (parseInt(laser.style.left)) + 80 + 'px' };
    }
    laserMovingAnimation(laser, details);
}
// ------------------------ //


// ----------------------------------------- // Main Function
function main() {

    renderer.renderArea();

    document.addEventListener('keydown', (event) => {
        getPlayerDirection();
        if (event.key === 'ArrowLeft') {
            movePlayer('left');
        }
        if (event.key === 'ArrowRight') {
            movePlayer('right')
        }
        if (event.key === 'ArrowUp') {
            movePlayer('top');
        }
        if (event.key === 'ArrowDown') {
            movePlayer('bottom');
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            shoot();
        }
    })
}
main();