
import xlsx from 'node-xlsx';
import fs from 'fs'
import { resolve } from 'path';

export const buildExcel = (req,res) => {

    return new Promise(async (resolve, reject) => {

        try {
            const data = req.body.excelArray;

            const sheet = xlsx.build([{ name: 'Sheet1', data: data }]);

            fs.writeFileSync('example.xlsx', sheet, 'binary');
            resolve("success")
        } catch (error) {
            reject(error)
        }

    })



}


export const readandExcel = () => {

    return new Promise(async (resolve, reject) => {
        try {
            // Load the Excel file
            const excelData = await xlsx.parse(fs.readFileSync('example.xlsx'));

            // Get the first sheet
            const firstSheet = await excelData[0];

            // Extract data from the first sheet
            const rows = await firstSheet.data;


            resolve(rows)
        } catch (error) {
            reject(error)
        }
    })


}