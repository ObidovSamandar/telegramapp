const express = require('express')
const config = require('./configs/config')
const app = express()
const db = require('./storage/mongo')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const path = require('path')

;(async _=>{
    try {
        await db()
        console.log('Mongodb database connection established')
    } catch (e) {
        console.log(e.message)
    }
})()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
// app.use('/socket', express.static(path.join(__dirname, 'node_modules', "socket.io", "client-dist")))

app.set('view engine', "ejs")

server.listen(9905, () => console.log(`SERVER LISTEN AT ${config.HTTPORT}`))



app.get('/',  (req, res) => {
    console.log('Hello Login')
    res.render('login',{
        title:'Login'
    })
})

// app.get('/register',  (req,res)=>{
//     console.log(req.query)

//     let { id, first_name, user_name, auth_data, hash } = req.query

//     res.redirect('/chat')
// })

// app.get('/chat', (req, res)=>{
//     res.render('chat',{
//         title:'Telegram'
//     })
// })


// io.on('connection', async (socket) => {
//     console.log(socket.id)
// })