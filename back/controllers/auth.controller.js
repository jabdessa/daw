const { response } = require('express');
const bcrypt = require('bcryptjs');

const Juez = require('../models/juez.model');
const { generarJWT } = require('../helpers/jwt');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');


const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {

        // Verificar email
        const juezDB = await Juez.findOne({ email });
        if (!juezDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, juezDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT(juezDB.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(juezDB.role)
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const renewToken = async(req, res = response) => {
    const juezId = req.juezId;
    // Generar el TOKEN - JWT
    const token = await generarJWT(juezId);
    // Obtener el juez por UID
    const juez = await Juez.findById(juezId);

    res.json({
        ok: true,
        token,
        juez,
        menu: getMenuFrontEnd(juez.role)
    });

}


module.exports = {
    login,
    renewToken
}