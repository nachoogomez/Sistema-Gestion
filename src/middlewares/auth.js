import jwt from 'jsonwebtoken';

export const auth = (rol = []) => {  
    return (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({msg: 'Invalid Authentication'})
        }
        
        const decoded = jwt.verify(token, 'secretkey');
        
        if(rol && decoded.rol !== rol){
            return res.status(403).json({msg: "Unauthorized"})
        } 
        req.user = decoded
        next()
    } 
}


