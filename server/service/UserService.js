const { User, Basket } = require('../models/userModels/User')
const Role = require('../models/userModels/Role')
const bcrypt = require('bcrypt');
const TokenService = require('../service/TokenService')
const UserDto = require('../dtos/UserDto');
const ApiError = require('../exceptions/ApiError');
const { createUserBasket } = require('./ProductService');

class UserService {
	async registration(username, password) {
		try {
			const candidate = await User.findOne({ username });

			if (candidate) {
				throw ApiError.badRequest('A user with the same name already exists');
			}

			const hashPassword = await bcrypt.hash(password, 5);

			const basket = await Basket.create({ items: [], totalPrice: 0 });
			const user = await User.create({ username, password: hashPassword, basket: basket._id, roles: 'ADMIN' });

			const userDto = new UserDto(user);

			const token = TokenService.generateToken({ ...userDto });

			await TokenService.saveToken(userDto.id, token.refreshToken);

			const userBasket = createUserBasket(username)
			console.log(userBasket);
			return {
				...token,
				user: userDto,
			};
		} catch (error) {
			throw error;
		}
	}

	async login(username, password) {
		const user = await User.findOne({ username });

		if (!user) {
			throw ApiError.badRequest('This account does not exist!')
		}

		const validPassword = await bcrypt.compare(password, user.password);

		if (!validPassword) {
			throw ApiError.badRequest('Invalid password!');
		}

		const userDto = new UserDto(user);

		const token = TokenService.generateToken({ ...userDto });
		await TokenService.saveToken(userDto.id, token.refreshToken);

		return {
			...token,
			user: userDto,
		};
	}

	async refresh(refreshToken) {
		try {

			if (!refreshToken) {
				throw ApiError.unAuthorizedError();
			}

			const userData = await TokenService.validateRefreshToken(refreshToken);
			const tokenFromDb = await TokenService.findToken(refreshToken);

			if (!userData || !tokenFromDb) {
				throw ApiError.unAuthorizedError();
			}
			const user = await User.findById(userData.id);

			const userDto = new UserDto(user);

			const token = TokenService.generateToken({ ...userDto });
			await TokenService.saveToken(userDto.id, token.refreshToken);

			return {
				...token,
				user: userDto,
			};

		} catch (error) {
			throw ApiError.badRequest('ошибка при обновлении токена', error)
		}

	}

	async getAllUsers() {
		const users = await UserModel.find();
		return users;
	}

	async logout(refreshToken) {
		const token = await TokenService.removeToken(refreshToken);
		return token
	}

	async getUsers() {
		const allUsers = await User.find();

		return allUsers
	}
}


module.exports = new UserService();