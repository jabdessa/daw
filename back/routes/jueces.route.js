/*
    Ruta: /api/jueces
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getJueces, crearJuez, actualizarJuez, borrarJuez } = require('../controllers/jueces.controller');


const router = Router();


router.get('/', validarJWT, getJueces);

router.post('/', [
        validarJWT,
        check('nombre', 'nombre es obligatorio').not().isEmpty(),
        check('primerApellido', 'primerApellido es obligatorio').not().isEmpty(),
        check('email', 'email es obligatorio').isEmail(),
        check('password', 'password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearJuez
);

router.put('/:id', [
        validarJWT,
        check('email', 'email es obligatorio').isEmail(),
        validarCampos,
    ],
    actualizarJuez
);

router.delete('/:id',
    validarJWT,
    borrarJuez
);



module.exports = router;