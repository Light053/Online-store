const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt');
const TokenService = require('../service/TokenService')
const UserDto = require('../dtos/UserDto')

class UserService {

	async registration(username, password) {
		try {
			const candidate = await User.findOne({ username });

			if (candidate) {
				throw new Error('A user with the same name already exists');
			}

			const hashPassword = await bcrypt.hash(password, 5);
			const user = await User.create({ username, password: hashPassword, roles: 'USER' });

			const userDto = new UserDto(user);

			const token = TokenService.generateToken({ ...userDto });
			TokenService.saveToken(userDto.id, token.refreshToken);

			console.log('user dto:', userDto);

			return {
				...token,
				user: UserDto,
			};
		} catch (error) {
			throw new Error(error);
		}
	}


}

module.exports = new UserService();