const Router = require('express');
const controller = require('../controllers/authController')
const roleMiddleware = require('../middlewares/roleMiddleware')
const { check } = require('express-validator')
const router = new Router();


router.post('/registration', [
	check('username', 'имя пользователя не может быть пустым!').notEmpty(),
	check('password', 'пароль должен быть длиннее 4 символов и короче 15').isLength({ min: 4, max: 15 })
], controller.registration);
router.post('/login', [
	check('username', 'имя пользователя не может быть пустым!').notEmpty(),
	check('password', 'пароль должен быть длиннее 4 символов и короче 15').isLength({ min: 4, max: 15 })
], controller.login);
router.post('/logout', controller.logout)
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers);
router.get('/refresh', controller.refresh);

module.exports = router