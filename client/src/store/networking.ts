import { io } from 'socket.io-client'
import type { State } from '../util/states'
import { messages, newGame, playerCount, times } from './store'

const socket = io('SERVER_URL')

socket.on('start', (word: string) => {
    newGame(word)
})

export const sendTime = (time: number) => {
    socket.emit('complete', time)
}

export const sendResult = (result: State[]) => {
    socket.emit('guess', result)
}

export const sendName = (name: string) => {
    socket.emit('name', name)
}

socket.on('times', (_times: number[]) => {
    times.set(_times.sort((a, b) => a - b))
})

socket.on('players', (count: number) => {
    playerCount.set(count)
})

socket.on('message', (message: string, color?: string) => {
    console.log(color)
    messages.update(messages => {
        messages.push([message, color])
        return messages
    })
    setTimeout(() => messages.update(message => message.slice(1)), 10000)
})
