window.addEventListener('load', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const variant = urlParams.get('v') || 'c';
  const questions = DATA[variant];
  let block = false;

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
      if (block) return;
      block = true;
      const index = Number(e.target.getAttribute('data-index'));
      if (index === questions[currentQuestion].valid) {
        e.target.setAttribute('style', 'background:rgba(0, 200, 0, 0.6);');
        if (currentQuestion === DATA[variant].length - 1) {
          message('<p>Ти победи, честито! Нова игра?</p><a href="javascript:startOver()">OK</a>');
        } else {
          message('<p>Браво! Следващ въпрос.</p><a href="javascript:showNextQuestion()">OK</a>');
        }
      } else {
        e.target.setAttribute('style', 'background:rgba(200, 0, 0, 0.6);');
        options[questions[currentQuestion].valid].setAttribute('style', 'background:rgba(0, 200, 0, 0.6);');
        message('<p>Нова игра?</p><a href="javascript:startOver()">OK</a>');
      }
    });
  });
  option50.addEventListener('click', () => {
    if (block) return;
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
    options.forEach(el => el.setAttribute('style', ''))
    question.innerText = questions[currentQuestion].question;
    optionA.innerText = questions[currentQuestion].answers[0];
    optionB.innerText = questions[currentQuestion].answers[1];
    optionC.innerText = questions[currentQuestion].answers[2];
    optionD.innerText = questions[currentQuestion].answers[3];
    updateStatus();
  }
  function message(html) {
    const el = document.querySelector('.message');
    el.setAttribute('style', 'display:block');
    el.innerHTML = html;
  }
  function hideMessage() {
    document.querySelector('.message').setAttribute('style', 'display:none');
  }
  function updateStatus() {
    document.querySelector('.status').innerHTML = '<small>' + (currentQuestion+1) + '/' + DATA[variant].length + '</small>';
  }
  window.showNextQuestion = function showNextQuestion() {
    block = false;
    currentQuestion += 1;
    hideMessage();
    showQuestion();
  }
  window.startOver = function startOver() {
    block = false;
    currentQuestion = 0;
    hideMessage();
    showQuestion();
  }

  showQuestion()
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}