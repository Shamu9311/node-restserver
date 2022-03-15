const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    // const { q, nombre = 'No name', apikey } = req.query
    const { limite=5, desde = 0 } = req.query;
    // const usuarios = await Usuario.find( { estado: true } )
    //     .skip(Number(desde))
    //     .limit(Number(limite));
    // const total = await Usuario.countDocuments( { estado: true } );
    
    // Para retornar el usuarios y el total de manera simultanea 
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments( { estado: true } ),
        Usuario.find( { estado: true } )
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    });
}


const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    // Encriptar la constraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    await usuario.save();
    res.json({
        usuario
    });
}


const usuariosPut = async(req, res = response) => {
    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;
    // Validar contra base de datos
    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto );
    res.json(usuario);
}

const usuariosDelete = async(req, res) => {
    const { id } = req.params;

    // Borrar usuario físicamente
    // const usuario = await Usuario.findByIdAndDelete( id);

    // Borrar usuario cambiando el estado a false
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });

    res.json(usuario);
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
};