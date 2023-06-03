const jwt = require('jsonwebtoken');



const validarJWT = (req, res, next) => {
    // Leer el Token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { juezId } = jwt.verify(token, process.env.JWT_SECRET);
        req.juezId = juezId;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}


const varlidarADMIN_ROLE = async(req, res, next) => {
    const juezId = req.juezId;
    try {
        const juezDB = await Juez.findById(juezId);
        if (!juezDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Juez no existe'
            });
        }

        if (juezDB.role !== 'ADMIN') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const varlidarADMIN_ROLE_o_MismoJuez = async(req, res, next) => {
    const juezId = req.juezId;
    const id = req.params.id;
    try {
        const juezDB = await Juez.findById(juezId);
        if (!juezDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Juez no existe'
            });
        }

        if (juezDB.role === 'ADMIN' || juezId === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    validarJWT,
    varlidarADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoJuez
}