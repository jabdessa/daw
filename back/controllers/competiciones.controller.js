const { response } = require('express');
const Competicion = require('../models/competicion.model');
const Asistencia = require('../models/asistencia.model');

const getCompeticiones = async(req, res) => {

    //paginación + doble llamada
    // const desde = Number(req.query.desde) || 0;
    // const limit = Number(req.query.limit) || 5;

    // await Promise.all([
    let competiciones = await Competicion.aggregate(
        [{
            $lookup: {
                from: "asistencias",
                localField: "Competicion",
                foreignField: "id",
                as: "asistencia"
            }
        }]
    );

    // let competiciones = await Competicion.aggregate(
    //     [{
    //             $lookup: {
    //                 from: "asistencias",
    //                 localField: "Competicion",
    //                 foreignField: "id",
    //                 as: "asists"
    //             }
    //         },
    //         {
    //             $project: {
    //                 _id: "$asists",
    //                 "disponibilidad": { $size: "$asists" }
    //             }
    //         }
    //     ]
    // );


    // let competiciones = await Competicion.aggregate.lookup({
    //     from: "Asistencia",
    //     localField: "Competicion",
    //     foreignField: "Competicion",
    //     as: "Competicion"
    // }).exec();



    // const devolver = [];
    // competiciones.forEach(competicion => {
    //     const temp = competicion.lean();
    //     temp.disponibilidad = Asistencia.countDocuments();
    //     devolver.push(temp);
    // });

    console.log(competiciones[0].asistencia);


    // .skip(desde)
    // .limit(limit), 

    //segunda llamada
    // ]);

    res.json({
        ok: true,
        competiciones,
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