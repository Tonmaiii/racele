import { createServer } from 'http'
import { Server } from 'socket.io'
import answers from './answers'
import ClientSocket from './clientSocket'

let word: string

const httpServer = createServer()
httpServer.listen(process.env.PORT || 3000)
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

let times: { id: string; time: number }[] = []
let sockets: ClientSocket[] = []
let startedSockets: ClientSocket[] = []
let completed = 0
let roundStartTime = 0
io.on('connection', (socket: ClientSocket) => {
    console.log(`socket connected: ${socket.id}`)
    disconnectSockets()
    sockets.push(socket)
    socket.results = []

    socket.emit(
        'names',
        startedSockets.map(socket => ({ id: socket.id, name: socket.name }))
    )
    startedSockets.forEach(opponent => {
        socket.emit('update', opponent.id, opponent.results)
    })
    socket.emit('startTime', roundStartTime)

    io.emit('players', sockets.length)
    if (sockets.length === 1) {
        clearTimeout(nextGame)
        nextGame = setTimeout(newGame, 1000)
    }

    socket.on('complete', (time: number) => {
        console.log(`${socket.name} completed in ${time}`)
        completed++
        if (time) {
            times.push({ id: socket.id, time: time })
            io.emit('times', times)
            io.emit(
                'message',
                `${socket.name} completed the word in ${time / 1000}s`,
                times.length === 1 ? '#D6AF36'
                : times.length === 2 ? '#A7A7AD'
                : times.length === 3 ? '#A77044'
                : '#FFFFFF'
            )
        } else {
            io.emit('message', `${socket.name} used all of their guesses`)
        }
    })

    socket.on('guess', (result: number[]) => {
        console.log(`${socket.name} guessed: ${result}`)
        socket.results.push(result)
        io.emit('update', socket.id, socket.results)
    })

    socket.on('name', (name: string) => {
        console.log(`${socket.id}:${socket.name} changed name to ${name}`)
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
    io.emit(
        'names',
        sockets.map(socket => ({ id: socket.id, name: socket.name }))
    )
    startedSockets = sockets
    times = []
    completed = 0
    sockets.forEach(socket => {
        socket.results = []
    })
    roundStartTime = Date.now()
    nextGame = setTimeout(newGame, 63000)
}

const disconnectSockets = () => {
    sockets = sockets.filter(socket => !socket.disconnected)
    startedSockets = startedSockets.filter(socket => !socket.disconnected)
    io.emit('players', sockets.length)
}

setInterval(() => {
    disconnectSockets()
    if (completed >= startedSockets.length) {
        clearTimeout(nextGame)
        nextGame = setTimeout(newGame, 500)
    }
}, 1000)
