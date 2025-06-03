import { request } from 'express';
import jwt from 'jsonwebtoken';

export default (request, response, next) => {
    const token = request.headers.authorization;

    if(!token){
        return response.status(401).json({
            msg: 'Token não fornecido'
        })
    }
    // response.json({msg: "Usuário autorizado com sucesso"})
};

try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.userID = decoded.id;
    next();

} catch (err) {
    response.status(401).json({
        msg: 'Token não forncecido'
    });
}