const express   =   require('express')
const path=require('path')
const port=8000
const db = require('./config/mongoose')
const Contact = require('./models/contact')
const app = express()
app.use(express.urlencoded())
app.use(express.static('assets'))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.get('/',function (req,res) {
    Contact.find({},function(err,contacts){
        if(err){
            console.error("Some error occurred in fetching contact")
            return
        }
        return res.render('home',{title:"Contact App",contact_list:contacts})
    })
})
app.get('/playground',function (req,res) {
    return  res.render('playground',{title:"Lets Play with ejs"})
})
app.get('/delete-contact/',function (req,res) {
    let id = req.query.id
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Some Error Occurred In Deleting Contact")
            return
        }
        return res.redirect('back')
    })
})
app.post('/create-contact',function (req,res) {
    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    },function(err,newContact){
        if(err){
            console.error("Some Error Occurred in Create-Contact")
            return
        }
        console.log("******",newContact)
        return res.redirect('back')
    })
})
app.listen(port,function(err){
    if(err) console.log("Their is an error")
    console.log("Everything's looking good so far")
})
