
const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');

const { validarCampos,
        validarJWT,
        esAdminRole,
        tieneRol 
} = require('../middlewares')

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete } = require('../controllers/usuarios');



const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPut);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser más de seis letras').isLength({ min: 6 }),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom( emailExiste ),
        // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPost);

router.delete('/:id', [
        validarJWT,
        // esAdminRole, // Este middlwware fuerza a que el usuario tiene que ser ADMIN para poder eliminar
        tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
], usuariosDelete);




module.exports = router;