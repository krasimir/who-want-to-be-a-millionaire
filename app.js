const DATA = {
  a: [
    {
      question: 'Кой от следните е приятел на мечо пух?',
      answers: [
        'Батман',
        'Кристофар Робин',
        'Донатело',
        'Стефани'
      ],
      valid: 1
    },
    {
      question: 'Колко са въпросите в стани богат?',
      answers: [
        10,
        2,
        16,
        15
      ],
      valid: 3
    }
  ]
}

window.addEventListener('load', function() {
  const variant = 'a';
  const questions = DATA[variant];
  let currentQuestion = 0;
  const question = document.querySelector('h1');
  const optionA = document.querySelector('.optionA');
  const optionB = document.querySelector('.optionB');
  const optionC = document.querySelector('.optionC');
  const optionD = document.querySelector('.optionD');
  const option50 = document.querySelector('.option50');
  const options = [optionA, optionB, optionC, optionD];
  
  options.forEach(el => {
    el.addEventListener('click', (e) => {
      const index = Number(e.target.getAttribute('data-index'));
      if (index === questions[currentQuestion].valid) {
        e.target.setAttribute('style', 'background:rgba(0, 200, 0, 0.6);');
        message('<p>Следващ въпрос?</p><a href="javascript:showNextQuestion()">OK</a>');
      } else {
        e.target.setAttribute('style', 'background:rgba(200, 0, 0, 0.6);');
        options[questions[currentQuestion].valid].setAttribute('style', 'background:rgba(0, 200, 0, 0.6);');
        message('<p>Нова игра?</p><a href="javascript:startOver()">OK</a>');
      }
    });
  });
  option50.addEventListener('click', () => {
    const current = questions[currentQuestion];
    let wrongAnswers = current.answers.filter((a, i) => i !== current.valid);
    const toKeep = wrongAnswers[getRandomInt(3)];
    wrongAnswers = wrongAnswers.filter(a => a !== toKeep);
    current.answers.forEach((a, i) => {
      if (wrongAnswers.indexOf(a) >= 0) {
        options[i].setAttribute('style', 'display: none');
      }
    })
  });

  function showQuestion() {
    if (currentQuestion >= DATA[variant].length) {
      message('<p>Ти победи, честито! Нова игра?</p><a href="javascript:startOver()">OK</a>');
      return;
    }
    options.forEach(el => el.setAttribute('style', ''))
    question.innerText = questions[currentQuestion].question;
    optionA.innerText = questions[currentQuestion].answers[0];
    optionB.innerText = questions[currentQuestion].answers[1];
    optionC.innerText = questions[currentQuestion].answers[2];
    optionD.innerText = questions[currentQuestion].answers[3];
  }
  function message(html) {
    const el = document.querySelector('.message');
    el.setAttribute('style', 'display:block');
    el.innerHTML = html;
  }
  function hideMessage() {
    document.querySelector('.message').setAttribute('style', 'display:none');
  }
  window.showNextQuestion = function showNextQuestion() {
    currentQuestion += 1;
    showQuestion();
    hideMessage();
  }
  window.startOver = function startOver() {
    currentQuestion = 0;
    showQuestion();
    hideMessage();
  }

  showQuestion()
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}