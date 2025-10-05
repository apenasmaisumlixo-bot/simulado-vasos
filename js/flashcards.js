// Lógica para o modo Flash Cards
document.addEventListener('DOMContentLoaded', () => {
  const flashStartContainer = document.getElementById('flash-start-container');
  const flashStartBtn = document.getElementById('flashStartBtn');
  const flashcardContainer = document.getElementById('flashcard-container');
  const questionEl = document.getElementById('flash-question');
  const imageContainer = document.getElementById('flash-image-container');
  const answerEl = document.getElementById('flash-answer');
  const showAnswerBtn = document.getElementById('showAnswerBtn');
  const nextBtn = document.getElementById('nextFlashBtn');

  // Array interno para embaralhar e iterar
  let flashCards = [];
  let currentIndex = 0;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function showCard() {
    if (flashCards.length === 0) return;
    const card = flashCards[currentIndex];
    questionEl.textContent = card.question;
    imageContainer.innerHTML = '';
    if (card.image) {
      const img = document.createElement('img');
      img.src = card.image;
      img.alt = 'Imagem da questão';
      img.className = 'card-image';
      imageContainer.appendChild(img);
    }
    answerEl.textContent = card.answer;
    answerEl.style.display = 'none';
    showAnswerBtn.disabled = false;
  }

  function showAnswer() {
    answerEl.style.display = 'block';
    showAnswerBtn.disabled = true;
  }

  function nextCard() {
    if (flashCards.length === 0) return;
    currentIndex++;
    if (currentIndex >= flashCards.length) {
      // Reshuffle for continuous practice
      flashCards = shuffle(flashCards);
      currentIndex = 0;
    }
    showCard();
  }

  function startFlash(cardsData) {
    flashStartContainer.style.display = 'none';
    flashcardContainer.style.display = 'block';
    flashCards = shuffle(cardsData.slice());
    currentIndex = 0;
    showCard();
  }

  // Dados são definidos em data/cards.js (variável global "cards")
  // Usa a variável "cards" definida em data/cards.js como fonte
  const validCards = (typeof window.cards !== 'undefined') ? window.cards.filter(item => item.question && item.answer) : [];
  flashStartBtn.addEventListener('click', () => startFlash(validCards));
  showAnswerBtn.addEventListener('click', showAnswer);
  nextBtn.addEventListener('click', nextCard);
});