const jwt = require("jsonwebtoken");
const ApiError = require("../exceptions/ApiError");

module.exports = function (roles) {
	return function (req, res, next) {
		if (req.method === 'OPTIONS') {
			next();
		}

		try {
			const token = req.headers.authorization.split(' ')[1];

			if (!token) {
				throw ApiError.badRequest('Токен отсутствует!');
			}

			jwt.verify(token, process.env.ACCES_SECRET_KEY, (error, decodedToken) => {
				if (error) {
					throw ApiError.badRequest('Ошибка проверки токена!');
				}

				const { roles: userRoles } = decodedToken.username;

				let hasRole = false;

				userRoles.forEach(el => {
					if (roles.includes(el)) {
						hasRole = true;
					}
				});

				if (!hasRole) {
					throw ApiError.badRequest('У вас нет доступа!');
				}

				next();
			});

		} catch (error) {
			next(error);
		}
	};
};
