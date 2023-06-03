const { Schema, model } = require('mongoose');

const AsistenciaSchema = Schema({

        juez: {
            type: Schema.Types.ObjectId,
            ref: 'Juez',
            required: true
        },
        competicion: {
            type: Schema.Types.ObjectId,
            ref: 'Competicion',
            required: true
        },
        asiste: {
            type: Boolean,
            default: false
        }
    },
    // nombre de la tabla/colección
    { collection: 'asistencias' });

//claves únicas(constraint)
AsistenciaSchema.index({
    juez: 1,
    competicion: 1,
}, {
    unique: true,
});


AsistenciaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    // object.juez.id = object.juez._id;
    // object.competicion.id = object.competicion._id;
    return object;
});


module.exports = model('Asistencia', AsistenciaSchema);