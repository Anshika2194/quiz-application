
let currentQuestionIndex = 0;
let questions = [];

document.addEventListener("DOMContentLoaded", () => {
    fetchQuestions();
    document.getElementById("next-btn").addEventListener("click", nextQuestion);
});

function fetchQuestions() {
    fetch("http://localhost:3000/quiz/questions")
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestion();
        })
        .catch(error => console.error("Error fetching questions:", error));
    

}

function displayQuestion() {
    const container = document.getElementById("question-container");
    container.innerHTML = "";

    if (currentQuestionIndex >= questions.length) {
        container.innerHTML = "<h2>Quiz Completed! 🎉</h2>";
        document.getElementById("next-btn").style.display = "none";
        return;
    }

    let question = questions[currentQuestionIndex];
    container.innerHTML = `<h2>${question.question}</h2>`;

    question.options.forEach(option => {
        let btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option, question.answer);
        container.appendChild(btn);
    });
}

// function checkAnswer(selected, correct) {
//     const result = document.getElementById("result");
//     if (selected === correct) {
//         result.textContent = "Correct! 🎉";
//         result.style.color = "green";
//     } else {
//         result.textContent = "Wrong! ❌";
//         result.style.color = "red";
//     }
// }
function checkAnswer(selected, correct) {
    const buttons = document.querySelectorAll("#question-container button");

    buttons.forEach(button => {
        button.disabled = true; // Disable all buttons after selection
        if (button.textContent === correct) {
            button.innerHTML += " ✅"; // Add tick mark to the correct answer
            button.style.backgroundColor = "#d4edda"; // Green background
            button.style.border = "2px solid #28a745";
        } else if (button.textContent === selected) {
            button.innerHTML += " ❌"; // Add cross mark to the selected wrong answer
            button.style.backgroundColor = "#f8d7da"; // Red background
            button.style.border = "2px solid #dc3545";
        }
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById("result").textContent = "";
    displayQuestion();
}
