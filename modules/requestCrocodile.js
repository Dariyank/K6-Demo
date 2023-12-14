import http from 'k6/http';
import { check, sleep } from 'k6';
import { returnError } from '../modules/common.js'

/**
 * @param {string} url The base URL of the endpoint
 * @param {object} crocodile The item information we're expecting to find.
 */

export function requestCrocodile(url){
    //Get all crocodiles
    const response = http.get(url);
    const crocodilesResponse = response.body;

    //Creating object from string
    let crocodiles = JSON.parse(crocodilesResponse);

    const randomIndex = Math.floor(Math.random() * crocodiles.length);
    const res = http.get(url+crocodiles[randomIndex].id);

    //Check the status of the request
    let isChecked = check(res, {
        'Response code was 200': res => res.status === 200,
        'Test passed "200 OK"': res => res.status_text === "200 OK",
        'Found your crocodile': res => (res.body).includes(crocodiles[randomIndex].name)
    } );

    returnError(res, isChecked);
    sleep(1);
}

export function requestInvalidCrocodile(url, id){
    const response = http.get(url+id);

    //Check the status of the request
    let isChecked = check(response, {
        'Response code was 404': response => response.status === 404,
        'Test passed "404 Not Found"': response => response.status_text === "404 Not Found",
        'Couldn\'t find your crocodile': response => (response.body).includes("Not found.")
    } );

    
    returnError(response, isChecked);
    sleep(1);
}