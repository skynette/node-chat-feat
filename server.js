const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/chats', chatRoutes);

// Database connection
const db = require("./models");
db.sequelize.sync()
	.then(() => {
		console.log("Synced db.");
	})
	.catch((err) => {
		console.log("Failed to sync db: " + err.message);
	});

// Server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
