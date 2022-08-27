import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import answers from './answers'

const httpServer = createServer()
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

let times: number[] = []
let sockets: Socket[] = []
let startedSockets: Socket[] = []
io.on('connection', socket => {
    disconnectSockets()
    sockets.push(socket)
    if (sockets.length === 1) setTimeout(newGame, 1000)
    socket.on('complete', (time: number) => {
        times.push(time)
        io.emit('times', times)
    })
})

let nextGame: NodeJS.Timeout
const newGame = () => {
    clearTimeout(nextGame)
    io.emit(
        'start',
        answers[Math.floor(Math.random() * answers.length)].toUpperCase()
    )
    startedSockets = sockets
    times = []
    nextGame = setTimeout(newGame, 63000)
}

httpServer.listen(process.env.PORT || 3000)

const disconnectSockets = () => {
    sockets = sockets.filter(socket => !socket.disconnected)
    startedSockets = startedSockets.filter(socket => !socket.disconnected)
}

setInterval(() => {
    disconnectSockets()
    if (times.length >= startedSockets.length) {
        setTimeout(newGame, 500)
    }
}, 1000)
