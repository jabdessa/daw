// TODO 
const { response } = require('express');
const Asistencia = require('../models/asistencia.model');

// para los jueces.
const getAsistenciasByJuez = async(req, res) => {
    const juezId = req.params.id;
    try {
        const asistencias = await Asistencia.find({ juez: juezId })
            .populate('juez', 'nombre')
            .populate('competicion', 'nombre');

        // asistencias.map()

        res.json({
            ok: true,
            asistencias
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

//para el secretario
const getAsistenciasByCompeticion = async(req, res) => {
    const competicionId = req.params.id;
    try {
        const asistencias = await Asistencia.find({ competicion: competicionId })
            .populate('juez', 'nombre primerApellido segundoApellido')
            .populate('competicion', 'nombre lugar fecha');
        res.json({
            ok: true,
            asistencias
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}

// para juez --> inserta una asistencia o la elimina dependiendo del disponible y si existe la asistencia.
const crearAsistenciaJuez = async(req, res = response) => {
    const asistencia = req.body;
    const { disponible, competicion, juez } = asistencia;
    try {
        const ass = await Asistencia.find({ competicion, juez });

        if (!disponible && ass[0]) {
            //delete
            await Asistencia.findByIdAndDelete(ass[0].id);
        }

        if (disponible && !ass[0]) {
            //create
            const as = new Asistencia(req.body);
            await as.save();
        }

        res.json({
            ok: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

// para secretario
const actualizarAsistenciaSecretario = async(req, res = response) => {
    const asistencia = req.body;
    try {
        const asistenciaActualizada = await Asistencia.findByIdAndUpdate(asistencia.id, { asiste: asistencia.asiste }, { new: true });
        // asistencias.forEach(asistencia => {
        //     const existeAsistencia = Asistencia.findByIdAndUpdate(asistencia.id);
        //     if (existeAsistencia) {
        //         Asistencia.findByIdAndUpdate(asistencia.id, { asiste: asistencia.asiste }).exec();
        //     }
        // });

        res.json({
            ok: true,
            asistencia: asistenciaActualizada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

// para juez si todavía no se ha pasado la competición, fecha actual menor a la fecha de la competición.
const borrarAsistencia = async(req, res = response) => {

    const idAsistencia = req.params.id;
    const juezId = req.header('juez-id');

    try {

        const asistencia = await Asistencia.findById(idAsistencia);

        if (!asistencia) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un asistencia por ese id'
            });
        }


        if (asistencia.juez != juezId) {
            return res.status(404).json({
                ok: false,
                msg: 'Asistencia no asignada al juez'
            });
        }

        await Asistencia.findByIdAndDelete(idAsistencia);


        res.json({
            ok: true,
            msg: 'Asistencia eliminada'
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
    getAsistenciasByJuez,
    getAsistenciasByCompeticion,
    crearAsistenciaJuez,
    actualizarAsistenciaSecretario,
    borrarAsistencia
}