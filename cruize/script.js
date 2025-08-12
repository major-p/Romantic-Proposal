let dodgeCount = 0;
let isRunning = false;
const noBtn = document.getElementById('noBtn');
const pleaseText = document.getElementById('pleaseText');
const questionText = document.getElementById('question-text');
const messages = [
    "Please, my love, you're my only dream! 🥺",
    "My heart begs you, there's only one choice! 😍",
    "Darling, please, let our love story begin! 💖",
    "I can't imagine life without you, please say yes! 😘"
];

document.addEventListener('mousemove', function(e) {
    if (!isRunning) return;
    
    const btnRect = noBtn.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;
    
    const distance = Math.sqrt(
        Math.pow(mouseX - btnCenterX, 2) + 
        Math.pow(mouseY - btnCenterY, 2)
    );
    
    if (distance < 120) {
        runAwayFromMouse(mouseX, mouseY, btnCenterX, btnCenterY);
    }
});

function runAwayFromMouse(mouseX, mouseY, btnX, btnY) {
    const dirX = btnX - mouseX;
    const dirY = btnY - mouseY;
    const length = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
    const moveDistance = 80;
    
    const moveX = (dirX / length) * moveDistance;
    const moveY = (dirY / length) * moveDistance;
    
    const currentTransform = noBtn.style.transform || '';
    const matches = currentTransform.match(/translate\(([^,]+),\s*([^)]+)\)/);
    
    let currentX = 0, currentY = 0;
    if (matches) {
        currentX = parseFloat(matches[1]) || 0;
        currentY = parseFloat(matches[2]) || 0;
    }
    
    const newX = currentX + moveX;
    const newY = currentY + moveY;
    const boundedX = Math.max(-150, Math.min(150, newX));
    const boundedY = Math.max(-80, Math.min(80, newY));
    
    noBtn.style.transform = `translate(${boundedX}px, ${boundedY}px)`;
}

function getRandomShift() {
    const directions = [
        { x: 80, y: 0 },    // right
        { x: -80, y: 0 },   // left
        { x: 0, y: 60 },    // down
        { x: 0, y: -60 },   // up
        { x: 60, y: 60 },   // diagonal down-right
        { x: -60, y: 60 },  // diagonal down-left
        { x: 60, y: -60 },  // diagonal up-right
        { x: -60, y: -60 }, // diagonal up-left
    ];
    
    return directions[Math.floor(Math.random() * directions.length)];
}

function runAway() {
    isRunning = true;
    const shift = getRandomShift();
    
    const currentTransform = noBtn.style.transform || '';
    const matches = currentTransform.match(/translate\(([^,]+),\s*([^)]+)\)/);
    
    let currentX = 0, currentY = 0;
    if (matches) {
        currentX = parseFloat(matches[1]) || 0;
        currentY = parseFloat(matches[2]) || 0;
    }
    
    const newX = currentX + shift.x;
    const newY = currentY + shift.y;
    const boundedX = Math.max(-150, Math.min(150, newX));
    const boundedY = Math.max(-80, Math.min(80, newY));
    
    noBtn.style.transform = `translate(${boundedX}px, ${boundedY}px)`;
    
    dodgeCount++;
    
    if (dodgeCount >= 1) {
        pleaseText.classList.add('show');
        pleaseText.textContent = messages[Math.min(dodgeCount - 1, messages.length - 1)];
        questionText.textContent = dodgeCount >= 2 ? 
            "My heart only beats for you, please say yes! 💕" : 
            "Will you be my girlfriend, my love? 💕";
    }
}

function sayYes() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('successContainer').style.display = 'block';
    createConfetti();
}

function createConfetti() {
    const colors = ['#ff99cc', '#ff6699', '#ffcc66', '#27ae60', '#d6336c'];
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.animation = 'fall 3s linear forwards';
            document.body.appendChild(confetti);
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, i * 100);
    }
}