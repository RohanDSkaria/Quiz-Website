let remainingQuestions = [];
let answerSelected = false;
let currentQuestionNumber = 0;
let score = 0;
const questions = [
    {
        question: "What is the size of the earth?",
        options: ["small", "Big", "tiny", "very small"],
        correct: 1
    },
    {
        question: "I have two kids and one of them is a girl. What's the probability that I have two girls?",
        options: ["100%", "50%", "33%", "25%"],
        correct: 2
    },
    {
        question: "I have two kids and one of them is a girl named Anya. What's the probability that I have two girls?",
        options: ["100%", "50%", "33%", "25%"],
        correct: 1
    },
    {
        question: "Who is known as the father of computers?",
        options: ["Ryan Reynolds", "Alan Turing", "Charles Babbage", "Bill gates"],
        correct: 0
    },
    {
        question: "What is the time complexity of a binary search algorithm?",
        options: ["O(n/2)", "O(n)", "O(log(n))", "O(nlog(n))"],
        correct: 2
    },
    {
        question: "Which binary operator is used to toggle a bit in programming?",
        options: ["AND", "OR", "XOR", "You can't toggle a bit"],
        correct: 2
    },
    {
        question: "What does CSS stand for in web development?",
        options: ["Computer Style Scripts", "Custom Styling System", "Cascading Style Sheets", "It doesn't mean anything"],
        correct: 2
    },
    {
        question: "What is the purpose of a DNS server?",
        options: ["To encrypt website data for secure transmission.", "To provide cloud storage for website files.", "To generate dynamic content for websites.", "To translate domain names into IP addresses."],
        correct: 3
    },
    {
        question: "Which of the following algorithms has the worst time complexity??",
        options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Heap sort"],
        correct: 1
    },
    {
        question: "What is the sum of the interior angles of a hexagon?",
        options: ["360", "540", "980", "720"],
        correct: 3
    },

];

const totalQuestions = questions.length;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function resetRemainingQuestions() {
    remainingQuestions = questions.slice();
    shuffle(remainingQuestions);
}

function updateProgressBar() {
    const progressBarInner = document.getElementById('progress-bar-inner');
    const progressText = document.getElementById('progress-text');
    const progress = (currentQuestionNumber / totalQuestions) * 100;
    progressBarInner.style.width = `${progress}%`;
    progressText.textContent = `${currentQuestionNumber} / ${totalQuestions}`;
}

function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.textContent = `Score: ${score}`;
}

function showScoreChange(change) {
    const scoreChange = document.getElementById('score-change');
    scoreChange.textContent = change > 0 ? `+${change}` : `${change}`;
    scoreChange.style.color = change > 0 ? 'green' : 'red';
    scoreChange.style.opacity = 1;

    setTimeout(() => {scoreChange.style.opacity = 0;}, 1000);
}

function redirectToEndPage() {
    localStorage.setItem('finalScore', score);
    window.location.href = 'endPage.html';
}

function displayRandomQuestion() {

    if (remainingQuestions.length === 0) {
        redirectToEndPage();
        return;
    }

    currentQuestionNumber++;
    const currentQuestion = remainingQuestions.pop();
    document.getElementById("question").textContent = `Q ${currentQuestionNumber}: ${currentQuestion.question}`;

    const options = document.querySelectorAll(".option");
    options.forEach((option, index) => {
        option.querySelector('.option-text').textContent = currentQuestion.options[index];
        option.classList.remove("selected", "correct", "incorrect");
        option.querySelector('.feedback').textContent = '';
        option.onclick = null;
    });

    answerSelected = false;
    
    options.forEach((option, index) => {
        option.onclick = () => {
            if (!answerSelected) {
                answerSelected = true;
                let ya = false;
                if (index === currentQuestion.correct) {
                    option.classList.add('correct');
                    option.querySelector('.feedback').textContent = 'Correct!';
                    option.querySelector('.feedback').style.color = 'rgb(2, 255, 2)';
                    score += 5;
                    ya=true;
                } else {
                    option.classList.add('incorrect');
                    option.querySelector('.feedback').textContent = 'Wrong!';
                    option.querySelector('.feedback').style.color = 'red';
                    score -= 1;
                }
                setTimeout(displayRandomQuestion, 1200);
                updateProgressBar();
                updateScoreDisplay();
                if(ya) showScoreChange(5);
                else showScoreChange(-1);
            }
        };
    });
}

resetRemainingQuestions();
displayRandomQuestion();
updateScoreDisplay();