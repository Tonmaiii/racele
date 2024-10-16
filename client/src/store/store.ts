import { writable } from 'svelte/store'
import words from '../data/words'
import { State } from '../util/states'
import { sendName, sendResult, sendTime } from './networking'

export const word = writable('')
export const currentGuess = writable('')
export const guesses = writable([] as string[])
export const results = writable([] as State[][])
export const usedLetters = writable(new Set() as Set<string>)
export const presentLetters = writable(new Set() as Set<string>)
export const correctLetters = writable(new Set() as Set<string>)

export const countdown = writable(0)
export const lockScreen = writable(true)
export const startTime = writable(0)
export const finalTime = writable(-2)
export const times = writable<{ id: string; time: number }[]>([])
export const playerCount = writable(0)
export const name = writable('')
export const messages = writable([] as [string, string?][])
export const opponentResults = writable<{ [key: string]: State[][] }>({})
export const players = writable<{ name: string; id: string }[]>([])

let $currentGuess: string
currentGuess.subscribe(guess => ($currentGuess = guess))
let $word: string
word.subscribe(word => ($word = word))
let $results: State[][]
results.subscribe(results => ($results = results))
let $startTime: number
startTime.subscribe(startTime => ($startTime = startTime))
let $name: string
name.subscribe(name => ($name = name))

export const setName = (_name: string) => {
    _name = _name.toUpperCase()
    localStorage.setItem('name', _name)
    name.set(_name)
    sendName(_name)
}

setName(
    localStorage.getItem('name') ??
        words[Math.floor(Math.random() * words.length)]
)

export const newGame = (_word: string) => {
    word.set(_word)
    resetGuess()
    resetGuesses()
    resetResults()
    resetOpponentResults()
    usedLetters.set(new Set())
    presentLetters.set(new Set())
    correctLetters.set(new Set())
    startCountdown()
    sendName($name)
}

const startCountdown = () => {
    lockScreen.set(true)
    setTimeout(() => countdown.set(3), 0)
    setTimeout(() => countdown.set(2), 1000)
    setTimeout(() => countdown.set(1), 2000)
    setTimeout(() => {
        countdown.set(0)
        lockScreen.set(false)
        startTime.set(Date.now())
    }, 3000)
    finalTime.set(-2)
}

const win = () => {
    const time = Date.now() - $startTime
    finalTime.set(time)
    sendTime(time)
    lockScreen.set(true)
}

const lose = () => {
    finalTime.set(-1)
    lockScreen.set(true)
    sendTime(null)
}

export const addGuess = () => {
    if (!words.includes($currentGuess.toLowerCase())) return
    if ($currentGuess.length !== 5) return
    guesses.update(guesses => [...guesses, $currentGuess])

    usedLetters.update(letters => {
        $currentGuess.split('').forEach(c => letters.add(c))
        return letters
    })
    presentLetters.update(letters => {
        $currentGuess.split('').forEach((c, i) => {
            if ($word.includes(c)) letters.add(c)
        })
        return letters
    })
    correctLetters.update(letters => {
        $currentGuess.split('').forEach((c, i) => {
            if ($word[i] === c) letters.add(c)
        })
        return letters
    })

    addResult(validateGuess())
    if ($currentGuess === $word) {
        win()
    } else if ($results.length === 6) {
        lose()
    }
    resetGuess()
}

export const resetGuesses = () => {
    guesses.set([])
}

export const addLetter = (letter: string) => {
    currentGuess.update(currentGuess => (currentGuess + letter).slice(0, 5))
}

export const removeLetter = () => {
    currentGuess.update(currentGuess => currentGuess.slice(0, -1))
}

export const resetGuess = () => {
    currentGuess.set('')
}

export const addResult = (result: State[]) => {
    results.update(results => [...results, result])
    sendResult(result)
}

export const resetResults = () => {
    results.set([])
}

export const updateOtherResults = (id: string, results: State[][]) => {
    opponentResults.update(otherResults => {
        otherResults[id] = results
        return otherResults
    })
}

export const resetOpponentResults = () => {
    opponentResults.set({})
}

function validateGuess() {
    const solution = $word
    const guess = $currentGuess
    const guessedLetters = guess
        .split('')
        .map(letter => ({ letter, state: State.Incorrect }))

    const solutionLetters: { letter: string; includedInGuess: boolean }[] =
        solution.split('').map(letter => ({ letter, includedInGuess: false }))

    // First pass: correct letters in the correct place
    for (let i = 0; i < guessedLetters.length; i++) {
        if (guessedLetters[i].letter === solutionLetters[i].letter) {
            guessedLetters[i].state = State.Correct
            solutionLetters[i].includedInGuess = true
        }
    }

    // Second pass: correct letters in the wrong places
    for (let i = 0; i < guessedLetters.length; i++) {
        if (guessedLetters[i].state === State.Correct) {
            continue
        }

        const letterFoundElsewhere = solutionLetters.find(solutionLetter => {
            const matchesLetter =
                solutionLetter.letter === guessedLetters[i].letter
            return matchesLetter && !solutionLetter.includedInGuess
        })

        if (letterFoundElsewhere) {
            guessedLetters[i].state = State.Present
            letterFoundElsewhere.includedInGuess = true
        }
    }

    const result = guessedLetters.reduce((result, { state }) => {
        result.push(state)
        return result
    }, [] as State[])
    return result
}
