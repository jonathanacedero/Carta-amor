// Carrossel de fotos
let currentSlide = 0;
const totalSlides = 25;
let autoPlayInterval;

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const offset = -currentSlide * 100;
    track.style.transform = `translateX(${offset}%)`;
    updateIndicators();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
    resetAutoPlay();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
    resetAutoPlay();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoPlay();
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.carousel-dot');
    indicators.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function createIndicators() {
    const container = document.getElementById('indicators');
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(i);
        container.appendChild(dot);
    }
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 4000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Scroll suave para as seções
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Efeito de confete
function triggerConfetti() {
    const container = document.getElementById('confetti');
    const confettiCount = 750;

    for (let i = 0; i < confettiCount; i++) {
        createConfetti(container);
    }

    // Reproduz som se houver (comentado por enquanto)
    // playHeartSound();
}

function createConfetti(container) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.opacity = Math.random();
    confetti.style.animationDelay = Math.random() * 5 + 's';

    container.appendChild(confetti);

    // Remove o elemento após a animação
    setTimeout(() => {
        confetti.remove();
    }, 7500);
}

function getRandomColor() {
    const colors = ['#f5576c', '#f093fb', '#fa709a', '#fee140', '#667eea', '#764ba2'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Efeito de música ao abrir a página
document.addEventListener('DOMContentLoaded', function () {
    // Adiciona efeito de fade-in ao carregar
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 1s ease-in';
    }, 100);

    // Corrige caminhos para GitHub Pages
    console.log('Corrigindo caminhos... basePath:', window.basePath);

    // Corrige imagens
    document.querySelectorAll('img[src*="images/"]').forEach(img => {
        if (window.basePath && !img.src.includes(window.basePath)) {
            img.src = window.basePath + '/' + img.src;
            console.log('Imagem corrigida:', img.src);
        }
    });

    // Corrige e configura áudio
    const audio = document.getElementById('backgroundAudio');
    if (audio) {
        // Define o src correto
        let audioSrc = 'teste/music.MP3';
        if (window.basePath) {
            audioSrc = window.basePath + '/' + audioSrc;
        }
        audio.src = audioSrc;
        console.log('Áudio configurado para:', audio.src);
    }

    // Inicializa o carrossel
    createIndicators();
    startAutoPlay();

    // Tenta reproduzir o áudio
    if (audio) {
        setTimeout(() => {
            audio.muted = false;
            console.log('Tentando reproduzir áudio de:', audio.src);
            audio.play().then(() => {
                console.log('✓ Áudio tocando!');
            }).catch(err => {
                console.log('✗ Erro ao reproduzir áudio:', err.message);
                // Tenta novamente ao primeiro clique
                console.log('Aguardando clique do usuário...');
                document.addEventListener('click', function enableAudio() {
                    console.log('Clique detectado! Tentando reproduzir novamente...');
                    audio.play().then(() => {
                        console.log('✓ Áudio tocando após clique!');
                    }).catch(e => console.log('✗ Erro no clique:', e.message));
}
