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


// ----------------------------------------// Player functions
const getClientCoords = (element, margin = 0) => ({
    left: element.offsetLeft - margin,
    top: element.offsetTop - margin,
    right: element.offsetLeft + element.offsetWidth + margin,
    bottom: element.offsetTop + element.offsetHeight + margin
});

const findIntersectionBetween = (firstCoords, secondCoords) => {
    if (firstCoords.top <= secondCoords.bottom &&
        firstCoords.top >= secondCoords.top &&
        firstCoords.left <= secondCoords.right &&
        firstCoords.left >= secondCoords.left) return LEFT_TOP;
    if (
        firstCoords.top >= secondCoords.top &&
        firstCoords.top <= secondCoords.bottom &&
        firstCoords.right >= secondCoords.left &&
        firstCoords.right <= secondCoords.right) return RIGHT_TOP;
    if (
        firstCoords.bottom >= secondCoords.top &&
        firstCoords.bottom <= secondCoords.bottom &&
        firstCoords.right >= secondCoords.left &&
        firstCoords.right <= secondCoords.right) return RIGHT_BOTTOM;
    if (
        firstCoords.bottom >= secondCoords.top &&
        firstCoords.bottom <= secondCoords.bottom &&
        firstCoords.left >= secondCoords.left &&
        firstCoords.left <= secondCoords.right) return LEFT_BOTTOM;
    else return;
}

const getIntersectionTypeBetween = (brick, elem) => {
    const elemCoords = getClientCoords(elem);
    const brickCoords = getClientCoords(brick, 15);
    return findIntersectionBetween(elemCoords, brickCoords);
};

const getBrickPositionNear = (element) => {
    const bricks = document.querySelectorAll('.brick');
    const nearBrick = [...bricks]
        .map(brick => getIntersectionTypeBetween(brick, element))
        .filter(brickLocation => brickLocation !== undefined);
    return nearBrick;
}


const isBrickObstacle = (brick, side1, side2) => {
    if (brick.includes(side1) || brick.includes(side2)) return true;
    else return false;
}

const playerMoveLeft = () => {
    player.style.left = player.offsetLeft - 20 + 'px';
    player.style.transform = 'rotate(-90deg)';
}
const playerMoveRight = () => {
    player.style.left = player.offsetLeft + 20 + 'px';
    player.style.transform = 'rotate(90deg)';
}
const playerMoveTop = () => {
    player.style.top = player.offsetTop - 20 + 'px';
    player.style.transform = 'rotate(0deg)';
}
const playerMoveBottom = () => {
    player.style.top = player.offsetTop + 20 + 'px';
    player.style.transform = 'rotate(180deg)';
}

const movePlayer = (direction) => {
    const nearBrick = getBrickPositionNear(player);
    switch (direction) {
        case LEFT:
            if (isBrickObstacle(nearBrick, LEFT_TOP, LEFT_BOTTOM)) return;
            playerMoveLeft();
            break;
        case RIGHT:
            if (isBrickObstacle(nearBrick, RIGHT_TOP, RIGHT_BOTTOM)) return;
            playerMoveRight();
            break;
        case TOP:
            if (isBrickObstacle(nearBrick, LEFT_TOP, RIGHT_TOP)) return;
            playerMoveTop();
            break;
        case BOTTOM:
            if (isBrickObstacle(nearBrick, LEFT_BOTTOM, RIGHT_BOTTOM)) return;
            playerMoveBottom();
            break;
        default:
            return;
    }
};

