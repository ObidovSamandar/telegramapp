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
// app.use('/socket', express.static(path.join(__dirname, 'node_modules', "socket.io", "client-dist")))

app.set('view engine', "ejs")

app.listen(3005, () => console.log(`SERVER LISTEN AT 3005`))

// async function main(){
//    await database()

//    await users.deleteMany({})   
//    await messages.deleteMany({})
// }
// main()

app.get('/', async (req, res) => {
    res.render('login')
})