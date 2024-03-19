import async from 'async'
import { fetchSomeArray, getAllAwards, getAllUsers } from './practiceAsyncValidator.js'

export const practiceAsyncDataChecker = (freq, res) => {

    try {
        return async.parallel(
            [
                async.reflect(async () => await getAllAwards()),
                async.reflect(async () => await getAllUsers()),
                async.reflect(async () => await fetchSomeArray())
            ]
        ).then((response) => {

       
            
            return { awards: response[0].value, users: response[1].value, someAwards: response[2].value }
        })
    } catch (error) {
       
        throw Error('Internal server Error')
    }

}