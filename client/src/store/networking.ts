import { io } from 'socket.io-client'
import type { State } from '../util/states'
import {
    messages,
    newGame,
    playerCount,
    players,
    startTime,
    times,
    updateOtherResults
} from './store'

const socket = io('SERVER_URL')

socket.on('start', (word: string) => {
    newGame(word)
})

socket.on('names', (_players: { name: string; id: string }[]) => {
    players.set(_players.filter(player => player.id !== socket.id))
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

socket.on('times', (_times: { id: string; time: number }[]) => {
    times.set(_times.sort((a, b) => a.time - b.time))
})

socket.on('players', (count: number) => {
    playerCount.set(count)
})

socket.on('message', (message: string, color?: string) => {
    messages.update(messages => {
        messages.push([message, color])
        return messages
    })
    setTimeout(() => messages.update(message => message.slice(1)), 10000)
})

socket.on('update', (id: string, results: State[][]) => {
    if (id === socket.id) return
    updateOtherResults(id, results)
})

socket.on('startTime', (time: number) => {
    startTime.set(time)
})
