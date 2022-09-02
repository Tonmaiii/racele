import { Socket } from 'socket.io'

export default class ClientSocket extends Socket {
    name: string
    results: number[][]
}
