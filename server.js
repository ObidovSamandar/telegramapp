const express = require('express')
const config = require('./configs/config')
const app = express()
const db = require('./storage/mongo')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const path = require('path')
const fetch = require('node-fetch')
const userModel = require('./controller/UserRegisterController')

const user  = new userModel()
;(async _=>{
    try {
        await db()
        console.log('Mongodb database connection established')
    } catch (e) {
        console.log(e.message)
    }
})();


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use('/socket', express.static(path.join(__dirname, 'node_modules', "socket.io", "client-dist")))

app.set('view engine', "ejs")


server.listen(config.HTTPORT, () => console.log(`SERVER LISTEN AT ${config.HTTPORT}`))

app.get('/health', (req,res)=>{
    res.status(200).send({
        ok:true
    })
})


app.get('/',  (req, res) => {
    res.render('login',{
        title:"Login"
    })
})


app.get('/register', async  (req,res)=>{
    let { id, first_name, username, auth_data, hash } = req.query
    let findUser = await user.getUser({
        chat_id:id
    })
    if(!findUser){
        let createUser = await user.createUser({
            name:first_name,
            user_name:username,
            chat_id:id,
        })
    
        let datachekString = `auth_date$=${auth_data}\nfirst_name=${first_name}\nid=${id}\nusername=${username}`
        let sendMessageTOBot = await fetch(`https://api.telegram.org/bot${config.BOT_TOKEN}/sendMessage?chat_id=${config.Bot_id}&text=\n name:${first_name}\nusername:${username}`, {
    
            method: 'POST',
        })
    }
    res.redirect('/chat')
})

app.get('/chat', (req, res)=>{
    res.render('chat',{
        title:'Telegram'
    })
})



io.on('connection', (socket) => {
    console.log(socket.id, "biz qoshildi");
    
})