import { io } from 'socket.io-client'
import { newGame, times } from './store'

const socket = io('SERVER_URL')

socket.on('start', (word: string) => {
    console.log(word)
    newGame(word)
})

export const sendTime = (time: number) => {
    socket.emit('complete', time)
}

socket.on('times', (_times: number[]) => {
    times.set(_times.sort((a, b) => a - b))
})
