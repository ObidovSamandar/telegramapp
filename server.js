const express = require('express')
const config = require('./configs/config')
const app = express()
const db = require('./storage/mongo')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const path = require('path')

const DATA = []
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



app.get('/',  (req, res) => {
    res.render('login',{
        title:'Login'
    })
})

app.get('/register',  (req,res)=>{
    let { id, first_name, user_name, auth_data, hash } = req.query

    res.redirect('/chat')
})

app.get('/chat', (req, res)=>{
    res.render('chat',{
        title:'Telegram'
    })
})



io.on('connection', (socket) => {
    
    console.log(socket.id, "biz qoshildi");
    
    let id = DATA.find(user => user.id == socket.id)
    if(!id){
        DATA.push({
            id: socket.id
        })
    }
    
    
    socket.on('sign', data => {
        const index = DATA.findIndex(user => user.id == socket.id)
        
        if(DATA[index]["name"]){
            socket.emit('error', {
                message: "Siz ism kiritgansiz"
            })
        } else {
            DATA[index]["name"] = data?.name
            
            socket.emit("logged", DATA.filter(e => e.name))
            
            socket.broadcast.emit('new_member', {
                id: socket.id,
                name: data.name
            })
        }
        
        // socket.emit('logged', {
        //     logged: true
        // })
    })
    
    
    socket.on('disconnect', () => {
        let index = DATA.findIndex(user => user.id == socket.id)
        DATA.splice(index, 1)
        console.log(socket.id, "bizni tark etdi");
        
        socket.broadcast.emit('left_member', {
            id: socket.id,
        })        
    });

    socket.on('new_message', data => {
        let index = DATA.findIndex(user => user.id == socket.id)
        if(DATA[index]["name"]){
            socket.broadcast.emit('new_message', {
                owner: DATA[index]["name"],
                message: data.message
            })
        }
    })
})