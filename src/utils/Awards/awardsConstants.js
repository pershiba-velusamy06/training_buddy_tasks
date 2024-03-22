export const successMessage={
    createAwardSucess: "User Created Award added Successfully.",
    editAwardsSucess: "Selected Award Modified Successfully.",
    fetchAwardsSucess: "Awards Fetched Successfully.",
    deleteAwardsSucess:"Awards Deleted Successfully."
 }

 export const sendErrorResponse=(res,errorMessage)=>{
    return res.status(500).send({
        success: false,
        isAuth: false,
        errorCode: -1,
        message: errorMessage,
        result: []
    });

}

export const allowedParams = ['start', 'offset'];

export const constructDataURL=(dataBuffer, contentType)=> {
   
    const base64String = dataBuffer.toString('base64');
    return `data:${contentType};base64,${base64String}`;
}