const jwt = require("jsonwebtoken")
const TokenModal = require('../models/TokenModel')

class TokenService {
	generateToken = (payload) => {
		const accessToken = jwt.sign(payload, process.env.ACCES_SECRET_KEY, { expiresIn: '30s' })
		const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: '30d' })

		return {
			accessToken,
			refreshToken
		}
	}

	async saveToken(userId, refreshToken) {
		const tokenData = await TokenModal.findOne({ user: userId })
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		const token = await TokenModal.create({ user: userId, refreshToken })
		return token;
	}

	async removeToken(refreshToken) {
		const tokenData = await TokenModal.deleteOne({ refreshToken })
		return tokenData
	}

	async validateAccesToken(accessToken) {
		try {
			const userData = jwt.verify(accessToken, process.env.ACCES_SECRET_KEY);
			return userData;
		} catch (er) {
			return null
		}

	}
	async validateRefreshToken(refreshToken) {
		try {
			const userData = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
			return userData;
		} catch (er) {
			return null
		}
	}

	async findToken(refreshToken) {
		const tokenData = await TokenModal.findOne({ refreshToken })
		return tokenData;
	}
}

module.exports = new TokenService();