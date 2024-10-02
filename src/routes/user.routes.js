import { Router } from 'express';
import { recolectarErrores } from '../middlewares/recolectarErrores.js';
import { createUser, deleteUser, getUsers, login, updateUser } from '../controllers/userControllers.js';
import { check } from 'express-validator';
import { emailExist } from '../helpers/validacionesDB.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.post('/login', 
    [   
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').isLength({min: 6}),
        recolectarErrores
    ],
    login
)

router.post('/register', 
    [   
        check('user', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').isLength({min: 6}),
        check("email").custom(emailExist),
        recolectarErrores
    ],
    createUser
)

router.get('/getUser',
    auth("admin"),
    getUsers
)

router.delete('/deleteUser/:id',
    auth("admin"),
    deleteUser
)

router.put('/updateUser',
    auth("admin"),
    updateUser
)


export default router;