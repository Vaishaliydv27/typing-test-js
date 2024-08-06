const WORDS = {
  "went": ["up", "down", "to", "from"],
  "he": ["never", "always", "sometimes", "rarely"],
  "understood": ["why", "how", "when", "where"],
  "left": ["out", "over", "behind", "inside"],
  "drink": ["water", "milk", "juice", "soda"],
  "eat": ["rice", "bread", "pasta", "noodles"],
  "shiny": ["star", "moon", "sun", "sky"],
  "on": ["car", "bike", "bus", "train"],
  "in": ["house", "school", "office", "shop"],
  "the": ["cat", "dog", "cow", "hen", "man", "boy", "girl", "boxer", "swimmer", "dancer"],
  "brown": ["fox", "bear", "lion", "tiger"],
  "jumped": ["over", "under", "across", "around"],
  "lazy": ["dog", "cat", "bear", "fox"],
  "it": ["laughed", "cried", "slept", "ate"],
  "his": ["food", "drink", "toy", "bed"],
  "her": ["dress", "shoes", "bag", "book"],
  "their": ["house", "car", "bike", "school"],
  "our": ["school", "house", "car", "bike"],
  "my": ["book", "pen", "pencil", "bag"],
  "your": ["book", "pen", "pencil", "bag"],
  "fly": ["high", "low", "fast", "slow"],
  "run": ["fast", "slow", "long", "short"],
  "cried": ["loudly", "softly", "silently", "noisily"],
  "slept": ["well", "badly", "deeply", "lightly"],
  "walking": ["slowly", "fast", "quickly", "leisurely"],
  "beautiful": ["flower", "tree", "mountain", "river"],
  "big": ["house", "car", "bike", "school"],
  "small": ["house", "car", "bike", "school"],
  "natural": ["beauty", "disaster", "calamity", "phenomenon"],
  "disaster": ["management", "recovery", "relief", "response"],
  "why": ["not", "yes", "maybe", "never"],
  "how": ["much", "many", "long", "short"],
  "when": ["will", "shall", "can", "could"],
  "where": ["is", "are", "was", "were"],
  "who": ["is", "are", "was", "were"],
  "what": ["is", "are", "was", "were"],
  "which": ["is", "are", "was", "were"],
  "whom": ["is", "are", "was", "were"],
  "whose": ["is", "are", "was", "were"],
  "has": ["been", "not", "never", "always"],
};
let timer = 60;
let interval;
let isGameStarted = false;
let letterCount = 0;

const generateText =  (length) => {
  let sentence = "";
  const words = Object.keys(WORDS);
  while (sentence.split(' ').length < length) {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const randomWordsValue = WORDS[randomWord][Math.floor(Math.random() * WORDS[randomWord].length)];
    sentence += `${randomWord} ${randomWordsValue} `;
  }
  return sentence;
}

const handleKeyPress = (key) => {
    if (!isGameStarted) {
      isGameStarted = true;
      console.log('Game started');
      startTimer();
    }
    document.getElementById(key).classList.add('highlight');
    setTimeout(() => {
      document.getElementById(key).classList.remove('highlight');
    }, 100);
    const text = document.getElementById('text').innerText;
    if (text[0] === key) {
      document.getElementById('text').innerText = text.substring(1);
      letterCount += 1;
    }
    if (text.split(" ").length < 25) {
      updateSentence();
    }

}

const updateSentence = () => {
  const sentence = generateText(25);
  document.getElementById('text').innerText += sentence;
}

const startTimer = () => {
  interval = setInterval(() => {
    timer -= 1;
    document.getElementById('time').innerText = timer;
    if (timer === 0) {
      clearInterval(interval);
      document.getElementById('timer').style.display = 'none';
      const resultElem = document.getElementById('result');
      resultElem.innerText = `You typed ${document.getElementById('text').innerText.length} letters in 60 seconds.`;
      resultElem.style.display = 'block';
      timer = 60;
    }
  }, 1000);
}

const init = () => {
  clearInterval(interval);
  isGameStarted = false;
  letterCount = 0;
  timer = 60;
  document.getElementById('text').innerText = '';
  document.getElementById('result').style.display = 'none';
  document.getElementById('timer').style.display = 'block';
  document.getElementById('time').innerText = timer;
  document.addEventListener('keypress', (e) => handleKeyPress(e.key));

  const keyboard = document.getElementById('virtual-keyboard');
  keyboard.addEventListener('click', (e) => {
    if (e.target.classList.contains('key')) {
      handleKeyPress(e.target.innerText);
    }
  });

  updateSentence();
}

document.addEventListener("DOMContentLoaded", init)