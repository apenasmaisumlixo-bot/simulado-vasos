// Lógica do modo Simulado
document.addEventListener('DOMContentLoaded', () => {
  const timerEl = document.getElementById('timer');
  const instructionsEl = document.querySelector('.instructions');
  const startContainer = document.getElementById('start-container');
  const startBtn = document.getElementById('startBtn');
  const questionContainer = document.getElementById('question-container');
  const questionEl = document.getElementById('question');
  const imageContainer = document.getElementById('image-container');
  const nextBtn = document.getElementById('nextBtn');
  const resultsContainer = document.getElementById('results-container');
  const resultsList = document.getElementById('results-list');

  let selectedCards = [];
  let currentIndex = 0;
  let timeLeft = 30 * 60; // 30 minutes in seconds
  let timerInterval;

  // Shuffle array in place
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Format seconds to mm:ss
  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function updateTimer() {
    timerEl.textContent = `Tempo restante: ${formatTime(timeLeft)}`;
    if (timeLeft <= 0) {
      finishSimulado();
    }
    timeLeft--;
  }

  function showQuestion() {
    if (currentIndex >= selectedCards.length) {
      finishSimulado();
      return;
    }
    const card = selectedCards[currentIndex];
    questionEl.textContent = card.question;
    // Clear previous image
    imageContainer.innerHTML = '';
    if (card.image) {
      const img = document.createElement('img');
      img.src = card.image;
      img.alt = 'Imagem da questão';
      img.className = 'card-image';
      imageContainer.appendChild(img);
    }
  }

  function nextQuestion() {
    currentIndex++;
    showQuestion();
  }

  function finishSimulado() {
    // stop timer
    clearInterval(timerInterval);
    timerEl.textContent = 'Tempo encerrado.';
    // Hide question
    questionContainer.style.display = 'none';
    instructionsEl.style.display = 'none';
    // Show results
    resultsContainer.style.display = 'block';
    // Build results list
    resultsList.innerHTML = '';
    selectedCards.forEach((card, index) => {
      const cardDiv = document.createElement('div');
      cardDiv.className = 'result-card';
      const qEl = document.createElement('h3');
      qEl.textContent = `${index + 1}. ${card.question}`;
      cardDiv.appendChild(qEl);
      if (card.image) {
        const img = document.createElement('img');
        img.src = card.image;
        img.alt = 'Imagem da questão';
        img.className = 'card-image';
        cardDiv.appendChild(img);
      }
      const ans = document.createElement('p');
      ans.className = 'answer-text';
      ans.textContent = `Resposta: ${card.answer}`;
      cardDiv.appendChild(ans);
      resultsList.appendChild(cardDiv);
    });
  }

  function startSimulado(cards) {
    // select 20 random questions
    const shuffled = shuffle([...cards]);
    selectedCards = shuffled.slice(0, 20);
    currentIndex = 0;
    timeLeft = 30 * 60;
    // hide start container and show question container
    startContainer.style.display = 'none';
    questionContainer.style.display = 'block';
    instructionsEl.style.display = 'block';
    // initial display
    showQuestion();
    // start timer
    timerEl.textContent = `Tempo restante: ${formatTime(timeLeft)}`;
    timerInterval = setInterval(updateTimer, 1000);
  }

  // load dataset then wait for start
  // Data dos cartões vem de data/cards.js que define "cards"
  // Filtra cartões válidos (com pergunta e resposta)
  const allCards = (typeof cards !== 'undefined') ? cards.filter(item => item.question && item.answer) : [];
  // Configura eventos apenas após DOM pronto
  startBtn.addEventListener('click', () => startSimulado(allCards));
  nextBtn.addEventListener('click', nextQuestion);
});