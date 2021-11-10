const express = require('express');
const connectDB = require('./config/db');

const app = express();
const routes = require('./routes/index');

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extend: false }));

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/auth', routes.authRoutes);
app.use('/api/users', routes.userRoutes);
app.use('/api/conversation', routes.conversationRoutes);
app.use('/api/category-type', routes.categoryTypeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = {
    app
}