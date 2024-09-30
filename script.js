// Seleciona o canvas do HTML e obtém o contexto 2D
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Define o tamanho de cada bloco da cobrinha e a comida
const box = 20;

// Inicializa a cobrinha com um segmento
let snake = [{ x: 9 * box, y: 9 * box }];

// Define a direção inicial da cobrinha
let direction = 'RIGHT';

// Gera a comida em uma posição aleatória
let food = {
    x: Math.floor(Math.random() * 18 + 1) * box,
    y: Math.floor(Math.random() * 18 + 1) * box
};

// Inicializa a pontuação
let score = 0;

// Adiciona um evento de teclado para controlar a direção da cobrinha
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';    // Cima
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';  // Baixo
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT'; // Esquerda
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT'; // Direita
});

// Função para desenhar a cobrinha e a comida
function draw() {
    ctx.fillStyle = 'blue'; // Define a cor do fundo
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Desenha o fundo

    // Desenha cada segmento da cobrinha
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'white'; // Cor da cabeça e do corpo
        ctx.fillRect(snake[i].x, snake[i].y, box, box); // Desenha o segmento
        ctx.strokeStyle = 'black'; // Define a cor da borda
        ctx.strokeRect(snake[i].x, snake[i].y, box, box); // Desenha a borda
    }

    ctx.fillStyle = 'red'; // Cor da comida
    ctx.fillRect(food.x, food.y, box, box); // Desenha a comida

    // Movimento da cobrinha
    let snakeX = snake[0].x; // Posição X da cabeça
    let snakeY = snake[0].y; // Posição Y da cabeça

    // Atualiza a posição da cabeça com base na direção
    if (direction === 'LEFT') snakeX -= box; // Move para a esquerda
    if (direction === 'UP') snakeY -= box; // Move para cima
    if (direction === 'RIGHT') snakeX += box; // Move para a direita
    if (direction === 'DOWN') snakeY += box; // Move para baixo

    // Verifica se a cobrinha comeu a comida
    if (snakeX === food.x && snakeY === food.y) {
        score++; // Aumenta a pontuação
        food = { // Gera nova comida
            x: Math.floor(Math.random() * 18 + 1) * box,
            y: Math.floor(Math.random() * 18 + 1) * box
        };
    } else {
        snake.pop(); // Remove a última parte da cobrinha
    }

    // Verifica se a cobrinha colidiu com si mesma ou com as bordas
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(snakeX, snakeY, snake)) {
        clearInterval(game); // Para o jogo
        alert('Game Over! Sua pontuação: ' + score); // Exibe a pontuação
    }

    // Cria um novo segmento na frente da cobrinha
    const newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead); // Adiciona uma nova cabeça à cobrinha
}

// Função para verificar colisão com a cobrinha
function collision(headX, headY, snakeArray) {
    for (let i = 1; i < snakeArray.length; i++) { // Ignora a cabeça
        if (headX === snakeArray[i].x && headY === snakeArray[i].y) {
            return true; // Retorna verdadeiro se colidiu
        }
    }
    return false; // Retorna falso se não colidiu
}

// Inicia o jogo com um intervalo que chama a função draw a cada 100ms
let game = setInterval(draw, 100);
