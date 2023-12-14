/** 
 * @param {boolean} isCheked the result of the response validation 
 * @param {JSON} response the response from the endpoint
 */
export function returnError(isCheked, response){
    if(!isCheked)
        console.log(`Failed with error code ${response.status}: ${response.status_text}`);
}