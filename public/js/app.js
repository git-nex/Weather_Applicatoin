//console.log('Loaded')



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message-one')
const message2=document.querySelector('#message-two')




weatherForm.addEventListener('submit', (e) =>{
    const location= search.value
    e.preventDefault()

    message1.textContent='Getting your information'
    message2.textContent=' '
    fetch('/weather?address=!' + location).then((response)=>{
    response.json().then((data) => {
        if(data.error)
        {
            message1.textContent=data.error

        }
        else{
            message2.textContent=data.location
            message1.textContent=data.forecast
        }
    })
})

    
    console.log(location)
})