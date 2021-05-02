const HOST_URL = "http://localhost:3000"

// fetch(`${HOST_URL}/weather` + new URLSearchParams({
//     search: 'Ottawa',
// })).then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const seatchInput = document.querySelector('input')
const msg1 = document.getElementById('msg-1')
const msg2 = document.getElementById('msg-2')

msg1.textContent = ""
msg2.textContent = ""

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    axios.get(`${HOST_URL}/weather`, {
        params: {
            search: seatchInput.value,
        },
    }).then(({data}) => {
        if (data.error){
            msg1.textContent = data.error
            msg2.textContent = ""
        }
        else{
            msg1.textContent = data.location
            msg2.textContent = data.forcast
        }
    })
})


console.log('Clinet side js file is loaded')

