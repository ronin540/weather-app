const fs        = require('fs');

const avenger = fs.readFile("./assets/avengers.txt", (err , data)=> {
    const dataString = data.toString();
    
    console.log(dataString);
})

