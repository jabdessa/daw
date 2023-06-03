const jwt = require('jsonwebtoken');

const generarJWT = (juezId) => {

    return new Promise((resolve, reject) => {
        const payload = {
            juezId,
        };
        jwt.sign(payload, process.env.JWT_SECRET, {
            // TODO token expire, set less hours
            expiresIn: '100d'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });

    });
}

module.exports = {
    generarJWT
}