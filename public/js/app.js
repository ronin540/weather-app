

    console.log("this is clientside");

// fetch("http://localhost:3000/weather?search=indore").then((response) => {
//     response.json().then((data)=> {
//         console.log(data);
//     })
//     })

    const weatherform   = document.getElementById("weatherForm")
    const search        = document.getElementById('location')
    const errorMessage  = document.querySelector('#err-msg')
    const fLocation     = document.querySelector('#f-location')
    
    weatherform.addEventListener('submit', (e)=>{
        e.preventDefault()
        
        fetch("http://localhost:3000/weather?search="+search.value).then((response) => {
    response.json().then((data)=> {
            if (data.err) {
                fLocation.textContent = ''
                errorMessage.textContent = data.err
                }
            else  if (data.message) {
            fLocation.textContent = ''
            errorMessage.textContent = data.message
             }
            else {
            fLocation.textContent   = data.location 
            errorMessage.textContent=  "It is currently " +data.forData.temp + " degree celcius ";
            }
        
       
    })
    })
    })


