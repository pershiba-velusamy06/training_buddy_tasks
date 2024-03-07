 export const errorMessages = {
    internalServerError: 'internal server error',
    emailError: 'Invalid email format.',
    phoneNumberError: 'Invalid phone number format. It should start with +91 and be 10 digits long.',
    firstNameError: 'First name should be between 3 and 20 characters long.',
    lastNameError: 'Last name should be between 3 and 20 characters long.'

}

export const successMessage = {
    authenticationSuccess: "User authenticated successfully!",
}



export const validations = {
    email: value => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return errorMessages.emailError;
        }
    },
    phoneNumber: value => {
        const phoneNumberRegex = /^\+91\d{10}$/;
        if (!phoneNumberRegex.test(value)) {
            return errorMessages.phoneNumberError;
        }
    },
    firstname: value => {
        if (value.length < 3 || value.length > 20) {
            return errorMessages.firstNameError;
        }
    },
    lastname: value => {
        if (value.length < 3 || value.length > 20) {
            return errorMessages.lastNameError;
        }
    }
};

export const sendErrorResponse=(res,errorMessage)=>{
    return res.status(500).send({
        success: false,
        isAuth: false,
        errorCode: -1,
        message: errorMessage,
        result: []
    });

}
export  const allowedFields = ['email', 'phoneNumber', 'firstname', 'lastname'];