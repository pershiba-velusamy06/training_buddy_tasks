export const successMessage = {
    authenticationSuccess: "User authenticated successfully!",
}
export const errorMessages = {
    internalServerError: 'internal server error',
    emailError: 'Invalid email format.',
    phoneNumberError: 'Invalid phone number format. It should start with +91 and be 10 digits long.',
    firstNameError: 'First name should be between 3 and 20 characters long.',
    lastNameError: 'Last name should be between 3 and 20 characters long.'

}

export  const allowedFields = ['email', 'phoneNumber', 'firstname', 'lastname'];