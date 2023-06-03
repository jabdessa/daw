/*
    Ruta: /api/competiciones
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getCompeticiones, crearCompeticion, actualizarCompeticion, borrarCompeticion } = require('../controllers/competiciones.controller');


const router = Router();


router.get('/', validarJWT, getCompeticiones);

router.post('/', [
        validarJWT,
        check('nombre', 'nombre es obligatorio').not().isEmpty(),
        check('lugar', 'lugar es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearCompeticion
);

router.put('/:id', [
        validarJWT
    ],
    actualizarCompeticion
);

router.delete('/:id',
    validarJWT,
    borrarCompeticion
);



module.exports = router;