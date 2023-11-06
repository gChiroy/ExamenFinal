const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const exphbs = require('express-handlebars')
const path = require('path')
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.middleware();
        this.routes()
    }

    middleware(){
        this.app.use(cors())

        this.app.set("views", path.join(__dirname,'views'));
        
        this.app.engine('.hbs',exphbs.engine({
            defaultLayout: 'main',
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            extname: '.hbs',
        }))


        this.app.set('view engine','.hbs');
        this.app.use(express.static('./public'))
    }
    routes(){
        this.app.get('/',(req,res)=>{
            res.render('home')
        })
        this.app.get('/panels',(req,res)=>{
            res.render('panels')
        })
        this.app.get('/trailers',(req,res)=>{
            res.render('trailers')
        })
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Corriendo en el localHost: ',this.port)
        })
    }
}
module.exports = Server;