// script.js

// Retrieve progress from session storage or initialize to an empty array
let userAnswers = JSON.parse(sessionStorage.getItem('progress')) || [];

// Display the quiz questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById('questions');
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement('div');
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement('input');
      choiceElement.setAttribute('type', 'radio');
      choiceElement.setAttribute('name', `question-${i}`);
      choiceElement.setAttribute('value', choice);
      choiceElement.addEventListener('change', function() {
        // Save selected answer to userAnswers array
        userAnswers[i] = choice;
        sessionStorage.setItem('progress', JSON.stringify(userAnswers));
      });
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute('checked', true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();

// Add event listener for submit button
document.getElementById('submit').addEventListener('click', function() {
  // Calculate score
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  // Display score
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Store score in local storage
  localStorage.setItem('score', score);
});
