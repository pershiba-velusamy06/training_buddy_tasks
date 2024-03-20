

import { errorMessages, successMessage } from '../../../utils/users/userConstant.js';
import { userSignUpDataChecker } from './userSignUpDataChecker.js';

export async function userSignUp(req, res) {

    try {
        await userSignUpDataChecker(req, res).then((response) => {
         
            if(response){
                res.status(200).send({
                    Result: response,
                    success: true,
                    isAuth: false,
                    message: successMessage.authenticationSuccess,
                });
            }else{
                res.send({ statusCode: 500, result: [], status: 'Failure', message: errorMessages.internalServerError });
            }
          
        }).catch((error) => {
            res.send({ statusCode: 500, result: [], status: 'Failure', message: errorMessages.internalServerError });
        })

    } catch (err) {
        res.send({ statusCode: 500, result: [], status: 'Failure', message: errorMessages.internalServerError });
    }
}

