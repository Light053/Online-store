const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./router/authRouter')
require('dotenv').config({ path: '.env' });
const URI = require('./db-uri');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/auth", authRouter)

const start = async () => {
	try {
		await mongoose.connect(URI)

		app.listen(PORT, () => {
			console.log(`server started on port ${PORT}`);
		})
	} catch (error) {
		console.log(error);
	}
}

start();