const getDirection = (element) => {
    const transform = element.style.transform;
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

const isIntersectionBetween = (enemy, elem) => {
    const { left: enemyLeft, top: enemyTop, right: enemyRight, bottom: enemyBottom } = getClientCoords(enemy, 10);
    const { left: elemLeft, top: elemTop, right: elemRight, bottom: elemBottom } = getClientCoords(elem);
    if (elemTop <= enemyBottom && elemTop >= enemyTop && elemLeft <= enemyRight && elemLeft >= enemyLeft) {
        return true;
    }
    if (elemTop >= enemyTop && elemTop <= enemyBottom && elemRight >= enemyLeft && elemRight <= enemyRight) {
        return true;
    }
    if (elemBottom >= enemyTop && elemBottom <= enemyBottom && elemRight >= enemyLeft && elemRight <= enemyRight) {
        return true;
    }
    if (elemBottom >= enemyTop && elemBottom <= enemyBottom && elemLeft >= enemyLeft && elemLeft <= enemyRight) {
        return true;
    }
    return false;
}

const enemyDie = (enemy) => {
    enemy.remove();
}

const spawnInTopDirection = (laser, element) => {
    laser.style.top = element.offsetTop - element.clientHeight + 'px';
    laser.style.left = element.offsetLeft + element.offsetWidth / 2 + 'px';
}
const spawnInBottomDirection = (laser, element) => {
    laser.style.top = element.offsetTop + element.offsetHeight + 20 + 'px';
    laser.style.left = element.offsetLeft + element.offsetWidth / 2 + 'px';
}
const spawnInLeftDirection = (laser, element) => {
    laser.style.transform = 'rotate(-90deg)';
    laser.style.top = element.offsetTop + element.offsetHeight / 2 - 25 + 'px';
    laser.style.left = element.offsetLeft - 40 + 'px';
}
const spawnInRightDirection = (laser, element) => {
    laser.style.transform = 'rotate(90deg)';
    laser.style.top = element.offsetTop + element.offsetHeight / 2 - 25 + 'px';
    laser.style.left = element.offsetLeft + element.offsetWidth + 30 + 'px';
}

const shoot = (element) => {
    const laser = document.createElement('div');
    laser.className = 'laser';
    const direction = getDirection(element);
    switch (direction) {
        case TOP:
            spawnInTopDirection(laser, player);
            break;
        case BOTTOM:
            spawnInBottomDirection(laser, player);
            break;
        case LEFT:
            spawnInLeftDirection(laser, player);
            break;
        case RIGHT:
            spawnInRightDirection(laser, player);
            break;
        default:
            break;
    }
    gameContainer.append(laser);
    moveLaser(laser, direction, true);
}

const isLaserHitWall = (laser) => {
    const bricks = document.querySelectorAll('.brick');
    const nearBrick = [...bricks]
        .map(brick => getIntersectionTypeBetween(brick, laser))
        .filter(brickLocation => brickLocation !== undefined);
    if (nearBrick.includes(LEFT_TOP) ||
        nearBrick.includes(RIGHT_TOP) ||
        nearBrick.includes(LEFT_BOTTOM) ||
        nearBrick.includes(RIGHT_BOTTOM)) {
        laser.remove(); return;
    }
}

const isLaserHitEnemy = (laser) => {
    const enemies = document.querySelectorAll('.enemy');
    let indexOfHittedTank;
    const nearEnemiesLocations = [...enemies].map(enemy => isIntersectionBetween(enemy, laser));
    nearEnemiesLocations.forEach((enemy, index) => {
        if (enemy) indexOfHittedTank = index;
    })
    const nearEnemiesHittedLocations = nearEnemiesLocations.filter(enemy => enemy);
    if (nearEnemiesHittedLocations.includes(true)) {
        enemyDie(enemies[indexOfHittedTank]);
        laser.remove();
    }
}

const playerDie = () => {
    player.remove();
}

const isLaserHitPlayer = (laser) => {
    const playerHitLocation = isIntersectionBetween(player, laser);
    if (playerHitLocation) {
        playerDie();
    }
}

const laserMovingAnimation = (laser, details) => {
    const moving = setInterval(details, 50);
    setTimeout(() => {
        clearInterval(moving);
        laser.remove();
    }, 2000);
}

const moveLaser = (laser, direction, fromPlayer) => {
    const checkObstacales = () => {
        isLaserHitWall(laser);
        if (fromPlayer) isLaserHitEnemy(laser);
        else isLaserHitPlayer(laser);
    }
    let details;
    if (direction === TOP) {
        details = () => { checkObstacales(); laser.style.top = (parseInt(laser.style.top)) - 40 + 'px' };
    }
    if (direction === BOTTOM) {
        details = () => { checkObstacales(); laser.style.top = (parseInt(laser.style.top)) + 40 + 'px' };
    }
    if (direction === LEFT) {
        details = () => { checkObstacales(); laser.style.left = (parseInt(laser.style.left)) - 40 + 'px' };
    }
    if (direction === RIGHT) {
        details = () => { checkObstacales(); laser.style.left = (parseInt(laser.style.left)) + 40 + 'px' };
    }
    laserMovingAnimation(laser, details);
}
// ------------------------ //


// ---------------------------------------- // Enemies functions
const enemyMoveLeft = (enemy) => {
    enemy.style.left = enemy.offsetLeft - 20 + 'px';
    enemy.style.transform = 'rotate(-90deg)';
    enemy.direction = LEFT;
}
const enemyMoveRight = (enemy) => {
    enemy.style.left = enemy.offsetLeft + 20 + 'px';
    enemy.style.transform = 'rotate(90deg)';
    enemy.direction = RIGHT;
}
const enemyMoveTop = (enemy) => {
    enemy.style.top = enemy.offsetTop - 20 + 'px';
    enemy.style.transform = 'rotate(0deg)';
    enemy.direction = TOP;
}
const enemyMoveBottom = (enemy) => {
    enemy.style.top = enemy.offsetTop + 20 + 'px';
    enemy.style.transform = 'rotate(180deg)';
    enemy.direction = BOTTOM;
}

const moveEnemy = (enemy) => {
    const nearBrick = getBrickPositionNear(enemy);
    switch (enemy.direction) {
        case LEFT:
            if (isBrickObstacle(nearBrick, LEFT_TOP, LEFT_BOTTOM)) {
                enemyMoveRight(enemy);
                setEnemyDirectionRandomly(enemy);
                return;
            }
            enemyMoveLeft(enemy);
            break;
        case RIGHT:
            if (isBrickObstacle(nearBrick, RIGHT_TOP, RIGHT_BOTTOM)) {
                enemyMoveLeft(enemy);
                setEnemyDirectionRandomly(enemy);
                return;
            }
            enemyMoveRight(enemy);
            break;
        case TOP:
            if (isBrickObstacle(nearBrick, LEFT_TOP, RIGHT_TOP)) {
                enemyMoveBottom(enemy);
                setEnemyDirectionRandomly(enemy);
                return;
            }
            enemyMoveTop(enemy);
            break;
        case BOTTOM:
            if (isBrickObstacle(nearBrick, LEFT_BOTTOM, RIGHT_BOTTOM)) {
                enemyMoveTop(enemy);
                setEnemyDirectionRandomly(enemy);
                return;
            }
            enemyMoveBottom(enemy);
            break;
        default:
            return;
    }
}

const isPlayerOnSameLine = (enemy) => {
    if (Math.abs(enemy.offsetTop - player.offsetTop) < enemy.offsetHeight / 2) return true;
    if (Math.abs(enemy.offsetLeft - player.offsetLeft) < enemy.offsetWidth / 2) return true;
    else return false;
}

const findPlayer = (enemy) => {
    const { left: enemyX, top: enemyY } = getClientCoords(enemy);
    const { left: playerX, top: playerY } = getClientCoords(player);
    const enemyWidth = enemy.offsetWidth;
    const enemyHeight = enemy.offsetHeight;
    if (Math.abs(enemyY - playerY) < (enemyHeight / 2) && enemyX - playerX > 0) {
        return LEFT;
    }
    if (Math.abs(enemyY - playerY) < (enemyHeight / 2) && enemyX - playerX < 0) {
        return RIGHT;
    }
    if (Math.abs(enemyX - playerX) < (enemyWidth / 2) && enemyY - playerY > 0) {
        return TOP;
    }
    if (Math.abs(enemyX - playerX) < (enemyWidth / 2) && enemyY - playerY < 0) {
        return BOTTOM;
    }
    return false;
}

const setEnemyDirectionRandomly = (enemy) => {
    const directions = [LEFT, RIGHT, TOP, BOTTOM];
    enemy.direction = directions[Math.floor(Math.random() * directions.length)];
}

const shootPlayer = (enemy) => {
    const laser = document.createElement('div');
    laser.className = 'laser';
    switch (enemy.direction) {
        case TOP:
            spawnInTopDirection(laser, enemy);
            break;
        case BOTTOM:
            spawnInBottomDirection(laser, enemy);
            break;
        case LEFT:
            spawnInLeftDirection(laser, enemy);
            break;
        case RIGHT:
            spawnInRightDirection(laser, enemy);
            break;
        default:
            break;
    }
    gameContainer.append(laser);
    moveLaser(laser, enemy.direction, false);
}

const attackPlayer = (enemy) => {
    const directionToShoot = findPlayer(enemy);
    enemy.direction = directionToShoot;
    shootPlayer(enemy);
}

const startEnemy = (enemy) => {
    setEnemyDirectionRandomly(enemy);

    setInterval(() => {
        moveEnemy(enemy);
        if (isPlayerOnSameLine(enemy)) {
            attackPlayer(enemy);
        }
    }, 100)
}

// ------------------------ // Game Functions 

const endGame = (title) => {
    const isRestart = confirm(`${title}  Wanna restart?`);
    if (isRestart) { window.location.reload(); return; }
    else { window.close(); return; }
}

// ----------------------------------------- // Main Function
function main() {

    // RENDER LEVEL
    renderer.renderArea();

    // MAKING ENEMIES ALIVE
    document.querySelectorAll('.enemy').forEach((enemy) => startEnemy(enemy));

    // EVENT LISTENERS
    document.addEventListener('keydown', (event) => {
        getDirection(player);
        if (event.key === 'ArrowLeft') {
            movePlayer(LEFT);
        }
        if (event.key === 'ArrowRight') {
            movePlayer(RIGHT)
        }
        if (event.key === 'ArrowUp') {
            movePlayer(TOP);
        }
        if (event.key === 'ArrowDown') {
            movePlayer(BOTTOM);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            shoot(player);
        }
    });

    let killedEnemies = 0;
    const observer = new MutationObserver(mutations => {
        let removedNodes = mutations.map(mutation => [...mutation.removedNodes].map(node => node));
        if (removedNodes.some((elem) => elem.some(node => node.matches('.enemy')))) {
            killedEnemies++;
            if (killedEnemies === 3) {
                endGame('You have won :) ... ')
            }
        };
        if (removedNodes.some((elem) => elem.some(node => node.matches('#player')))) {
            endGame('You have lost :( ... ')
        }
    })
    observer.observe(gameContainer, {
        childList: true
    })
}
main();