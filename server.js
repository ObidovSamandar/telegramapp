const express = require('express')
const app = express()
// const http = require('http')
// const server = http.createServer(app)
// const { Server } = require('socket.io')
// const io = new Server(server)
// const path = require('path')
// const database = require('./mongodb/mongodb')
// const users = require('./models/Usermodel')
// const messages = require('./models/Chatsmodel')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
// app.use('/socket', express.static(path.join(__dirname, 'node_modules', "socket.io", "client-dist")))

app.set('view engine', "ejs")
require('dotenv').config()

app.listen(process.env.PORT, () => console.log(`SERVER LISTEN AT ${process.env.PORT}`))

// async function main(){
//    await database()

//    await users.deleteMany({})   
//    await messages.deleteMany({})
// }
// main()

app.get('/', async (req, res) => {
    res.render('login',{
        title:'Login'
    })
})

app.get('/register', async (req,res)=>{
    console.log(req.query)

    let { id, first_name, user_name, auth_data, hash } = req.query
    res.redirect('/chat')
})