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

export const allowedFields = ['awardTitle', 'description', 'issuedBy', 'issuedDate'];
export const allowedFieldsForEditAwards = ['awardTitle', 'description', 'issuedBy', 'issuedDate', "awardId", "approvalStatus"];