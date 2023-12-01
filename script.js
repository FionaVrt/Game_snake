document.addEventListener('DOMContentLoaded', function () {
    // Obtention du contexte du canvas
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');

    // Définition de la taille du serpent et de la nourriture
    const snakeSize = 20;
    const foodSize = 20;

    // Initialisation de la position du serpent
    let snake = [{ x: 10, y: 10 }];

    // Initialisation de la direction du serpent
    let direction = 'RIGHT';

    // Initialisation de la position de la nourriture
    let food = { x: 5, y: 5 };

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00F';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * snakeSize, segment.y * snakeSize, snakeSize, snakeSize);
        });

        ctx.fillStyle = '#F00';
        ctx.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
    }

    function update() {
        // mise à jour de position
        const head = Object.assign({}, snake[0]);
        if (direction === 'UP') head.y--;
        else if (direction === 'DOWN') head.y++;
        else if (direction === 'LEFT') head.x--;
        else if (direction === 'RIGHT') head.x++;

        // Vérification des collisions avec les bords du canvas
        if (head.x < 0 || head.x >= canvas.width / snakeSize || head.y < 0 || head.y >= canvas.height / snakeSize) {
            alert('Game Over!');
            resetGame();
            return;
        }

        // Vérification des collisions avec la nourriture
        if (head.x === food.x && head.y === food.y) {
            // Le serpent a mangé la nourriture, ajouter un segment au serpent
            snake.unshift({ x: food.x, y: food.y });
            generateFood();
        } else {
            // Déplacer le serpent
            snake.pop();
            snake.unshift(head);
        }
    }

    function handleKeyPress(event) {
        const key = event.key.toUpperCase();

        if (['Z','Q','S','D','Arrowup','ArrowLeft','ArrowDown','ArrowRight'].includes(key)){
            // Ignorer les entrées opposées à la direction actuelle
        if ((key === 'Z' || key === 'ArrowUp') && direction !== 'DOWN') {
            direction = 'UP';
        } else if ((key === 'Q' || key === 'ArrowDown') && direction !== 'UP') {
            direction = 'DOWN';
        } else if ((key === 'S' || key === 'ArrowLeft') && direction !== 'RIGHT') {
            direction = 'LEFT';
        } else if ((key === 'D' || key === 'ArrowRight') && direction !== 'LEFT') {
            direction = 'RIGHT';
        }
    }
}
    window.addEventListener('keydown',handleKeyPress); 

    function resetGame() {
        snake = [{ x: 10, y: 10}];
        direction = 'RIGHT';
        generateFood();
    }

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * (canvas.width / snakeSize)),
            y: Math.floor(Math.random() * (canvas.height / snakeSize))
        };

        // Assurez-vous que la nourriture n'apparaît pas sur le serpent
        for (let i = 0; i < snake.length; i++) {
            if (food.x === snake[i].x && food.y === snake[i].y) {
                generateFood();
                return;
            }
        }
    }

    window.addEventListener('keydown', handleKeyPress);

    function gameLoop() {
        update();
        draw();
        setTimeout(function(){
            requestAnimationFrame(gameLoop);
        }, 197);
       
    }

    // Démarrer la boucle de jeu
    generateFood();
    gameLoop();
});
