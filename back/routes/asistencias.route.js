// TODO 
/*
    Ruta: /api/asistencias
*/
const { Router } = require('express');
const { check, param, header } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getAsistenciasByJuez, getAsistenciasByCompeticion, crearAsistenciaJuez, actualizarAsistenciaSecretario, borrarAsistencia } = require('../controllers/asistencias.controller');

const router = Router();

router.get('/juez/:id', validarJWT, getAsistenciasByJuez);
router.get('/competicion/:id', validarJWT, getAsistenciasByCompeticion);

router.post('/', [
        validarJWT,
        validarCampos,
    ],
    crearAsistenciaJuez
);

router.put('/', [
        validarJWT,
        validarCampos,
    ],
    actualizarAsistenciaSecretario
);

router.delete('/:id', [
        validarJWT,
        // TODO no va, no sé por qué
        // header('juez-id', 'juez-id no correcto').isMongoId(),
        // param('juez-id', 'juez-id no correcto').not().isEmpty()
    ],
    borrarAsistencia
);


module.exports = router;