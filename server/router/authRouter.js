const Router = require('express');
const authController = require('../controllers/authController')
const roleMiddleware = require('../middlewares/roleMiddleware')
const { check } = require('express-validator')
const router = new Router();

router.post('/registration', [
	check('username', 'имя пользователя не может быть пустым!').notEmpty(),
	check('password', 'пароль должен быть длиннее 4 символов и короче 15').isLength({ min: 4, max: 15 })
], authController.registration);
router.post('/login', [
	check('username', 'имя пользователя не может быть пустым!').notEmpty(),
	check('password', 'пароль должен быть длиннее 4 символов и короче 15').isLength({ min: 4, max: 15 })
], authController.login);
router.post('/logout', authController.logout)
router.get('/users', roleMiddleware(['ADMIN']), authController.getUsers);
router.get('/refresh', authController.refresh);

module.exports = router