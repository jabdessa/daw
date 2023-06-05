const { response } = require('express');
const bcrypt = require('bcryptjs');
const Juez = require('../models/juez.model');

const { generarJWT } = require('../helpers/jwt');

const getJueces = async(req, res) => {
    const jueces = await Juez.find({ 'role': { '$ne': 'ADMIN' } });
    res.json({
        ok: true,
        jueces
    });

}

const crearJuez = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        const existeEmail = await Juez.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const juez = new Juez(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        juez.password = bcrypt.hashSync(password, salt);

        // Guardar juez
        await juez.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT(juez.id);

        res.json({
            ok: true,
            juez,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}


const actualizarJuez = async(req, res = response) => {

    // TODO change to req.header('id');
    const id = req.params.id;
    try {
        const juezDB = await Juez.findById(id);

        if (!juezDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un juez por ese id'
            });
        }

        // TODO revisar qué se actualiza, igual hay que añadir el resto de campos
        // Actualizaciones
        const { password, email, ...campos } = req.body;
        if (juezDB.email !== email) {
            const existeEmail = await Juez.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un juez email'
                });
            }
        }

        campos.email = email;
        const juezActualizado = await Juez.findByIdAndUpdate(id, campos, { new: true });
        res.json({
            ok: true,
            juez: juezActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


const borrarJuez = async(req, res = response) => {

    const id = req.params.id;
    try {
        const juezDB = await Juez.findById(id);
        if (!juezDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un juez id'
            });
        }
        await Juez.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Juez eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}



module.exports = {
    getJueces,
    crearJuez,
    actualizarJuez,
    borrarJuez
}