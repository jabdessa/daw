/*
    Path: '/api/login'
*/
const { Router } = require('express');
const { login, renewToken } = require('../controllers/auth.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
)

router.get('/renew',
    validarJWT,
    renewToken
)


module.exports = router;