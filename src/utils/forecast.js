
const request =require('request')

const forecast=(latitude,longitude,callback) =>
{
    const url ='http://api.weatherstack.com/current?access_key=5f0c6af0a9406dc019428ed7c41b32d5&query='+latitude+','+latitude+'&units=f'
    request({
        url:url,
        json:true
    },(error,response)=>
    {
        if(error)
        {
            callback('Unable to connect',undefined)
        }
        else if(response.body.error)
        {
            console.log('Unable to find location',undefined)
        }
        else
        {
            
            callback(undefined,response.body.current.weather_descriptions[0])
    
        }
    })

    
}

    


module.exports=forecast