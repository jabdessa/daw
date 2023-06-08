const { Schema, model } = require('mongoose');

const CompeticionSchema = Schema({

    nombre: {
        type: String,
        required: true,
        unique: true
    },
    lugar: {
        type: String,
        required: true
    },
    fecha: {
        type: Date
    },
    jornada: {
        type: String,
    },
    organizador: {
        type: String,
    },
    horario: {
        type: String,
    },
    disponibilidad: {
        type: Number,
    },
    // nombre de la tabla/colección
}, { collection: 'competiciones' });


CompeticionSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model('Competicion', CompeticionSchema);