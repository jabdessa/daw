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
            .populate('juez', 'nombre')
            .populate('competicion', 'nombre');

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

// para juez --> inserta una asistencia o varias.
const crearAsistenciaJuez = async(req, res = response) => {
    const asistencias = req.body;
    try {
        // sólo me llegan las asistencias que el juez quiere nuevas, las que ya ha dicho que sí, no me llegarán aquí.
        // FIXME hacer un findOne con await y buscar por juez + competición, si ya existe --> no hacer el save
        // por haora lo controlaré desde el front para no mandarlo, pero estaría bien hacer esa validación también en el backend.
        asistencias.forEach(asist => {
            const asistencia = new Asistencia(asist);
            asistencia.save();
        });

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
    const asistencias = req.body;
    // as.save()
    try {
        asistencias.forEach(asistencia => {
            const existeAsistencia = Asistencia.findById(asistencia.id);
            if (existeAsistencia) {
                Asistencia.findByIdAndUpdate(asistencia.id, { asiste: asistencia.asiste }).exec();
            }
        });

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