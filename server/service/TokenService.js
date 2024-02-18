const jwt = require("jsonwebtoken")
const TokenModal = require('../models/TokenModel')

class TokenService {
	generateToken = (payload) => {
		const accessToken = jwt.sign(payload, process.env.ACCES_SECRET_KEY, { expiresIn: '24h' })
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
			return tokenData.save()
		}

		const token = await TokenModal.create({ user: userId, refreshToken })
		return token
	}
}

module.exports = new TokenService();