const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { secret } = require('../config');
const UserService = require('../service/UserService');
const UserDto = require('../dtos/UserDto')


class AuthController {
	saltRounds = 5;

	async login(req, res) {
		try {
			const { username, password } = req.body;

			const user = await User.findOne({ username });

			if (!user) {
				return res.status(400).json(`Пользователя ${username} не существует, Пройдите регистрацию!`)
			}

			const validPassword = await bcrypt.compare(password, user.password);

			if (!validPassword) {
				return res.status(400).json('Неверный пароль!');
			}

			const token = generateAccesToken(user.id, user.roles)

			return res.json(token)

		} catch (error) {
			console.log(error);
			res.status(400).json({ message: 'Log in error!' })
		}
	}

	async registration(req, res, next) {
		try {
			const { username, password } = req.body;

			const userData = await UserService.registration(username, password);

			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

			// Создаем экземпляр UserDto с помощью new
			const userDto = new UserDto(userData.user);

			// Возвращаем объект userDto вместе с токенами
			return res.json({ userDto, ...userData });
		} catch (error) {
			console.log(error.message);
			return res.status(400).json(error.message);
		}
	}


	async logout(req, res, next) {
		try {

		} catch (error) {
			console.log(error);
			res.status(400).json({ message: 'Logout error!' });
		}
	}


	async getUsers(req, res) {
		try {
			const users = await User.find();

			res.json(users)
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new AuthController;