const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey } = req.query

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'put API - controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    // o
    // const {id} = req.params; Con desestructuración

    res.json({
        msg: 'post API - controlador',
        id
    });
}

const usuariosDelete = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'delete API - controlador',
        id
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
};