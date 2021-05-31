const path=require('path')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const hbs =require('hbs')
const express = require('express')

//console.log(__dirname) // specifies the current working directory

//console.log(__filename) // specifies the current working file
const app = express ()
// define paths for express config
const viewsPath = path.join(__dirname,'../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')
// setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
// setup static directory to serve
app.use(express.static(path.join(__dirname, '../public' )))




app.get('',(req,res)=>
{
    res.render('index',{
        title:'Weather App',
        name:'Aayush'
    })
})

app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'About me',
        name:'Aayush'
    })
})

app.get('/help',(req,res)=>
{
    res.render('help',
    {
        helpText:'This is some helpful text',
        title:'Help',
        name:'Aayush'
    })

})
app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send({
            error:'Provide address'
        })
    }
   
    geocode(req.query.address,(error,{latitude , longitude , location}= {})=>
    {
        if(error)
        {
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>
        {
            if(error)
            {
                return res.send(error)
            }
            res.send({
                forecast : forecastData,
                location,
                address:req.query.address
            })
        })

    })
    

})

app.get('/products',(req,res)=>
{
    if(!req.query.search)
    {
        return res.send({
            error:'Provide search'
        })
    }
    console.log(req.query)
    
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>
{
    res.render('404',
    {
        title:'404',
        name:'Aayush',
        errorMessage:'Help article not found'
    })

})
app.get('*',(req,res)=>
{
    res.render('404',
    {
        title:'404',
        name:'Aayush',
        errorMessage:'Page not found'
    })

})
app.listen(3000, () =>
{
    console.log('Server is up')
})