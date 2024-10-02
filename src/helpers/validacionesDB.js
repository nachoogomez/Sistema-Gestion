import { User } from "../models/User.js";

export const emailExist = async (email = '') => {
    const existeEmail = await User.findOne({where: { email}})

    if (existeEmail){
        throw new Error(`El correo ${email} ya está registrado`)
    }
}