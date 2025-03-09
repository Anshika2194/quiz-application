const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());  // ✅ Allows Express to handle JSON requests

// Serve static files from the "public" folder
app.use(express.static('public'));

// ✅ Import and use quiz routes
const quizRoutes = require('./routes/quizRoutes');
app.use('/quiz', quizRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
