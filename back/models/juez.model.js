const { Schema, model } = require('mongoose');

const JuezSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    primerApellido: {
        type: String,
        required: true
    },
    segundoApellido: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        // default: 'JUEZ' / ADMIN / SEC / (JUEZ,SEC)
        default: 'JUEZ'
    },
    foto: {
        type: String,
    },
    resetPassword: {
        type: Boolean,
        default: true
    }
    // nombre de la tabla/colección
}, { collection: 'jueces' });


JuezSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model('Juez', JuezSchema);