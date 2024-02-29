const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const UserService = require('../service/UserService');
const ApiError = require('../exceptions/ApiError');

class AuthController {
	saltRounds = 5;

	async login(req, res, next) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				next(ApiError.badRequest('ошибка при валидации', errors.array()))
			}

			const { username, password } = req.body;

			const userData = await UserService.login(username, password);

			res.cookie('refreshToken', userData.refreshToken,
				{ maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

			return res.json(userData);

		} catch (error) {
			next(error)
		}
	}

	async registration(req, res, next) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				next(ApiError.badRequest('ошибка при валидации', errors.array()))
			}
			const { username, password } = req.body;

			const userData = await UserService.registration(username, password);

			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

			return res.json(userData);

		} catch (error) {
			next(error)
		}

	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;

			const token = await UserService.logout(refreshToken)

			res.clearCookie('refreshToken');

			return res.json(token)
		} catch (error) {
			next(error)
		}
	}


	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;

			const userData = await UserService.refresh(refreshToken);

			res.cookie('refreshToken', userData.refreshToken,
				{ maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

			return res.json(userData);

		} catch (error) {
			next(error)
		}
	}


	async getUsers(req, res) {
		try {
			const users = await UserService.getUsers()
			res.json(users)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new AuthController;