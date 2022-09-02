import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import answers from './answers'
import ClientSocket from './clientSocket'

let word: string

const httpServer = createServer()
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

let times: number[] = []
let sockets: ClientSocket[] = []
let startedSockets: Socket[] = []
io.on('connection', (socket: ClientSocket) => {
    disconnectSockets()
    sockets.push(socket)
    io.emit('players', sockets.length)
    if (sockets.length === 1) {
        clearTimeout(nextGame)
        nextGame = setTimeout(newGame, 1000)
    }

    socket.on('complete', (time: number) => {
        times.push(time)
        io.emit('times', times)
        if (time) {
            io.emit(
                'message',
                `${socket.name} completed the word in ${time / 1000}s`
            )
        } else {
            io.emit('message', `${socket.name} used all of their guesses`)
        }
    })

    socket.on('guess', (result: number[]) => {
        socket.results.push(result)
        io.emit('update', socket.results)
    })

    socket.on('name', (name: string) => {
        socket.name = name
    })
})

let nextGame: NodeJS.Timeout
const newGame = () => {
    io.emit('message', `The word was ${word}`)
    io.emit('message', 'Next round starting')
    clearTimeout(nextGame)
    word = answers[Math.floor(Math.random() * answers.length)].toUpperCase()
    io.emit('start', word)
    startedSockets = sockets
    times = []
    nextGame = setTimeout(newGame, 63000)
}

httpServer.listen(process.env.PORT || 3000)

const disconnectSockets = () => {
    sockets = sockets.filter(socket => !socket.disconnected)
    startedSockets = startedSockets.filter(socket => !socket.disconnected)
    io.emit('players', sockets.length)
}

setInterval(() => {
    disconnectSockets()
    if (times.length >= startedSockets.length) {
        clearTimeout(nextGame)
        nextGame = setTimeout(newGame, 500)
    }
}, 1000)
