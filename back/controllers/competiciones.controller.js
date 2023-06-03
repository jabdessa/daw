const { response } = require('express');
const Competicion = require('../models/competicion.model');

const getCompeticiones = async(req, res) => {

    //paginación + doble llamada
    const desde = Number(req.query.desde) || 0;
    const limit = Number(req.query.limit) || 5;

    const [competiciones, total] = await Promise.all([
        await Competicion.find()
        .skip(desde)
        .limit(limit),

        //segunda llamada
        Competicion.countDocuments()
    ]);

    res.json({
        ok: true,
        competiciones,
        total
    });

}

const crearCompeticion = async(req, res = response) => {
    const { nombre } = req.body;
    try {
        const existeCompeticion = await Competicion.findOne({ nombre });
        if (existeCompeticion) {
            return res.status(400).json({
                ok: false,
                msg: 'Competición ya existe nombre.'
            });
        }

        const competicion = new Competicion(req.body);

        // Guardar competicion
        await competicion.save();

        res.json({
            ok: true,
            competicion,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const actualizarCompeticion = async(req, res = response) => {

    // TODO: Validar token y comprobar si es el competicion correcto
    const id = req.params.id;
    const { nombre } = req.body;
    try {
        const existeCompeticion = await Competicion.findById(id);

        if (!existeCompeticion) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe competición id.'
            });
        }

        const existeCompeticionNombre = await Competicion.findOne({ nombre });

        if (existeCompeticionNombre) {
            return res.status(400).json({
                ok: false,
                msg: 'Competición ya existe nombre.'
            });
        }



        const competicionActualizado = await Competicion.findByIdAndUpdate(id, req.body);

        res.json({
            ok: true,
            competicion: competicionActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const borrarCompeticion = async(req, res = response) => {

    const id = req.params.id;

    try {

        const competicionDB = await Competicion.findById(id);

        if (!competicionDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe competición id.'
            });
        }

        await Competicion.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'Competicion eliminada'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}

module.exports = {
    getCompeticiones,
    crearCompeticion,
    actualizarCompeticion,
    borrarCompeticion
}