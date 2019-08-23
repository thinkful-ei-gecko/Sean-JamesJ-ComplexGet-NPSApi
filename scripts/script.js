'use strict';

const apiKey = 'GmFJg5wa6do9h0Nrg8wrC3kQDyzlVV5d2fgj6faX';

function getParks(statesArray, maxNum) {
    let url = `https://developer.nps.gov/api/v1/parks?stateCode=${statesArray}&limit=${maxNum}&api_key=`;
    url += apiKey;
    console.log(url);
    fetch(url)
    .then((response) => response.json())
    .then((jsonData) => resultsString(jsonData, maxNum));
}

const handleParkFormSubmit = function() {
    $('#jsForm').on('submit', e => {
        e.preventDefault();
        let states = $('#statesLabel').val();
        let maxNum = $('#maxNumLabel').val();
        states = String(states);
        console.log(states);
        console.log(typeof states);
        let statesArray = states.trim();
        console.log(statesArray);
        statesArray = states.split(' ');
        console.log(statesArray);
        console.log(typeof statesArray);
        console.log(statesArray.length);
        if (statesArray.length === 1) { 
            getParks(statesArray, maxNum);
        }
        else if (statesArray.length > 1) {
            statesArray.forEach(function(element, index){
                statesArray[index] = element + '%2C';
                console.log(statesArray[index]);            
            })
        }
        statesArray = statesArray.join();
        statesArray = statesArray.replace(',', '');
        console.log(statesArray);
        console.log(statesArray);
        console.log(maxNum);
        getParks(statesArray, maxNum);
    });
}    


const resultsString = function(jsonData, maxNum) {
    let resultsString = '';
    for (let i = 0; i < jsonData.data.length; i++){
        resultsString += `${jsonData.data[i].fullName}<br>${jsonData.data[i].url}<br>${jsonData.data[i].description}  <br><br>`;
        $('.insertStringHere').html(resultsString);
    }
};

handleParkFormSubmit();