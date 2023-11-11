const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();

const routes = require('./routes');
const errorHandler = require('./middlewares/ErrorMiddleware');
const {getAllTypes} = require('./repository/ProductRepo');

const app = express();

// app.use(cors());
const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', async (req, res) => {
	const types = await getAllTypes();

  res.status(200).json({types});
});

routes(app);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 5000;

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		// Khi kết nối thành công, khởi động server
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
		console.log('Connected to MongoDB successfully');
	})
	.catch((error) => console.log(error));
