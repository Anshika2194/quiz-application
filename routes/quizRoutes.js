const express = require('express');
const router = express.Router();

let quizzes = [
    {
        id: 1,
        question: "What is Express.js?",
        options: ["Framework", "Library", "Database"],
        answer: "Framework"
    },
    {
        id: 2,
        question: "What is Node.js?",
        options: ["Language", "Runtime", "Library"], 
        answer: "Runtime"
    },
    {
         id: 3,
     question: "Which module is used to create a server in Node.js?", 
     options: ["http", "fs", "path"],
      answer: "http" 
    },
    { 
        id: 4,
         question: "What does npm stand for?", 
         options: ["Node Package Manager", "Network Protocol Module", "New Programming Method"], 
         answer: "Node Package Manager" },
    { 
        id:5,
         question: "Which method is used to handle HTTP requests in Express?",
          options: ["fetch()", "app.get()", "http.request()"], 
          answer: "app.get()"
    }
];

// 🟢 **CREATE a new quiz question (POST)**
router.post('/questions', (req, res) => {
    const { question, options, answer } = req.body;

    if (!question || !options || !answer) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newQuestion = {
        id: quizzes.length + 1,
        question,
        options,
        answer
    };

    quizzes.push(newQuestion);
    res.status(201).json(newQuestion);
});

// 🔵 **READ all quiz questions (GET)**
router.get('/questions', (req, res) => {
    res.json(quizzes);
});

// 🔵 **READ a single quiz question by ID (GET)**
router.get('/questions/:id', (req, res) => {
    const question = quizzes.find(q => q.id == req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json(question);
});

// 🟠 **UPDATE a quiz question by ID (PUT)**
router.put('/questions/:id', (req, res) => {
    const { question, options, answer } = req.body;
    const index = quizzes.findIndex(q => q.id == req.params.id);

    if (index === -1) return res.status(404).json({ message: 'Question not found' });

    quizzes[index] = { ...quizzes[index], question, options, answer };
    res.json({ message: "Question updated successfully", updatedQuestion: quizzes[index] });
});

// 🔴 **DELETE a quiz question by ID (DELETE)**
router.delete('/questions/:id', (req, res) => {
    const index = quizzes.findIndex(q => q.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Question not found' });

    quizzes.splice(index, 1);
    res.json({ message: 'Question deleted successfully' });
});

// ✅ **Export the router only once at the end!**
module.exports = router;


