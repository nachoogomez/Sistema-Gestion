import {User} from '../models/User.js';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Create a new user
export const createUser = async (req, res) => {
    const {user, email, password} = req.body;

    const usuario = new User({user, email, password});

    const salt = bycrypt.genSaltSync();
    usuario.password = bycrypt.hashSync(password, salt);

    await usuario.save();

    res.status(201).json({
        user: usuario
    });
};

export const login = async (req, res) => {

    const {email, password} = req.body;
    
    try {
        
        const usuario = await User.findOne({where: {email}});

        if(!usuario) {
            return res.status(400).json({
                msg: 'User  incorrect '
            });
        }

        const validPassword = bycrypt.compareSync(password, usuario.password);

        if(!validPassword) {
            return res.status(400).json({
                msg: 'Password incorrect'
            });
        }

        //Generate JWT
        const token = jwt.sign({id: usuario.id, rol: usuario.rol}, 'secretkey');

        res.status(202).json({
            msg: 'Login success',
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error en el servidor'
        });
    }

    
}

export const getUsers = async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(400).json({
                msg: 'User not found'
            });
        }

        await user.destroy();

        res.status(200).json({
            msg: 'User deleted'
        });

    } catch  (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        
        const {id} = req.params;
        const {user: user, email, password, } = req.body;

        const usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(400).json({
                msg: 'User not found'
            });
        }

        usuario.user = user;
        usuario.email = email;
        usuario.password = password;

        await usuario.save();

        res.status(200).json({
            msg: 'User updated',
            usuario
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar el usuario',
            data: []
        })
    }
}





