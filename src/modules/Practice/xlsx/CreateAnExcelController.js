import { buildExcel, readandExcel } from "./CreateAnExcelDataChecker.js"

export const createAnExcelController = async (req, res) => {
    try {
        await buildExcel(req,res).then((response) => {
            res.send({
                statusCode: 200,
                message: "File created successfully!"
            })

        })

    } catch (error) {
        res.send({ statusCode: 500, result: [], status: 'Failure', message: 'internal server error' });
    }

}

export const readAnExcelController = async (req, res) => {
    try {
        await readandExcel().then((response) => {
            res.send({
                statusCode: 200,
                result:response,
                message: "File extracted successfully"
            })

        })

    } catch (error) {
      
        res.send({ statusCode: 500, result: [], status: 'Failure', message: 'internal server error' });
    }

}


