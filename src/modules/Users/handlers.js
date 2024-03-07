import { findAndUpdateUser } from '../../dao/User.js';
import jwt from 'jsonwebtoken';
import {successMessage,errorMessage} from './responseMessage.js'
export async function createUser(req, res) {

    try {
        const token = jwt.sign({ phoneNumber: req.body.phoneNumber }, 'elred', { expiresIn: '10d' });
        let expiryTime =  Date.now() + (10 * 24 * 60 * 60 * 1000);
        let body = { ...req.body, accessToken: token,expiryTime:expiryTime.toString() }
        let User = await findAndUpdateUser(body)
        let userData=   [{ 
            accessToken: token,
            expiryTime: expiryTime.toString(), 
            email: User.email, 
            phoneNumber: User.phoneNumber
        }];
        res.send({
            statusCode: 200,
            Result: userData,
            success: true,
            isAuth: false,
            message: successMessage.authenticationSuccess,
        });
    } catch (err) {
     
        res.send({ statusCode: 500, result: [], status: 'Failure', message: errorMessage.internalServerError});
    }
}